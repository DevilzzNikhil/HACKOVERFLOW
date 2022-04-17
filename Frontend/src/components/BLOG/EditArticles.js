import React, { useState } from 'react'
import { Container, Form, Col, Row, Button, Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdatePostMutation } from '../../appApi';
import "../Css/Buttons.css"




function EditArticle() {
  const { id } = useParams();
  const posts = useSelector((state) => state.post);
  const postToedit = posts.find((post) => post._id == id);
  const [updateArtilce, { isSuccess }] = useUpdatePostMutation();

  const [title, setTitle] = useState(postToedit.title);
  const [content, setContent] = useState(postToedit.content);
  const [category, setCategory] = useState(postToedit.category);
  const [image, setImage] = useState();
  const [uploading, setUploading] = useState(false);
  const [newImage, setNewImage] = useState(false);

  const [url, setUrl] = useState(postToedit.image);
  let navigate = useNavigate();


  function handleUpdation(e) {
    e.preventDefault();
    if (!title || !content|| !image || !category) {
      return alert("Title and Content required");
    }
    updateArtilce({ id, title, content, image: url, category });
  }

  function upload(e) {
    e.preventDefault();
    if (!image) return;
    setUrl(postToedit.image);
    const data = new FormData();
    data.append('file', image);
    setNewImage(true);
    setUploading(true);
    data.append('upload_preset', 'sc2mar2v');
    fetch('https://api.cloudinary.com/v1_1/df6wbhkss/image/upload', {
      method: "post",
      body: data,
    }).then((res) => res.json()).then((data) => {
      setUrl(data.url);
      setUploading(false);
    }).catch(err => {
      console.log(err);
      setUploading(false);
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
        <div className='my-4' >
          <div className='text-center'>
          <h1 className='text-center' style={{color:"black"}}>Updating  Your Article</h1>
            <Spinner animation='border' role="status" variant='primary'>
            </Spinner>
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
            <h2 className='text-center animate-charcter' style={{ fontWeight: 'bold', fontSize: "3.5em" }}>Edit Article</h2>
            <Form onSubmit={handleUpdation} >
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


              <div className='my-2'> {!url && <p className='alert alert-info'>You can change image also</p>}</div>
              <div className='my-2 '>
                <input type="file" onChange={handleImage} accept="image/png, image/jpg" />
                <Button className="my-2" onClick={upload} disabled={uploading}>
                  Upload
                </Button>
              </div>
              <Button variant="success" className='btn-lg mb-5' type="submit" style={{ width: '100%' }}>
                Save Changes
              </Button>
            </Form>
          </Col>
          <Col md={5} className="d-flex justify-content-center align-items-center mb-3">
            {uploading && (
              <div className='text-center'>
                <Spinner animation='border' role="status" variant='primary'>
                </Spinner>
                <br />
                <p className='py-2'> Uploading Image</p>
              </div>
            )}
            <div>
              {url && !newImage && <img src={url} style={{ width: '100%',minHeight:"80vh", objectFit: "cover" }} />}
              {url && newImage && !uploading && <img src={url} style={{ width: '100%',minHeight:"80vh", objectFit: "cover" }} />}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
  

  
}

export default EditArticle;