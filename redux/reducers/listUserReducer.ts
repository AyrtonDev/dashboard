import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'listUsers',
  initialState: {
    users: [
      {
        id: '',
        name: '',
        username: '',
        email: '',
        city: ''
      }
    ]
  },
  reducers: {
    setList: (state, action) => {
      state.users = action.payload
    }
  }
})

export const { setList } = slice.actions
export default slice.reducer
