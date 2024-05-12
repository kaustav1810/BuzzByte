import React from 'react'
import './Feed.css'
import Tweetbox from './Tweetbox'
import Post from './Post'

export default function Feed() {
  return (
    <div className='feed'>
        <Tweetbox/>
        <Post/>
    </div>
  )
}