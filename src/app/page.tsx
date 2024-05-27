'use client'
import Image from "next/image";
import './App.css'
import Feed from '../components/Feed/Feed';
import Sidebar from "../components/Sidebar/Sidebar";
import React from "react";
import withAuth from "./hoc/withAuth";
import TrendingTopics from "../components/TrendingTopics/TrendingTopics";
import NavBar from "../components/NavBar/NavBar";

 const Home = ()=> {
  return (
<>
    <NavBar/>
    
    <div className="container">

    <Sidebar/>

    {/* Feed */}
    <Feed/>


    {/* Widgets */}
    <TrendingTopics/>
    
    </div>
</>
  );
}

export default withAuth(Home);