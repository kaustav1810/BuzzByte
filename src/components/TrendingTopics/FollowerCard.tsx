import { Verified } from '@mui/icons-material';
import { Avatar, Box, Button, Typography } from '@mui/material';
import React from 'react'
import './FollowerCard.css';

export const FollowerCard = ({followerInfo}) => {

 const {accountName,avatar,accountHandle} = followerInfo;

  return (
    <Box p={2} className='followerCard' display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
        <Box display={"flex"}>

            <Avatar className='avatar' src={avatar}/>
        <Box ml={1} display={"flex"} flexDirection={"column"} className='accountInfo'>
            <Box display={"flex"} alignItems={"center"}>
                <Typography fontWeight={"bold"}>
                    {accountName}

                </Typography>
                <span><Verified className={"verifiedIcon"}/></span>
            </Box>
            <Typography variant="body2" color="textSecondary" component="span">{accountHandle}</Typography>
        </Box>
        </Box>
        <div>
            <Button variant={"contained"} className='followBtn'>Follow</Button>
        </div>
    </Box>
  )
}
