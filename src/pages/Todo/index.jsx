import React, { useEffect } from 'react'
import PubSub from 'pubsub-js'
import CreateTodo from '../../components/CreateTodo'
import TodoList from '../../components/TodoList'

function Todo() {
  useEffect(() => {
    return () => {
      PubSub.unsubscribe('refresh.todo.list')
    }
  }, [])

  return (
    <>
      <CreateTodo></CreateTodo>
      <TodoList type={'todo'}></TodoList>
    </>
  )
}

export default Todo
