import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import './Details.css';

const Details = ({setActive}) => {

    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        id && getBlogDetail();
    }, [id]);

    const getBlogDetail = async () => {
        const docRef = doc(db, "blogs", id);
        const blogDetail = await getDoc(docRef);
        setBlog(blogDetail.data());
        setActive(null);
    }

  return (
    <div className='single'>
        <div className='title_box' style={{ backgroundImage: `url('${blog?.imgUrl}')` }}>   
            <div className='single__content'></div>
            <div className="blog__title">
                <h2>{blog?.title}</h2>
                <span>{blog?.timestamp.toDate().toDateString()}</span>
            </div>
        </div> 
        <div className='container'>
            <div className="author__name">
                <span>
                    By <span className="author__name__span">{blog?.author}</span>
                </span>
                <p className='text'>{blog?.description}</p>
            </div>
        </div>
    </div>
  )
}

export default Details;
