import React from 'react'
import { Outlet } from 'react-router-dom'
import CustomLink from '../CustomLink'
import SubTitle from '../SubTitle'
import './index.css'

function Layout() {
  return (
    <div className="app">
      <nav className="nav">
        <h1 className="title">任务</h1>
        <ul className="menu">
          <li>
            <CustomLink to="/">进行中</CustomLink>
          </li>
          <li>
            <CustomLink to="/done">已完成</CustomLink>
          </li>
        </ul>
      </nav>
      <div className="content">
        <SubTitle></SubTitle>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
