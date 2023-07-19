import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { useAppSelector } from ".."
import { api } from "../../lib/axios"

interface PlayPayloadProps {
  currentLessonIndex: number
  currentModuleIndex: number
}

interface Course {
  id: number
  modules: Array<{
    id: number
    title: string
    lessons: Array<{
      id: string
      title: string
      duration: string
    }>
  }>
}

export interface PlayerState {
  course: Course | null
  currentModuleIndex: number
  currentLessonIndex: number
  isLoading: boolean
}

const initialState: PlayerState = {
  course: null,
  currentLessonIndex: 0,
  currentModuleIndex: 0,
  isLoading: true
}

export const fetchCourse = createAsyncThunk('player/load', async () => {
  const response = await api.get('/courses/1')
    .then(response => response.data)

  return response
})

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    play: (state, action: PayloadAction<PlayPayloadProps>) => {
      state.currentLessonIndex = action.payload.currentLessonIndex
      state.currentModuleIndex = action.payload.currentModuleIndex
    },
    next: (state) => {
      const nextLessonIndex = state.currentLessonIndex + 1
      const nextLesson = state.course?.modules[state.currentModuleIndex].lessons[nextLessonIndex]

      if (nextLesson) {
        state.currentLessonIndex = nextLessonIndex
      } else {
        const nextModuleIndex = state.currentModuleIndex + 1
        const nextModule = state.course?.modules[nextModuleIndex]

        if (nextModule) {
          state.currentModuleIndex = nextModuleIndex
          state.currentLessonIndex = 0
        }
      }
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchCourse.pending, (state) => {
      state.isLoading = true
    })

    builder.addCase(fetchCourse.fulfilled, (state, action) => {
      state.course = action.payload
      state.isLoading = false
    })
  }
})

export const player = playerSlice.reducer

export const { play, next } = playerSlice.actions

export const useCurrentLesson = () => {
  return useAppSelector(state => {
    const { currentModuleIndex, currentLessonIndex } = state.player

    const currentLesson = state.player.course?.modules[currentModuleIndex].lessons[currentLessonIndex]
    const currentModule = state.player.course?.modules[currentModuleIndex]

    return { currentLesson, currentModule }
  })
}