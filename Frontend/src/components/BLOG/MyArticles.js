import React from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useGetAllUsersPostsQuery } from '../../appApi'
import ArticlePreview from './ArticlePreview';
import "../Css/Buttons.css"
import Footer from '../Pages/Footer';

function MyArticles() {

  const { data: userarticles, isLoading, isError } = useGetAllUsersPostsQuery();


  if (isError) {
    return (
      <>
        <div>
          <h1 className='text-center'>
            An Error occured
          </h1>
        </div>
      </>
    )
  }

  if (isLoading) {
    return (
      <div className='d-flex justify-content-center py-5'>
        <Spinner animation='border' />
      </div>
    )
  }

  if (userarticles.length === 0) {
    return (
      <div className='d-flex justify-content-center py-5'>
        <h1 style={{color:"black"}}>You Dont Have Any Articles To Show</h1>
      </div>
    )
  }

  return (
    <>
      <div className='bg-articles'>
        <Container className=''>
          <div className='banner mb-5 text-center'>
            <h1 className='mt-5 bouncing'>MY ARTICLES
            </h1>
          </div>
          <Row>
            <Col className='d-flex pb-4 gap-5 flex-wrap'>
              {userarticles.map((article, idx) => <ArticlePreview article={article} key={idx} currentUserPost={true} />)}
            </Col>
          </Row>

        </Container>
        <Footer/>
      </div>
      
    </>
  )


}

export default MyArticles