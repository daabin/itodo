import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './index.css'

function SubTitle() {
  const { pathname } = useLocation()
  const [subTitle, setSubTitle] = useState('')

  useEffect(() => {
    switch (pathname) {
      case '/':
        setSubTitle('进行中')
        break
      case '/done':
        setSubTitle('已完成')
        break
      default:
        setSubTitle('404')
        break
    }
  }, [pathname])

  return <h2>{subTitle}</h2>
}

export default SubTitle
