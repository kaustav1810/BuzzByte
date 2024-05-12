import React from 'react'
import SidebarOptions from './SidebarOptions'
import './Sidebar.css'
import { BookmarkBorder, Home, HomeOutlined, ListAlt, MailOutline, MoreHoriz, MoreHorizRounded, NotificationsNone, People, PeopleOutline, PermIdentity, Search, X } from '@mui/icons-material'
import Twitter from '@mui/icons-material/Twitter'
import Button from '@mui/material/Button/Button'
import Image from 'next/image'
import { Avatar } from '@mui/material'

export default function Sidebar() {
  return (
    <div className='sidebar'>
      <X className='twitter_icon'/>
      {/* <SidebarOptions Icon={Twitter}/> */}
      <SidebarOptions Icon={HomeOutlined} text={'Home'}/>
      <SidebarOptions Icon={Search} text={'Explore'}/>
      <SidebarOptions Icon={NotificationsNone} text={'Notifications'}/>
      <SidebarOptions Icon={MailOutline} text={'Messages'}/>
      <SidebarOptions Icon={ListAlt} text={'Lists'}/>
      <SidebarOptions Icon={BookmarkBorder} text={'Bookmarks'}/>
      <SidebarOptions Icon={PeopleOutline} text={'Communities'}/>
      <SidebarOptions Icon={X} text={'Premium'}/>
      <SidebarOptions Icon={PermIdentity} text={'Profile'}/>
      <SidebarOptions Icon={MoreHorizRounded} text={'More'}/>
      <Button fullWidth variant="contained" className='postBtn'>Post</Button>

      <div className='sidebar-profile'>
        <div>
          {/* <Image 
          className='profile-pic'
          src="/images/profile_picture_latest.jpg" 
          alt="profile_pic" 
          width={50}
          height={50}
          /> */}
          <Avatar className='profile-pic' src='/images/profile_picture_latest.jpg'/>
        </div>
        <div className='profile-handle'>
          <div>Kaustav Banerjee</div>
          <div>@kaustav1810</div>
        </div>
        <div className='more-icon'>
          <MoreHoriz/>
        </div>
      </div>
    </div>
  )
}
