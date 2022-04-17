import React from 'react'
import { Container, Row, Col, ListGroup, Spinner } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import MainArticle from '../BLOG/MainArticle';
import ArticlePreview from '../BLOG/ArticlePreview';
import { useGetAllPostsQuery } from '../../appApi';
import "../Css/Buttons.css"
import Footer from './Footer';

function AllArticles() {

    const { data: posts, isLoading, isError } = useGetAllPostsQuery();

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


    const sidebarposts = posts?.slice(posts.length - 5, posts.length);
    const startposts = posts?.slice(posts.length - 3, posts.length);
    const allposts = posts?.slice(0, posts.length-3);


    return (
        <>
            <div className='bg-articles'>
                <Container className=''>
                    <div className='banner mb-5 text-center'>
                    <h1 className='mt-5 bouncing'>BLOG ARTICLES
                    </h1>
                    </div>
                 

                        <Row>
                            <MainArticle article={posts[posts.length - 1]} />
                            <Col md={9} className='blog-main d-flex pb-4 flex-wrap gap-5'>
                                {startposts.slice(0).reverse().map((article, idx) => <ArticlePreview article={article} key={idx} />)}
                            </Col>

                            <Col md={3} className="blog-sidebar">
                                <h3 className='text-center' style={{ color: "white" }}>Latest Articles</h3>
                                <ListGroup as="ol" numbered>
                                    {sidebarposts.slice(0).reverse().map((article, idx) => (
                                        <LinkContainer to={`/article/${article._id}`} key={idx} >
                                            <ListGroup.Item as="li" className='my-2'>{article.title}</ListGroup.Item>
                                        </LinkContainer>
                                    ))}
                                </ListGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col className='d-flex pb-4 gap-5 flex-wrap'>
                                {allposts.slice(0).reverse().map((article, idx) => <ArticlePreview article={article} key={idx} />)}
                            </Col>
                        </Row>

                </Container>
                <Footer />
            </div>
        </>
    )
}

export default AllArticles