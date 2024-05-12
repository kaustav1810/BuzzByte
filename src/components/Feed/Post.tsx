import React from 'react'
import './Post.css'
import { Avatar } from '@mui/material'
import { BookmarkBorderOutlined, ChatBubbleOutline, Circle, FavoriteBorderOutlined, MoreHoriz, PollOutlined, PublishOutlined, RepeatOnOutlined, RepeatOutlined, Verified } from '@mui/icons-material'

function Post() {
  return (
    <div className='post'>
        <div>
            <div>
                <Avatar src="/images/profile_picture_latest.jpg"/>
            </div>
            <div className='post_header'>
                <div>
                    <span>Kaustav banerjee</span>
                    <Verified/>
                    <span>@Kaustav1810</span>
                    <Circle fontSize='small'/>
                    <span>15h</span>
                </div>
                <div className='post_content'>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit voluptatibus eum quo quos nulla totam odio architecto? Voluptas eum, expedita sunt, quaerat ad delectus, vel recusandae ipsam asperiores iusto quae.
                </div>
                
            </div>
            <div>
                <MoreHoriz/>
            </div>
        </div>
        <div className='post_options'>
            <div>
                <ChatBubbleOutline className='post_options_icons'/>
                <span>19</span>
            </div>
            <div>
                <RepeatOutlined className='post_options_icons'/>
                <span>2</span>
            </div>
            <div>
                <FavoriteBorderOutlined className='post_options_icons'/>
                <span>5.3k</span>
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