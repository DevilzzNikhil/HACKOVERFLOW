import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import "../Css/Buttons.css"

function MainArticle({ article }) {
    const { title, image, content, _id } = article;

    return (
        <>
        <br />
            <Row className="pb-4">
                <Col md={6} className="main-article__image-contianer">
                    <img src={image} style={{ width: "100%", maxHeight: 400 }} />
                </Col>
                <Col md={6}>
                <h1 className='mt-5 text-center bouncings'>
                    {title}
                   
                    </h1>
                    <div className='text-center' style={{backgroundColor:"white"}}>{content.substring(0, 800)}.....</div>
                    <LinkContainer className="my-3 " to={`/article/${_id}`}>
                        <Button variant="info">Read More</Button>
                    </LinkContainer>
                </Col>

            </Row>
        </>
    )
}

export default MainArticle