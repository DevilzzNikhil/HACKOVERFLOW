import React, { useState } from 'react'
import { Container, Form, Col, Row, Button, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useCreatePostMutation } from '../../appApi';
import "../Css/Buttons.css"

function NewArticle() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [uploadimg, setUploadImg] = useState(false);
  const [url, setUrl] = useState("");
  const [createPost, { isLoading, isSuccess }] = useCreatePostMutation();
  let navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!title || !image || !content || !category) {
      return alert("Please Fill the All details")
    }
    createPost({ title, content, image: url, category });

  }



  function upload(e) {
    e.preventDefault();
    if (!image) return;
    setUrl("");
    const data = new FormData();
    data.append('file', image);
    setUploadImg(true);
    data.append('upload_preset', 'sc2mar2v');
    fetch('https://api.cloudinary.com/v1_1/df6wbhkss/image/upload', {
      method: "post",
      body: data,
    }).then((res) => res.json()).then((data) => {
      console.log(data);
      setUrl(data.url);
      setUploadImg(false);
    }).catch(err => {
      console.log(err);
      setUploadImg(false);
    })
  }

  function handleImage(e) {
    const file = e.target.files[0];
    if (file.size > 1048576) {
      setImage(null);
      return alert("File size is large");
    }
    else {
      setImage(file);
    }
  }

  if (isSuccess) {
    setTimeout(() => {
      navigate("/article")
    }, 1000)

    return (
      <>
        <div style={{ marginTop: "10px" }} >

          <div className='text-center'>

            <Spinner animation='border' role="status" variant='primary'>
            </Spinner>
            <h1 className='text-center' style={{ color: "black" }}>Creating Your Article</h1>
          </div>
        </div>
      </>
    );
  }






  return (
    <div style={{ height: '100%' }} className="bgd">
      <Container  >
        <br />
        <Row>
          <Col md={7}>
            <Form onSubmit={handleSubmit} >
              <Form.Group className="mb-3">
                <Form.Label className=' justify-text-center align-text-center' style={{ fontWeight: 'bold', paddingLeft: "20vw", fontSize: "2em" }}>Title</Form.Label>
                <Form.Control style={{ border: "2px solid black" }} type="text" placeholder="Your title" value={title} onChange={(e) => setTitle(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control style={{ border: "2px solid black" }} as="textarea" rows={10} placeholder="Your Content" value={content} onChange={(e) => setContent(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control style={{ border: "2px solid black" }} type="text" placeholder="Your Category" value={category} onChange={(e) => setCategory(e.target.value)} />
              </Form.Group>


              <div className='my-2'> {!url && <p className='alert alert-danger'> Please upload Image</p>}</div>
              <div className='my-2 '>
                <input type="file" onChange={handleImage} accept="image/png, image/jpg" />
                <Button className="my-2" onClick={upload} disabled={uploadimg}>
                  Upload
                </Button>
              </div>
              <Button variant="success" className='btn-lg mb-5' type="submit" style={{ width: '100%' }}>
                Submit
              </Button>
            </Form>
          </Col>
          <Col md={5} className="d-flex justify-content-center align-items-center mb-3">
            {uploadimg && (
              <div className='text-center'>
                <Spinner animation='border' role="status" variant='primary'>
                </Spinner>
                <br />
                <p className='py-2'> Uploading Image</p>
              </div>
            )}
            <div>
              {url && <img src={url} style={{ width: '100%', minHeight: "80vh", objectFit: "cover" }} />}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default NewArticle