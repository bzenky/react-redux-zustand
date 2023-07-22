import { describe, it, expect, beforeEach } from "vitest"
import { useStore as store } from '.'

const course = {
  id: 1,
  modules: [
    {
      id: 1,
      title: 'Começando a aprender',
      lessons: [
        { id: 'VeL1LuVhrkU', title: 'Colocando background com pseudo-elemento (::before)', duration: '06:54' },
        { id: 'jnx2CFb1Ui4', title: 'Colocando overlay utilizando ::before e Shorthand para Top/Bottom/Left/Right (inset)', duration: '04:26' }
      ],
    },
    {
      id: 2,
      title: 'Últimos lançamentos',
      lessons: [
        { id: 'syoyb3SVTII', title: 'Nova Feature/Funcionalidade do Github -Command Palette', duration: '04:27' },
        { id: 'YoY290mpxeo', title: 'Centralizando elemento absoluto com Calc e Translate', duration: '07:25' }
      ],
    },
  ],
}

const initialState = store.getState()

describe('zustand store', () => {
  beforeEach(() => {
    store.setState(initialState)
  })

  it('should be able to play', () => {
    const { play } = store.getState()

    play({
      currentLessonIndex: 1,
      currentModuleIndex: 2
    })

    const { currentLessonIndex, currentModuleIndex } = store.getState()

    expect(currentLessonIndex).toEqual(1)
    expect(currentModuleIndex).toEqual(2)
  })

  it('should be able to play next video automatically', () => {
    store.setState({ course })

    const { next } = store.getState()

    next()

    const { currentLessonIndex, currentModuleIndex } = store.getState()

    expect(currentLessonIndex).toEqual(1)
    expect(currentModuleIndex).toEqual(0)
  })

  it('should be able to jump to next module automatically', () => {
    store.setState({
      course,
      currentLessonIndex: 1
    })

    const { next } = store.getState()

    next()

    const { currentLessonIndex, currentModuleIndex } = store.getState()

    expect(currentLessonIndex).toEqual(0)
    expect(currentModuleIndex).toEqual(1)
  })

  it('should not update the current module and lesson index if there is no next lesson available', () => {
    store.setState({
      course,
      currentLessonIndex: 1,
      currentModuleIndex: 1
    })

    const { next } = store.getState()

    next()

    const { currentLessonIndex, currentModuleIndex } = store.getState()

    expect(currentLessonIndex).toEqual(1)
    expect(currentModuleIndex).toEqual(1)
  })
})