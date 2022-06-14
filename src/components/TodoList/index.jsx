import React, { useEffect, useRef, useState } from 'react'
import PubSub from 'pubsub-js'
import request from '../../utils/request'
import { Card, Spin, Empty, Toast } from '@douyinfe/semi-ui'
import { IllustrationNoContent } from '@douyinfe/semi-illustrations'
import TodoItem from '../TodoItem'

import './index.css'

function TodoList({ type }) {
  const [loading, setLoading] = useState(true)
  const [todoList, setTodoList] = useState([])
  const reloadingRef = useRef(false)

  useEffect(() => {
    goGetList()
  }, [type])

  useEffect(() => {
    PubSub.subscribe('refresh.todo.list', () => {
      reloadingRef.current = true
      goGetList()
    })
    return () => {
      PubSub.unsubscribe('refresh.todo.list')
    }
  }, [])

  const goGetList = () => {
    request
      .get('', {
        offset: 0,
        limit: 30,
      })
      .then((res) => {
        const filterData =
          type === 'done'
            ? res.data.filter((item) => item.completed)
            : res.data.filter((item) => !item.completed)
        setTodoList(filterData)
      })
      .catch(() => {
        Toast.error({
          content: '请求失败，请刷新重试',
          showClose: false
        })
      })
      .finally(() => {
        setLoading(false)
        reloadingRef.current = false
      })
  }

  if (loading) {
    return (
      <div className="loading-wrap">
        <Spin />
      </div>
    )
  }

  if (!loading && todoList.length === 0) {
    return (
      <Empty
        style={{ marginTop: 48 }}
        image={<IllustrationNoContent style={{ width: 150, height: 150 }} />}
        title={`暂无${type === 'todo' ? '待办' : '已完成'}任务`}
      ></Empty>
    )
  }

  return (
    <Spin spinning={!!reloadingRef.current}>
      <Card style={{ marginTop: 12 }}>
        {todoList.length > 0 &&
          todoList.map((item) => {
            return <TodoItem todoItem={item} key={item.id}></TodoItem>
          })}
      </Card>
    </Spin>
  )
}

export default TodoList
