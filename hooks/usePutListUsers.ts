import axios from 'axios'
import { useAppSelector } from '../redux/hooks/useAppSelector'

export async function putListUsers() {
  try {
    const list = useAppSelector((state) => state.list.users)

    await axios.put(
      'https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/1',
      list
    )
  } catch (error) {
    console.error(error)
  }
}
