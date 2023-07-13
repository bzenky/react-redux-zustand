import { useSelector } from "react-redux"

export function TodoList() {
  const store = useSelector(store => store.todo)

  console.log({ store })

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