import React, {useEffect, useState} from "react";
import Input from "./components/input";
import Button from "./components/button";
import TodoItem from "./components/todo-item";
import {useDispatch, useSelector} from "react-redux";
import {addTodo, deleteTodo, toggleTodo} from "./redux/todo/actions";
import {getTodos} from "./redux/todo/selectors";
import styles from './App.module.scss'


import {filterTodo} from "./redux/todo-filter/actions";
import {getActiveFilter} from "./redux/todo-filter/selectors";
import {TYPE_OF_FILTER} from "./redux/todo-filter/reducer";

const App = () => {
  const todos = useSelector(getTodos)
  const activeTodoFilter = useSelector(getActiveFilter)
  const [inputValue, setInputValue] = useState('')

  const dispatch = useDispatch()


  const handleInputChange = (value) => {
    setInputValue(value)
  }

  const handleClickAddButton = (e) => {
    e.preventDefault()
    const trimedValue = inputValue.trim()
    if (trimedValue !== '') {
      dispatch(addTodo(trimedValue))
      setInputValue('')
    }
  }

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id))
  }

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id))
  }

  const renderTodoItem = (todo, idx) => {
    return (
      <TodoItem
        key={todo.id}
        isComplete={todo.isComplete}
        text={todo.text}
        onClick={() => handleToggleTodo(todo.id)}
        onDelete={() => handleDeleteTodo(todo.id)}
      />
    )
  }

  const strategyToGetTodosByFilter = {
    [TYPE_OF_FILTER.SHOW_ALL]: todos,
    [TYPE_OF_FILTER.SHOW_ACTIVE]: todos.filter(todo => !todo.isComplete),
    [TYPE_OF_FILTER.SHOW_COMPLETED]: todos.filter(todo => todo.isComplete),
  }

  const filterTodos = (todos, filter) => {
    if (filter === TYPE_OF_FILTER.SHOW_ALL) {
      return todos
    }
    if (filter === TYPE_OF_FILTER.SHOW_ACTIVE) {
      return todos.filter(todo => !todo.isComplete)
    }
    if (filter === TYPE_OF_FILTER.SHOW_COMPLETED) {
      return todos.filter(todo => todo.isComplete)
    }
    return todos
  }

  // 1 вариант
  const filteredTodos = activeTodoFilter ? strategyToGetTodosByFilter[activeTodoFilter] : todos

  return (
    <div className={styles["back"]}>
      <div className={styles['container']}> 
      <div>
        <form className={styles["form"]}>
        <Input
          value={inputValue}
          onChange={handleInputChange}
        />
        <Button onClick={handleClickAddButton} type='submit'>
        ADD
        </Button>
        </form>
      </div>
      <div className={styles['todo-list']}>
        {filterTodos(todos, activeTodoFilter).map(renderTodoItem)}
      </div>
      <div className={styles['filter-buttons']}>
        <Button onClick={() => dispatch(filterTodo(TYPE_OF_FILTER.SHOW_ALL))}>
          show all
        </Button>
        <Button onClick={() => dispatch(filterTodo(TYPE_OF_FILTER.SHOW_ACTIVE))}>
          show active
        </Button>
        <Button onClick={() => dispatch(filterTodo(TYPE_OF_FILTER.SHOW_COMPLETED))}>
          show completed
        </Button>
      </div>
    </div>
    </div>
    
  );
}

export default App;
