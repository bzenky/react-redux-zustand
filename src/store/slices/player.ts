import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    course: {
      modules: [
        {
          id: '1',
          title: 'Começando a aprender',
          lessons: [
            { id: 'VeL1LuVhrkU', title: 'Colocando background com pseudo-elemento (::before)', duration: '06:54' },
            { id: 'jnx2CFb1Ui4', title: 'Colocando overlay utilizando ::before e Shorthand para Top/Bottom/Left/Right (inset)', duration: '04:26' },
            { id: 'cPBK6j_eTgA', title: 'Utilizando Visão de Tarefas (workspaces/desktops) no Windows 10', duration: '04:45' },
            { id: 'ohUt3Z9LIeU', title: 'Texto com Background (gradiente, imagem, gif)', duration: '06:33' },
            { id: 'dNQDxJR80Zk', title: 'Utilizando Alpha no RGB/HSL', duration: '02:57' },
          ],
        },
        {
          id: '2',
          title: 'Últimos lançamentos',
          lessons: [
            { id: 'syoyb3SVTII', title: 'Nova Feature/Funcionalidade do Github -Command Palette', duration: '04:27' },
            { id: 'YoY290mpxeo', title: 'Centralizando elemento absoluto com Calc e Translate', duration: '07:25' },
            { id: 'f2kbQKau-Bw', title: 'Github Student Developer Pack - Benefícios para estudantes!', duration: '04:32' },
            { id: 'FFF09X6rKRw', title: 'Linkedin Premium - Benefício para estudantes!', duration: '00:36' },
          ],
        },
      ],
    },
    currentLessonIndex: 0,
    currentModuleIndex: 0,
  },
  reducers: {
    play: (state, action) => {
      state.currentLessonIndex = action.payload.currentLessonIndex
      state.currentModuleIndex = action.payload.currentModuleIndex
    }
  }
})

export const player = playerSlice.reducer

export const { play } = playerSlice.actions