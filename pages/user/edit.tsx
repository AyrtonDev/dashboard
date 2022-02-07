import {
  Button,
  Flex,
  FormLabel,
  Heading,
  Input,
  useToast
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Main } from '../../Layout/Main'
import { useAppSelector } from '../../redux/hooks/useAppSelector'
import { setList } from '../../redux/reducers/listUserReducer'
import { userProps } from '../../types/user'

export default function editUser() {
  const dispatch = useDispatch()
  const toast = useToast()
  const route = useRouter()
  const [user, setUser] = useState<userProps | null>(null)
  const list = useAppSelector((state) => state.list.users)
  const { userId } = route.query
  const index = typeof userId === 'string' && parseInt(userId) - 1

  useEffect(() => {
    typeof index === 'number' && setUser(list[index])
  }, [list])

  const handleDataInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (user) {
      const { name, value } = e.target
      setUser({ ...user, [name]: value })
    }
  }

  const submitForm = async () => {
    if (user) {
      if (user.name.length === 0) {
        toast({
          title: "The 'name' field cannot be empty",
          status: 'info',
          position: 'bottom',
          duration: 5000,
          isClosable: true
        })
      } else if (user.email.length === 0) {
        toast({
          title: "The 'email' field cannot be empty",
          status: 'info',
          position: 'bottom',
          duration: 5000,
          isClosable: true
        })
      } else {
        let newlist = list
        if (typeof index === 'number') {
          newlist[index] = user
          dispatch(setList([...newlist]))
          route.push('/dash')
        }
      }
    } else {
      toast({
        title: 'Error loading data, please try later!',
        status: 'error',
        position: 'bottom',
        duration: 5000,
        isClosable: true
      })
    }
  }

  const cancelEdit = () => {
    setUser(null)
    route.push('/dash')
  }

  return (
    <Main align="center">
      <Flex w="full" justify="start" mt="2rem" mb="4rem">
        <Heading>Dashboard</Heading>
      </Flex>
      <Flex w="50%">
        <Flex
          as="form"
          direction="column"
          w="full"
          border="2px solid"
          borderColor="gray.300"
          px="3rem"
        >
          {user && (
            <>
              {' '}
              <Flex mt="2rem" mb="1rem" align="center">
                <FormLabel fontSize="1.3rem" w="30%" htmlFor="name">
                  Name
                </FormLabel>{' '}
                <Input
                  type="text"
                  id="name"
                  name="name"
                  w="70%"
                  value={user.name}
                  onChange={handleDataInput}
                />
              </Flex>
              <Flex my="1rem" align="center">
                <FormLabel fontSize="1.3rem" w="30%" htmlFor="username">
                  Username
                </FormLabel>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  w="70%"
                  value={user.username}
                  onChange={handleDataInput}
                />
              </Flex>
              <Flex my="1rem" align="center">
                <FormLabel fontSize="1.3rem" w="30%" htmlFor="email">
                  Email
                </FormLabel>
                <Input
                  type="text"
                  id="email"
                  name="email"
                  w="70%"
                  value={user.email}
                  onChange={handleDataInput}
                />
              </Flex>
              <Flex mt="1rem" mb="2rem" align="center">
                <FormLabel fontSize="1.3rem" w="30%" htmlFor="city">
                  City
                </FormLabel>
                <Input
                  type="text"
                  id="city"
                  name="city"
                  w="70%"
                  value={user.city}
                  onChange={handleDataInput}
                />
              </Flex>
              <Flex mb="2rem" alignSelf="end">
                <Button colorScheme="red" w="100px" onClick={cancelEdit}>
                  Cancel
                </Button>
                <Button
                  colorScheme="green"
                  w="100px"
                  ml="1rem"
                  onClick={submitForm}
                >
                  Submit
                </Button>
              </Flex>{' '}
            </>
          )}
        </Flex>
      </Flex>
    </Main>
  )
}
