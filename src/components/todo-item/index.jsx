import React from "react";
import Button from "../button";
import styles from './styles.module.scss'

const TodoItem = (props) => {
  const {
    isComplete,
    text,
    onClick,
    onDelete
  } = props

  const handleDelete = (e) => {
    e.stopPropagation()
    onDelete()
  }

  return (
    <div
      onClick={onClick}
      style={{
        textDecoration: isComplete ? 'line-through' : 'none',
        color: isComplete ? 'grey': 'none'
      }}
      className={styles['todo-list-item']}
    >
      <div>{text}</div>
      <Button onClick={handleDelete}>
        delete
      </Button>
    </div>
  )
}

export default TodoItem