import { useAppSelector } from "../store"

export function TodoList() {
  const store = useAppSelector(store => store.todo)

  return (
    <ul>
      {store.map(todo => {
        return (
          <li key={todo}>
            {todo}
          </li>
        )
      })}
    </ul>
  )
}