'use client'

import React, { useEffect, useState } from 'react'
import './Feed.css'
import Tweetbox from './Tweetbox'
import Post from './Post'
import { collection, getDocs } from 'firebase/firestore'
import {db} from '../../firebaseConfig'


export default function Feed() {

  const [posts,setPosts] = useState([]);
  
  const postsCollection = collection(db,'Posts');

  const getPostsFromDB = async() => {
    
    const postsSnapshot = await getDocs(postsCollection);

    let postsList:any = postsSnapshot.docs.map(doc => {
      return {...doc.data(),postId:doc.id}
    });

    console.log(postsList)

    setPosts(postsList);
  }

  useEffect(()=>{
    getPostsFromDB()
  },[])
  

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
        <Tweetbox getPostsFromDB={getPostsFromDB}/>
        {posts.map(postItem => <Post key={postItem.postId} postInfo={postItem}/> )}
    </div>
  )
}