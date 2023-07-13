import { FormEvent, useState } from "react"

export function AddTodo() {
  const [newTodo, setNewTodo] = useState('')

  function handleNewTodo(event: FormEvent) {
    event.preventDefault()

    console.log(newTodo)
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