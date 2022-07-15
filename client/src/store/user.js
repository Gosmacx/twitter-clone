import { createSlice } from '@reduxjs/toolkit'

export const user = createSlice({
  name: 'user',
  initialState: {
    name: null,
    username: null,
    token: null,
    photo: null,
    banner: null,
    id: null,
    description: '',
    followers: [],
    following: []
  },
  reducers: {
    login: (state, action) => {
      state.username = action.payload.username
      state.name = action.payload.name
      state.id = action.payload.id
      state.photo = action.payload.photo
      state.banner = action.payload.banner
      state.description = action.payload.description ?? ''
      state.following = action.payload.following
      state.followers = action.payload.followers
      state.token = {
        headers: {
          "Authorization": `${action.payload.token}`
       }
      }
      localStorage.setItem("token", action.payload.token)
    },
    updateUser: (state, action) => {
      state.photo = action.payload.photo ?? state.photo
      state.banner = action.payload.banner ?? state.banner
      state.name = action.payload.name ?? state.name
      state.description = action.payload.description ?? state.description
      state.followers = action.payload.followers ?? state.followers
      state.following = action.payload.following ?? state.following
    }
  }
})

export const { login, updateUser } = user.actions

export default user.reducer