import React, { useState } from 'react'
import dayjs from 'dayjs'
import PubSub from 'pubsub-js'
import request from '../../utils/request'
import { Card, Input, Button, DatePicker, Toast } from '@douyinfe/semi-ui'
import { IconPlus } from '@douyinfe/semi-icons'
import './index.css'

function CreateTodo() {
  const [title, setTitle] = useState('')
  const [deadline, setDeadline] = useState(null)
  const [active, setActive] = useState(false)

  const handleInput = (val) => {
    setTitle(val)
  }

  const handleSelect = val => {
    setDeadline(val)
  }

  const handleSubmit = () => {
    if (title.trim().length > 0) {
      const deadlineTs = deadline ? dayjs(deadline).valueOf() : null
      const id = (new Date()).valueOf()

      request.post('', {
        title,
        completed: false,
        deadline: deadlineTs,
        completedAt: null
      }).then(() => {
        Toast.success({
          content: '创建成功',
          showClose: false
        })
        reset()
        PubSub.publish('refresh.todo.list')
      }).catch(() => {
        Toast.error({
          content: '创建失败，请重试',
          showClose: false
        })
      })
    } else {
      Toast.warning({
        content: '请输入任务内容',
        showClose: false
      })
    }
  }

  const reset = () => {
    setTitle('')
    setActive(false)
    setDeadline(null)
  }

  const handleCancel = () => {
    reset()
  }

  return (
    <Card>
      {!active && (
        <div className="add-init" onClick={() => setActive(true)}>
          <IconPlus /> <p style={{marginLeft: 6}}>添加任务</p>
        </div>
      )}

      {active && (
        <div>
          <Input
            value={title}
            onChange={handleInput}
            size="large"
            placeholder={'输入内容, 回车即可添加任务'}
            onEnterPress={handleSubmit}
          ></Input>
          <div className='opts'>
            <div className='time'>
              <DatePicker value={deadline} onChange={handleSelect} type="dateTime" insetInput placeholder={'选择任务截止时间'} />
            </div>
            <div className="btns">
              <Button
                type="tertiary"
                onClick={handleCancel}
                style={{ marginRight: 8 }}
              >
                取消
              </Button>
              <Button
                type="secondary"
                theme="solid"
                disabled={!title || title.trim().length === 0}
                onClick={handleSubmit}
              >
                创建
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}

export default CreateTodo
