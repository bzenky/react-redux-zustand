import { FormEvent, useState } from "react"
import { useDispatch } from "react-redux"
import { addTodo } from "../store"

export function AddTodo() {
  const [newTodo, setNewTodo] = useState('')
  const dispatch = useDispatch()

  function handleNewTodo(event: FormEvent) {
    event.preventDefault()

    dispatch(addTodo({
      newTodo
    }))

    setNewTodo('')
  }

  return (
    <form onSubmit={handleNewTodo}>
      <input
        type="text"
        placeholder="Add new todo"
        onChange={event => setNewTodo(event.target.value)}
        value={newTodo}
      />

      <button>Adicionar</button>
    </form>
  )
}