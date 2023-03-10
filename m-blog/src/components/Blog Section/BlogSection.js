import React from 'react';
import './BlogSection.css';
import { Link } from 'react-router-dom';
import { excerpt } from '../../utility';
import { IoIosTrash } from 'react-icons/io';
import { AiFillEdit } from 'react-icons/ai';

const BlogSection = ({ blogs, user }) => {
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
                  <IoIosTrash name='trash' style={{ margin: "2px", cursor: "pointer", size: "2px" }} />
                  <AiFillEdit name='edit' style={{ margin: "2px", cursor: "pointer", size: "2px" }}/>
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



/*
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { excerpt } from '../utility';
import './BlogSection.css';

const BlogSection = ({ blogs, user }) => {
  return (
    <div>
      <div className="container">
        {blogs?.map((item) => (
          <div className="blog" key={item.id}>
            <div className="blog-post">
              <div className="blog-post-image">
                <img src={item.imgUrl} alt={item.title} />
                <div />
              </div>
            </div>
            <div className="blog-post-content">
              <div className="blog-post-content-title">
                <h2>{item.title}</h2>
                <span>
                  <p>{item.author}</p>
                  {item.timestamp.toDate().toDateString()}
                </span>
              </div>
              <div className="blog-post-content-description">
                {excerpt(item.description, 100)}
              </div>
              <div className="blog-post-content-read-more">
                <button className="read-more">Read More</button>
                <div>
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ margin: '15px', cursor: 'pointer' }}
                    size="2x"
                  />
                  <FontAwesomeIcon
                    icon={faEdit}
                    style={{ margin: '15px', cursor: 'pointer' }}
                    size="2x"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

BlogSection.propTypes = {
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      imgUrl: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      timestamp: PropTypes.instanceOf(Date).isRequired,
      description: PropTypes.string.isRequired,
    }),
  ).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default BlogSection;
*/

/*
import React from 'react'
import './BlogSection.css';
import { Link } from 'react-router-dom';
import { excerpt } from '../utility';
import FontAwesome from 'react-fontawesome';

const BlogSection = ({blogs, user}) => {
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
                            {item.timestamp.toDate().toDateString()}
                        </span>
                    </div>
                    <div className='blog-post-content-description'>
                        {excerpt(item.description, 100)}
                    </div>
                    <div className='blog-post-content-read-more'>
                        <button className='readMore'>Read More</button>
                        <div>
                            <FontAwesome name='trash' style={{ margin: "15px", cursor: "pointer" }} size="2x"/>
                            <FontAwesome name='edit' style={{ margin: "15px", cursor: "pointer" }} size="2x"/>
                        </div>
                    </div>
                </div>
            ))}
            </div>
       </div>
  )
}

export default BlogSection;
*/