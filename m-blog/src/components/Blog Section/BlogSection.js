import React from 'react';
import './BlogSection.css';
import { Link } from 'react-router-dom';
import { excerpt } from '../../utility';
import { IoIosTrash } from 'react-icons/io';
import { AiFillEdit } from 'react-icons/ai';

const BlogSection = ({ blogs, user, handleDelete }) => {

  const userId = user?.uid;

  return (
    <div>
      <div className='container'>
        {blogs?.map((item) => (
          <div className='blog' key={item.id}>
            <div className='blog-post'>
              <div className='blog-post-image'>
                <img src={item.imgUrl} alt={item.title} />
                <div></div>
              </div>
            </div>
            <div className='blog-post-content'>
              <div className='blog-post-content-title'>
                <h2>{item.title}</h2>
                <span>
                  <p>{item.author}</p>
                  <p>{item.timestamp.toDate().toDateString()}</p>
                </span>
              </div>
              <div className='blog-post-content-description'>
                {excerpt(item.description, 100)}
              </div>
                <div className='blog-post-content-read-more'>
                  <Link to={`/details/${item.id}` }> <button className='read-more'>Read More</button></Link>
                
                    <div>
                      <IoIosTrash name='trash' style={{ margin: "2px", cursor: "pointer" }} onClick={() => handleDelete(item.id)}/>
                      <Link to={`/update/${item.id}`}><AiFillEdit name='edit' style={{ margin: "2px", cursor: "pointer" }}/> </Link>
                    </div>
                
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;