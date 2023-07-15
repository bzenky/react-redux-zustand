import { configureStore, createSlice } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

const todoSlice = createSlice({
  name: 'todo',
  initialState: ['Fazer café', 'Beber café', 'Fazer + café'],

  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload.newTodo)
    }
  }
})

export const store = configureStore({
  reducer: {
    todo: todoSlice.reducer
  }
})

export const { addTodo } = todoSlice.actions

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector