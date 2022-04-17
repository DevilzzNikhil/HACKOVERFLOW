import React from 'react'
import { useGetOnePostsQuery } from '../../appApi'
import { useParams } from 'react-router-dom'
import {Spinner } from 'react-bootstrap'
import "../Css/SingleArticle.css"
import Footer from '../Pages/Footer'
import { useNavigate } from 'react-router-dom';

function SingleArticle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoading, data: article, isError } = useGetOnePostsQuery(id);

  function handlePreviousPage(){
    navigate('/article');
  }

  if (isError) {
    return (
      <div>
        <h1 className='text-center'>An Error occured</h1>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className='d-flex justify-content-center py-5'>
        <Spinner animation='border' />
      </div>
    )
  }

  return (
    <section className='bg-article' >
      <div className='single-article'>
        <h1 className='h1'>{article.title}</h1>
        <img src={article.image} style={{ width: "100%", objectFit: "cover" }} />
        <h4 className='h4 mb-4'>
          By :{article.creator.email}
        </h4>
        <p className='p'>
          {article.content}
        </p>
      </div>
      <div className='text-center'>
      <button className='buttonw' onClick={handlePreviousPage}>&larr; Previous Page </button>
      </div>
      

      <Footer/>

    </section>



  )
}

export default SingleArticle