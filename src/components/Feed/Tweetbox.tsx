import { Ballot, BallotOutlined, CalendarMonth, CalendarMonthOutlined, GifBox, GifBoxOutlined, LocationDisabledOutlined, LocationOn, LocationOnOutlined, Photo, PhotoOutlined, SentimentSatisfied, SentimentSatisfiedOutlined } from '@mui/icons-material'
import { Avatar, Button } from '@mui/material'
import React from 'react'
import './Tweetbox.css'

function Tweetbox() {
  return (
    <div className='tweetBox'>
        <div className='tweetBox_avatar'>
            <Avatar className='avatar' src='/images/profile_picture_latest.jpg'/>
        </div>
        <div className='tweetBox_options'>
            <input placeholder='What is happening?!' type="text" />
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
                    <Button disabled variant="contained" className='postBtn'>Post</Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Tweetbox