import React, { useState, useEffect } from 'react'
import { storage, db } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';


import './AddBlog.css';

const initialState = {
  title: '',
  description: '',
};

const AddBlog = ({user, setActive}) => {

  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);

  const { id } = useParams();

  const { title, description } = form;

  const navigate = useNavigate();

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);

        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            break;
        }
      }, (error) => {
        console.log(error);
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          alert('Image uploaded successfully');
          setForm((prev) => ({...prev, imgUrl: downloadURL}));
        });
      });

    };

    file && uploadFile();
  }, [file]);

  useEffect (() => {
    id && getBlogDetail();
  }, [id]);

  const getBlogDetail = async () => {
    const docRef = doc(db, 'blogs', id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setForm(snapshot.data());
    }
    setActive(null)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(title && description && file ){
      if (!id) {
        try {
          await addDoc(collection(db, 'blogs'), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
           
        }
        catch (error) {
          console.log(error);
        }
      } else {
        try {
          await updateDoc(doc(db, 'blogs', id), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          alert('Blog updated successfully');
        } catch (error) {
          console.log(error);
        }
      }
    navigate('/');
    }
  };

  return (
    <div className="container">
      <div className="add-blog">
        <div className="add-blog-form">
          <h2>{id ?  "Update Blog" : "Create Blog"}</h2>
        </div>
        <div className="add-blog-form">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-input">
              <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={handleChange}
                  placeholder="Enter a title for your blog post"
                />
            </div>
            <div className="form-input">
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={handleChange}
                placeholder="Enter a description for your blog post"
              />
            </div>
            <div /*className="form-input-file"*/>
              <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
            </div>
            <div className="form-input">
              <button type="submit" disabled={progress !== null && progress < 100}>{id ? "Update blog" : "Post blog"}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddBlog;




