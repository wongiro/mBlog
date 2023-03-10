import React,{ useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import BlogSection from '../components/Blog Section/BlogSection';
import Spinner from '../components/Spinner/Spinner';

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

  console.log("blogs", blogs);

  return (
    <div className='container'>
      <div className='home'>
        <BlogSection blogs={blogs} user={user}/>
      </div>
    </div>
  )
}

export default Home