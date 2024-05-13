import React, { forwardRef } from 'react'
import './Post.css'
import { Avatar } from '@mui/material'
import { BookmarkBorderOutlined, ChatBubbleOutline, Circle, FavoriteBorderOutlined, MoreHoriz, PollOutlined, PublishOutlined, RepeatOnOutlined, RepeatOutlined, Verified } from '@mui/icons-material'

const Post = forwardRef(({postInfo}:any,ref:any)=> {

 let {postAnalytics,postAuthorInfo,timeStamp,postContent} = postInfo;

 const getPostCreatedTime = (postTimeStamp) => { 
    let timeDifference = new Date().getTime() - new Date(postTimeStamp).getTime();

    const secondsAgo = Math.floor(timeDifference / 1000); // Convert milliseconds to seconds
    const minsAgo = Math.floor(secondsAgo / 60); // Convert seconds to minutes
    const hoursAgo = Math.floor(minsAgo / 60); // Convert minutes to hours
    const daysAgo = Math.floor(hoursAgo / 24); // Convert hours to days
    const weeksAgo = Math.floor(daysAgo / 7); // Convert days to weeks
    const monthsAgo = Math.floor(daysAgo / 30); // Convert days to months
    const yearsAgo = Math.floor(daysAgo / 365); // Convert days to years

    if (yearsAgo > 0) {
        return yearsAgo + 'y';
    } else if (monthsAgo > 0) {
        return monthsAgo + 'mo';
    } else if (weeksAgo > 0) {
        return weeksAgo + 'w';
    } else if (daysAgo > 0) {
        return daysAgo + 'd';
    } else if (hoursAgo > 0) {
        return hoursAgo + 'h';
    } else if (minsAgo > 0) {
        return minsAgo + 'm';
    } else {
        return secondsAgo + 's';
    }  
 }

  return (
    <div className='post' ref={ref}>
        <div>
            <div>
                <Avatar src={postAuthorInfo.profileImg}/>
            </div>
            <div className='post_header'>
                <div>
                    <span>{postAuthorInfo.accountName}</span>
                    {postAuthorInfo.isVerified && <Verified className='verifiedBadge'/>}
                    <span>{postAuthorInfo.userName}</span>
                    <Circle fontSize='small' className='separator'/>
                    <span>{getPostCreatedTime(timeStamp)}</span>
                </div>
                <div className='post_content'>{postContent}</div>
                
            </div>
            <div>
                <MoreHoriz/>
            </div>
        </div>
        <div className='post_options'>
            <div>
                <ChatBubbleOutline className='post_options_icons'/>
                <span>{postAnalytics.commentsCount}</span>
            </div>
            <div>
                <RepeatOutlined className='post_options_icons'/>
                <span>{postAnalytics.shareCount}</span>
            </div>
            <div>
                <FavoriteBorderOutlined className='post_options_icons'/>
                <span>{postAnalytics.likesCount}</span>
            </div>
                <PollOutlined className='post_options_icons'/>
            <div>
                <div>
                    <BookmarkBorderOutlined className='post_options_icons'/>
                </div>
                <div>
                    <PublishOutlined className='post_options_icons'/>
                </div>
            </div>
        </div>
    </div>
  )
})

export default Post