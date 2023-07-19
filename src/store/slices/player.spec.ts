import { describe, expect, it } from 'vitest'
import { player as reducer, play, next, PlayerState } from './player'

const exampleState: PlayerState = {
  course: {
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
  },
  currentLessonIndex: 0,
  currentModuleIndex: 0,
  isLoading: false,
}

describe('player slice', () => {
  it('should be able to play', () => {
    const state = reducer(exampleState, play({
      currentLessonIndex: 1,
      currentModuleIndex: 2
    }))

    expect(state.currentLessonIndex).toEqual(1)
    expect(state.currentModuleIndex).toEqual(2)
  })

  it('should be able to play next video automatically', () => {
    const state = reducer(exampleState, next())

    expect(state.currentLessonIndex).toEqual(1)
    expect(state.currentModuleIndex).toEqual(0)
  })

  it('should be able to jump to next module automatically', () => {
    const state = reducer({
      ...exampleState,
      currentLessonIndex: 1,
    }, next())

    expect(state.currentLessonIndex).toEqual(0)
    expect(state.currentModuleIndex).toEqual(1)
  })

  it('should not update the current module and lesson index if there is no next lesson available', () => {
    const state = reducer({
      ...exampleState,
      currentLessonIndex: 1,
      currentModuleIndex: 1
    }, next())

    expect(state.currentLessonIndex).toEqual(1)
    expect(state.currentModuleIndex).toEqual(1)
  })
})