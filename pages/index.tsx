import { Main } from '../Layout/Main'
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  useToast
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { setEmail, setPassword } from '../redux/reducers/userReducer'
import { setCookie } from 'nookies'

import { ChangeEvent } from 'react'

import { useAppSelector } from '../redux/hooks/useAppSelector'
import { useRouter } from 'next/router'

export default function App() {
  const route = useRouter()
  const toast = useToast()
  const dispatch = useDispatch()
  const user = useAppSelector((state) => state.user)

  const handleDataInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'email') {
      dispatch(setEmail(e.target.value))
    } else if (e.target.name === 'password') {
      dispatch(setPassword(e.target.value))
    }
  }

  const logIn = () => {
    if (user.email.length === 0) {
      toast({
        title: "The 'email' field cannot be empty",
        status: 'info',
        position: 'bottom',
        duration: 5000,
        isClosable: true
      })
    } else if (user.password.length === 0) {
      toast({
        title: "The 'password' field cannot be empty",
        status: 'info',
        position: 'bottom',
        duration: 5000,
        isClosable: true
      })
    } else {
      setCookie(undefined, 'STATUS', 'logged', {
        maxAge: 60 * 60 * 1000,
        path: '/'
      })
      route.push('/dash')
    }
  }

  return (
    <Main>
      <Flex w="full" justify="center" my="6rem">
        <Heading>Login</Heading>
      </Flex>
      <Flex w="full" justify="center">
        <Flex borderRadius="5px" boxShadow="5px 5px 10px" p="2rem">
          <FormControl>
            <FormLabel htmlFor="email">E-mail</FormLabel>
            <Input
              type="email"
              id="email"
              name="email"
              mb="2rem"
              value={user.email}
              onChange={handleDataInput}
            />
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              type="password"
              id="password"
              name="password"
              mb="2rem"
              value={user.password}
              onChange={handleDataInput}
            />
            <Button colorScheme="teal" w="full" onClick={logIn}>
              Log in
            </Button>
          </FormControl>
        </Flex>
      </Flex>
    </Main>
  )
}
