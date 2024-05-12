'use client'

import React, { useEffect, useState } from 'react'
import './Feed.css'
import Tweetbox from './Tweetbox'
import Post from './Post'
import { collection, getDocs } from 'firebase/firestore'
import {db} from '../../firebaseConfig'


export default function Feed() {

  const [posts,setPosts] = useState([]);

  const getPostsFromDB = async() => {
    const postsCollection = collection(db,'Posts');

    const postsSnapshot = await getDocs(postsCollection);

    let postsList:any = postsSnapshot.docs.map(doc => doc.data());

    console.log(postsList)

    setPosts(postsList);
  }

  useEffect(()=>{
    getPostsFromDB()
  },[posts])
  

  // const postInfo = {
  //   postAuthorInfo:{
  //     profileImg:'/images/profile_picture_latest.jpg',
  //     accountName:'Kaustav Banerjee',
  //     userName:'@kaustav1810',
  //     isVerified:true,
  //   },
  //   timeStamp:'15h',
  //   postContent: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio ipsam laboriosam quidem similique aliquid corrupti quae quibusdam adipisci soluta nemo? Ducimus, cupiditate voluptatibus. Odio, laudantium mollitia dolorem fugiat nostrum quod?Illum praesentium quo eveniet nulla, odio aperiam nostrum. Ab cupiditate quisquam architecto odit explicabo laborum veniam',
  //   postAnalytics:{
  //     likesCount:45,
  //     commentsCount:4,
  //     shareCount:5
  //   }
  
  // }
  return (
    <div className='feed'>
        <Tweetbox/>
        {posts.map(postItem => <Post postInfo={postItem}/> )}
    </div>
  )
}