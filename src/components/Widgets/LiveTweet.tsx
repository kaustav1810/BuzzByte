import React from 'react'
import './LiveTweet.css';
import Avatar from '@mui/material/Avatar';
import { Box, Typography } from '@mui/material';
import { Badge, Verified } from '@mui/icons-material';

export const LiveTweet = ({liveTweetInfo}) => {

 const {avatar,accountName,liveTweetHeader,liveWatchCount} = liveTweetInfo;

  return (
    <Box className='liveTweet'>
        <Box display="flex" className='liveTweet-accountInfo'>
            <Avatar className='liveTweet-avatar' src={avatar} />
                <Typography ml={1} fontWeight="bold" component="div" display="flex" alignItems="center">
                    {accountName}
                <Verified className='verifiedIcon' />
                <Typography variant="body2" color="textSecondary" component="span" style={{ marginLeft: '4px' }}>
                    is hosting
                </Typography>
                </Typography>
                
        </Box>
      <Box display="flex" justifyContent={'space-between'} alignItems={"flex-start"}>
      <Typography className='liveTweetHeader' variant="body1" fontWeight="bold">
          {liveTweetHeader}
        </Typography>
        <Box className={"liveWatchCount"} display={'flex'} alignItems={"center"}  justifyContent={"space-between"}>
            <Avatar className='liveTweet-avatar-2' src={avatar}/>
            <Box ml={1}>{`+${liveWatchCount}`}</Box>
        </Box>
      </Box>
    </Box>
  )
}
