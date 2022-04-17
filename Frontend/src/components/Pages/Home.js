import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import "../../components/Css/Buttons.css"
import blog from "../../GIFS/blogging.jpg"
import news from "../../GIFS/news.jpeg"
import todo from "../../GIFS/todolist.png"


function Home() {

    const { user } = useSelector((state) => state.user);


    return (
        <>

        
            <section className='header'>
                
                <div className="text-centere">
                    <h1>WORLD'S GREATEST APP</h1>
                    <p>This website is especially for students to come and make the most out of it<br/>You can do as much things here you can </p>
                    <a href="/Login" className='btng'>Visit Us To Know More</a>
                </div>
            </section>

            <section className="course-offer">
                <h1 style={{color:"black"}}>Activities We Offer</h1>

                <div className="rowz">
                    <div className="colz">
                        <h3>Blog Articles</h3>
                        {!user && <a href='/Login'><img src={blog} className="imgw" alt="" /></a>}
                        {user && <a href='/article'><img src={blog} className="imgw" alt="" /></a>}
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel quibusdam aliquam nobis aperiam libero? Perspiciatis harum maxime nihil aliquam, cumque distinctio reiciendis inventore cum, veritatis et eveniet enim quam voluptates.</p>
                    </div>
                    <div className="colz">
                        <h3>Upcoming Contest</h3>
                        {!user && <a href='/Login'><img src={news} className="imgw" alt="" /></a>}
                        {user && <a href='/general'><img src={news} className="imgw" alt="" /></a>}

                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel quibusdam aliquam nobis aperiam libero? Perspiciatis harum maxime nihil aliquam, cumque distinctio reiciendis inventore cum, veritatis et eveniet enim quam voluptates. lor</p>
                    </div>
                    <div className="colz">
                        <h3>To Do List</h3>
                        {!user && <a href='/Login'><img src={todo} className="imgw" alt="" /></a>}
                        {user && <a href='/ToDoList'><img src={todo} className="imgw" alt="" /></a>}
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel quibusdam aliquam nobis aperiam libero? Perspiciatis harum maxime nihil aliquam, cumque distinctio reiciendis inventore cum, veritatis et eveniet enim quam voluptates.</p>
                    </div>
                </div>
            </section>

        </>


    )
}

export default Home