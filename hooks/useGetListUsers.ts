import axios from 'axios'

import { useDispatch } from 'react-redux'
import { setList } from '../redux/reducers/listUserReducer'

export async function getListUsers() {
  try {
    const dispatch = useDispatch()

    const { data } = await axios.get(
      'https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data'
    )

    const listData = data.map((user: any, index: number) => ({
      id: index + 1,
      name: user?.name,
      username: user?.username,
      email: user?.email,
      city: user?.address?.city
    }))

    dispatch(setList(listData))
  } catch (error) {
    console.error(error)
  }
}
