import React, { useEffect } from 'react'
import PubSub from 'pubsub-js'
import TodoList from '../../components/TodoList'

function Done() {
  useEffect(() => {
    return () => {
      PubSub.unsubscribe('refresh.todo.list')
    }
  }, [])

  return (
    <TodoList type={'done'}></TodoList>
  );
}

export default Done;
