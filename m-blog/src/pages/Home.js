import React,{ useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import BlogSection from '../components/Blog Section/BlogSection';
import Spinner from '../components/Spinner/Spinner';
import { deleteDoc, doc } from 'firebase/firestore';

const Home = ({setActive, user}) => {

  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot (
      collection(db, 'blogs'), (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({...doc.data(), id: doc.id});
        });
        setBlogs(list);
        setLoading(false);
        setActive('home');
      }, (error) => {
        console.log(error);
      }
    );

    return () => unsub();
  }, []);

  if (loading) {
    return <Spinner />
  }

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure, you want to delete this blog?')){
      try{
        setLoading(true);
        await deleteDoc(doc(db, 'blogs', id));
        alert('Blog deleted successfully');
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log("blogs", blogs);

  return (
    <div className='container'>
      <div className='home'>
        <BlogSection blogs={blogs} user={user} handleDelete={handleDelete} />
      </div>
    </div>
  )
}

export default Home