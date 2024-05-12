import React from 'react'
import './Post.css'
import { Avatar } from '@mui/material'
import { BookmarkBorderOutlined, ChatBubbleOutline, Circle, FavoriteBorderOutlined, MoreHoriz, PollOutlined, PublishOutlined, RepeatOnOutlined, RepeatOutlined, Verified } from '@mui/icons-material'

function Post({postInfo}:any) {

 let {postAnalytics,postAuthorInfo,timeStamp,postContent} = postInfo;

  return (
    <div className='post'>
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
                    <span>{timeStamp}</span>
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
}

export default Post