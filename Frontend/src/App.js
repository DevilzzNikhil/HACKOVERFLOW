import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from './components/Coding_Contest/NavBar';
import Login from './components/Pages/Loginpage'
import Signup from './components/Pages/SignupPage';
import Contest from './components/Coding_Contest/Contest_page'
import { useSelector } from 'react-redux';
import NewArticle from './components/BLOG/NewArticle';
import EditArticles from './components/BLOG/EditArticles';
import MyArticles from './components/BLOG/MyArticles';
import SingleArticle from './components/BLOG/SingleArticle';
import Home from './components/Pages/Home'
import AllArticles from './components/Pages/AllArticles';
import NotFoundPage from './components/Pages/NotFoundPage';
import Footer from './components/Pages/Footer';
import Lists from './components/ToDo/Lists';
import './App.css';


const App = () => {

  const { user } = useSelector((state) => state.user);
  return (
    <div>
      <Router>
        <NavBar />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/codeForces" element={<Contest key="CodeForces" name="Code Forces" category="codeforces" />} />
          <Route exact path="/general" element={<Contest key="General" name="Code Forces" category="all" />} />
          <Route exact path="/topCoder" element={<Contest key="Top Coder" name="Top Coder" category="top_coder" />} />
          <Route exact path="/atcoder" element={<Contest key="At coder" name="At Coder" category="at_coder" />} />
          <Route exact path="/codechef" element={<Contest key="Code Chef" name="Code Chef" category="code_chef" />} />
          <Route exact path="/hackerRank" element={<Contest key="Hacker Earth" name="Hacker Rank" category="hacker_rank" />} />
          <Route exact path="/kickstart" element={<Contest key="Kick Start" name="Kick Start" category="kick_start" />} />
          <Route exact path="/leetcode" element={<Contest key="Leet Code" name="Leet Code" category="leet_code" />} />
          <Route exact path="/hackerEarth" element={<Contest key="Leet Code" name="Hacker Earth" category="hacker_earth" />} />


          
            <>
              <Route exact path="/Login" element={<Login />} />
              <Route exact path="/Signup" element={<Signup />} />
              
            </>
          

          {user && (
            <>
              <Route exact path="/new-articles" element={<NewArticle />} />
              <Route exact path="/articles/:id/edit" element={<EditArticles />} />
              <Route exact path="/my-articles" element={<MyArticles />} />
              <Route exact path="/article/:id" element={<SingleArticle />} />
              <Route exact path="/article" element={<AllArticles />} />
              <Route exact path="/ToDoList" element={<Lists/>} />
            </>
          )}

          <Route exact path="*" element={<NotFoundPage/>} />




        </Routes>

        <Footer/>
      </Router>


    </div>
  )

}

export default App;