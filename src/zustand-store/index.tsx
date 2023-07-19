import { create } from "zustand"
import { api } from "../lib/axios"

interface PlayProps {
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
  play: (indexData: PlayProps) => void
  next: () => void
  fetchCourse: () => Promise<void>
}

export const useStore = create<PlayerState>((set, get) => {
  return {
    course: null,
    currentModuleIndex: 0,
    currentLessonIndex: 0,
    isLoading: true,
    play: (indexData: PlayProps) => {
      set({
        currentLessonIndex: indexData.currentLessonIndex,
        currentModuleIndex: indexData.currentModuleIndex
      })
    },
    next: () => {
      const { currentLessonIndex, currentModuleIndex, course } = get()

      const nextLessonIndex = currentLessonIndex + 1
      const nextLesson = course?.modules[currentModuleIndex].lessons[nextLessonIndex]

      if (nextLesson) {
        set({ currentLessonIndex: nextLessonIndex })
      } else {
        const nextModuleIndex = currentModuleIndex + 1
        const nextModule = course?.modules[nextModuleIndex]

        if (nextModule) {
          set({
            currentModuleIndex: nextModuleIndex,
            currentLessonIndex: 0
          })
        }
      }
    },
    fetchCourse: async () => {
      set({ isLoading: true })

      const response = await api.get('/courses/1')
        .then(response => response.data)

      set({
        course: response,
        isLoading: false
      })
    }
  }
})

export const useCurrentLesson = () => {
  return useStore(state => {
    const { currentModuleIndex, currentLessonIndex } = state

    const currentLesson = state.course?.modules[currentModuleIndex].lessons[currentLessonIndex]
    const currentModule = state.course?.modules[currentModuleIndex]

    return { currentLesson, currentModule }
  })
}