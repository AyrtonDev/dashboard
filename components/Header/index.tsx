import {
  Flex,
  Heading,
  Button,
  useColorMode,
  Switch,
  Text
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { destroyCookie, parseCookies } from 'nookies'
import { useEffect, useState } from 'react'

export function Header() {
  const cookie = parseCookies()
  const route = useRouter()
  const { toggleColorMode, setColorMode, colorMode } = useColorMode()
  const [title, setTitle] = useState('')
  const theme = cookie['THEME']

  const logOut = () => {
    destroyCookie(undefined, 'STATUS')
    route.reload()
  }

  useEffect(() => {
    if (theme && colorMode) {
      setColorMode(theme)
    }
  }, [])

  useEffect(() => {
    if (route.pathname === '/dash') {
      setTitle('DashBoard')
    } else if (route.pathname === '/user/edit') {
      setTitle('Edit user')
    } else {
      setTitle('New user')
    }
  }, [route.pathname])

  return (
    <Flex
      w="full"
      h="20vh"
      justify="center"
      align="center"
      borderBottom="2px solid"
      borderColor="gray.300"
    >
      <Flex maxW="1300px" w="full" justify="space-between">
        <Heading>{title}</Heading>
        <Flex w="25%" justify="space-between" align="center" h="full">
          <Flex w="50%" justify="space-between">
            <Text>Light</Text>
            <Switch size="lg" onChange={toggleColorMode} />
            <Text>Dark</Text>
          </Flex>
          <Button colorScheme="red" w="100px" onClick={logOut}>
            Log out
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
