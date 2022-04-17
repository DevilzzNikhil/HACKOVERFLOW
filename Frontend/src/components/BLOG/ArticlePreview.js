import { ContentBlock } from 'draft-js';
import React from 'react'
import { Card, Button, ButtonGroup, Spinner } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom';
import { useDeletePostMutation } from '../../appApi';
import "../Css/Buttons.css"

function ArticlePreview({ article, currentUserPost }) {
    const { title, image,_id, content, category, created_at } = article;
    const [deleteArticle, { isLoading, isSuccess }] = useDeletePostMutation();

    function handleDelete() {
        deleteArticle(_id);
    }

    if (isLoading) {
        return (
          <div className='d-flex justify-content-center py-5'>
            <Spinner animation='border' />
          </div>
        )
      }


    return (
        <Card className="text-center"  style={{ width: '18rem', border: "1px solid green" }} >
            <Card.Header className="text-center bg-secondary" as="h5" style={{color:"white"}}>{category}</Card.Header>
            <Card.Img variant="top" src={image || "https://png.pngitem.com/pimgs/s/175-1757251_blog-letters-word-font-internet-write-blogger-blog.png"} style={{ maxHeight: 200, objectFit: "cover" }} />
            <Card.Body >
                <Card.Title>{title.toUpperCase()}</Card.Title>
                <Card.Text>{content.slice(0,50)}.......</Card.Text>
                <LinkContainer to={`/article/${_id}`}>
                    <Button variant='outline-primary' className='mx-2'>View</Button>
                </LinkContainer>

                {currentUserPost && (
                    <>
                        <ButtonGroup>
                            <Button variant="outline-danger" className='mx-2' onClick={handleDelete}>
                            Delete
                            </Button>
                            <LinkContainer to={`/articles/${_id}/edit`}>
                                <Button variant='outline-success' className='mx-2'>Edit</Button>
                            </LinkContainer>
                        </ButtonGroup>
                    </>
                )}
            </Card.Body>
            <Card.Footer className='text-center bg-info'>
                    <small>Last Updated On:</small>
                    <br />
                    <small >{new Date(created_at).toLocaleDateString()} , {new Date(created_at).toLocaleTimeString()}</small>
                </Card.Footer>
        </Card>
    )
}

export default ArticlePreview