import Twitter from '@mui/icons-material/Twitter'
import React, { ReactElement, ReactHTMLElement } from 'react'
import  './SidebarOptions.css'

type propTypes = {
  Icon:any;
  text?:string;
}

export default function SidebarOptions({Icon,text}:propTypes) {

  return (
    <div className='sidebar-options'>
      <Icon className='sidebar-icons'/>
      <span>{text}</span>
    </div>

  )
}
