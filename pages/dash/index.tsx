import { Main } from '../../Layout/Main'
import { Button, Flex, Heading, Spinner } from '@chakra-ui/react'
import { useAppSelector } from '../../redux/hooks/useAppSelector'
import { TableBody, TableHeader } from '../../components/Table'
import { useRouter } from 'next/router'
import { destroyCookie } from 'nookies'

export default function Dash() {
  const route = useRouter()
  const list = useAppSelector((state) => state.list.users)

  const logOut = () => {
    destroyCookie(undefined, 'STATUS')
    localStorage.clear()
    route.reload()
  }

  return (
    <Main>
      <Flex w="full" justify="space-between" mt="2rem" mb="4rem">
        <Heading>Dashboard</Heading>
        <Button colorScheme="red" w="100px" onClick={logOut}>
          Log out
        </Button>
      </Flex>
      <Flex
        w="full"
        direction="column"
        border="2px solid"
        borderColor="gray.300"
        borderRadius="5px"
        mb="1rem"
        p="1rem"
      >
        <Flex justify="space-between" mt="1rem" align="center">
          <Heading size="lg" onClick={() => console.log(list)}>
            User list
          </Heading>{' '}
          <Button
            colorScheme="blue"
            w="200px"
            onClick={() => route.push('/user/new')}
          >
            Add new
          </Button>
        </Flex>
        <TableHeader />

        {list ? (
          list.map((item: any, index: number) => (
            <TableBody user={item} index={index} />
          ))
        ) : (
          <Flex
            w="full"
            py="2rem"
            mt="-2px"
            h="30vh"
            border="2px solid"
            borderColor="gray.300"
            justify="center"
            align="center"
          >
            <Spinner colorScheme="blue" size="lg" />
          </Flex>
        )}
      </Flex>
    </Main>
  )
}
