import React from 'react'
import "../Css/NotFoundPage.css"
import { Container } from 'react-bootstrap'
import image from "../../GIFS/notfound.png"

function NotFoundPage() {
    return (

        <>
        <div className='bg-img'>
        </div>
            <Container>
                <div className='position'>
                    <h1 className='text-center h1' style={{ fontSize: "100px", margin: "0" }}> 404 </h1>
                    <h3 className='text-center h1  '>Oops, the page you're looking for does not exist.</h3>
                    <div class="text-center  h1 my-5">
                        <a href="/Login"><button type="button" className="btn btn-lg btn-primary ">Home Page</button></a>
                    </div>
                </div>
            </Container>
        </>

    )
}

export default NotFoundPage