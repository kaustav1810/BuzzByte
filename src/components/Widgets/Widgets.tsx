'use client'

import React from 'react'
import './Widgets.css';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {LiveTweet} from './LiveTweet';
import {FollowerCard} from './FollowerCard';
import { Search } from '@mui/icons-material';
import { Box, IconButton, InputBase } from '@mui/material';
import styled from '@emotion/styled';
import Link from 'next/link';

const liveTweets = [
  {
    avatar:'images/profile_picture_latest.jpg',
    accountName:'Kaustav Banerjee',
    liveTweetHeader:'Live: We are live building twitter clone!!',
    liveWatchCount: '12.9k'
  },
  {
    avatar:'images/profile_picture_latest.jpg',
    accountName:'Kaustav Banerjee',
    liveTweetHeader:'Live: We are live building twitter clone!!',
    liveWatchCount: '12.9k'
  },
  {
    avatar:'images/profile_picture_latest.jpg',
    accountName:'Kaustav Banerjee',
    liveTweetHeader:'Live: We are live building twitter clone!!',
    liveWatchCount: '12.9k'
  },
  {
    avatar:'images/profile_picture_latest.jpg',
    accountName:'Kaustav Banerjee',
    liveTweetHeader:'Live: We are live building twitter clone!!',
    liveWatchCount: '12.9k'
  },
  {
    avatar:'images/profile_picture_latest.jpg',
    accountName:'Kaustav Banerjee',
    liveTweetHeader:'Live: We are live building twitter clone!!',
    liveWatchCount: '12.9k'
  },
]

const followerSuggestions = [
    {
      avatar:"images/profile_picture_latest.jpg",
      accountName: "Kaustav Banerjee",
      accountHandle:"@kaustav1810",
    },
    {
      avatar:"images/profile_picture_latest.jpg",
      accountName: "Kaustav Banerjee",
      accountHandle:"@kaustav1810",
    },
    {
      avatar:"images/profile_picture_latest.jpg",
      accountName: "Kaustav Banerjee",
      accountHandle:"@kaustav1810",
    },
]

const SearchBox = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#f1f3f4',
  borderRadius: '50px',
  padding: '5px 15px',
  position: 'sticky'
}));

export default function Widgets() {
  return (
    <div className='widgets'>
        <Box>
        <SearchBox>
          <IconButton sx={{ p: '10px' }} aria-label="search">
            <Search />
          </IconButton>
          <InputBase
            placeholder="Search"
            inputProps={{ 'aria-label': 'search' }}
            sx={{ ml: 1, flex: 1 }}
          />
        </SearchBox>
      </Box>
      
      <div className="widgets-card">
        <h2>Live on X</h2>
        {liveTweets.map(liveTweet => <LiveTweet liveTweetInfo={liveTweet}/>)}
        <div className='show-more-link'>
          <Link  href={'#'}>Show more</Link>
        </div>
      </div>

      <div className="widgets-card">
        <h2>Who to follow</h2>
        {followerSuggestions.map(follower => <FollowerCard followerInfo={follower}/>)}
        <div className='show-more-link'>
          <Link href={'#'}>Show more</Link>
        </div>
      </div>
    </div>
  )
}
