import React from 'react'
import dayjs from 'dayjs'
import PubSub from 'pubsub-js'
import { Checkbox, Toast, Button, Dropdown } from '@douyinfe/semi-ui'
import request from '../../utils/request'
import { IconCalendar, IconMore, IconDelete } from '@douyinfe/semi-icons'
import './index.css'

function TodoItem({ todoItem }) {
  const handleChange = (checked) => {
    const completedTs = checked ? Date.now() : null

    request
      .put(`/${todoItem.id}`, {
        ...todoItem,
        completed: checked,
        completedAt: completedTs,
      })
      .then(() => {
        PubSub.publish('refresh.todo.list')
      })
      .catch(() => {
        Toast.success({
          content: '执行失败，请重试',
          showClose: false,
        })
      })
  }

  const handleDelete = () => {
    request
      .delete(`/${todoItem.id}`)
      .then(() => {
        PubSub.publish('refresh.todo.list')
      })
      .catch(() => {
        Toast.success({
          content: '执行失败，请重试',
          showClose: false,
        })
      })
  }

  const Extra = () => {
    return (
      <>
        {todoItem.completed ? (
          <p className="time-completed">
            <IconCalendar />
            &nbsp;
            {dayjs(todoItem.completedAt).format('MM月D日 HH:mm') + ' 完成'}
          </p>
        ) : (
          todoItem.deadline && (
            <p className="time-deadline">
              <IconCalendar />
              &nbsp;{dayjs(todoItem.deadline).format('MM月D日 HH:mm') + ' 截止'}
            </p>
          )
        )}
      </>
    )
  }

  return (
    <div key={todoItem.id} className="todo-item-wrap">
      <Checkbox
        defaultChecked={todoItem.completed}
        extra={<Extra></Extra>}
        onChange={(e) => handleChange(e.target.checked)}
      >
        <p className={todoItem.completed ? 'completed' : ''}>
          {todoItem.title}
        </p>
      </Checkbox>
      <Dropdown
        trigger={'hover'}
        position={'bottomLeft'}
        render={
          <Dropdown.Menu>
            <Dropdown.Item className="delete-btn" onClick={handleDelete}>
              {' '}
              <IconDelete /> 删除任务
            </Dropdown.Item>
          </Dropdown.Menu>
        }
      >
        <Button className="opt-btn" icon={<IconMore />} />
      </Dropdown>
    </div>
  )
}

export default TodoItem
