import React, { useState, useEffect } from 'react'
import { storage, db } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import './AddBlog.css';

const initialState = {
  title: '',
  description: '',
};

const AddBlog = ({user}) => {

  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);

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
          setForm((prev) => ({...prev, url: downloadURL}));
        });
      });

    };

    file && uploadFile();
  }, [file]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(title && description && file){
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
    }

    navigate('/');
  };

  return (
    <div className="container">
      <div className="add-blog">
        <div className="add-blog-form">
          <h2>Create Blog</h2>
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
              <button type="submit" disabled={progress !== null && progress < 100}>Post Blog</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddBlog;




