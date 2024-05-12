'use client'

import { Ballot, BallotOutlined, CalendarMonth, CalendarMonthOutlined, GifBox, GifBoxOutlined, LocationDisabledOutlined, LocationOn, LocationOnOutlined, Photo, PhotoOutlined, SentimentSatisfied, SentimentSatisfiedOutlined } from '@mui/icons-material'
import { Avatar, Button } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { getDatabase, ref, set } from 'firebase/database'

import './Tweetbox.css'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebaseConfig'

function Tweetbox({getPostsFromDB}) {

    const [userInput,setuserInput] = useState('');



    const handleUserInput = (e:any) => { 
        setuserInput(e.target.value)
    }

    const createPost = async() => { 

        const docRef = await addDoc(collection(db, "Posts"), {
            
            postAuthorInfo:{
              profileImg:'/images/profile_picture_latest.jpg',
              accountName:'Kaustav Jamul',
              userName:'@efwuef87987f',
              isVerified:false,
            },
            timeStamp:'152332h',
            postContent: userInput,
            postAnalytics:{
              likesCount:-5,
              commentsCount:4,
              shareCount:5
          
          }
        });

        getPostsFromDB()
          
        setuserInput('');
     }

  return (
    <div className='tweetBox'>
        <div className='tweetBox_avatar'>
            <Avatar className='avatar' src='/images/profile_picture_latest.jpg'/>
        </div>
        <div className='tweetBox_options'>
            <input value={userInput} onChange={handleUserInput} placeholder='What is happening?!' type="text" />
            <div>

                <div>
                    <PhotoOutlined  className='tweetBox_options_icons'/>
                    <GifBoxOutlined  className='tweetBox_options_icons'/>
                    <BallotOutlined className='tweetBox_options_icons'/>
                    <SentimentSatisfiedOutlined className='tweetBox_options_icons'/>
                    <CalendarMonthOutlined className='tweetBox_options_icons'/>
                    <LocationOnOutlined className='tweetBox_options_icons'/>
                </div>
                <div>
                    <Button onClick={createPost} disabled={userInput==''} variant="contained" className='postBtn'>Post</Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Tweetbox