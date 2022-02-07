import {
  Flex,
  FormLabel,
  Input,
  Button,
  useToast
} from '@chakra-ui/react'
import { ChangeEvent, useEffect, useState } from 'react'
import { Main } from '../../Layout/Main'
import { useRouter } from 'next/router'
import { userProps } from '../../types/user'
import { useAppSelector } from '../../redux/hooks/useAppSelector'
import { setList } from '../../redux/reducers/listUserReducer'
import { useDispatch } from 'react-redux'

const basic = {
  id: '',
  name: '',
  username: '',
  email: '',
  city: ''
}

export default function newUser() {
  const dispatch = useDispatch()
  const toast = useToast()
  const route = useRouter()
  const [newUser, setNewUser] = useState(basic)
  const [listUser, setListUser] = useState<userProps[] | null>(null)
  const list = useAppSelector((state) => state.list.users)

  useEffect(() => {
    setListUser([...list])
  }, [list])

  const handleDataInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewUser({ ...newUser, [name]: value })
  }

  const cancelEdit = () => {
    setNewUser(basic)
    route.push('/dash')
  }

  const submitForm = () => {
    if (list) {
      if (newUser.name.length === 0) {
        toast({
          title: "The 'name' field cannot be empty",
          status: 'info',
          position: 'bottom',
          duration: 5000,
          isClosable: true
        })
      } else if (newUser.email.length === 0) {
        toast({
          title: "The 'email' field cannot be empty",
          status: 'info',
          position: 'bottom',
          duration: 5000,
          isClosable: true
        })
      } else {
        listUser &&
          setListUser([
            ...listUser,
            { ...newUser, id: (listUser.length + 1).toString() }
          ])

        dispatch(setList([...list, { ...newUser, id: list.length + 1 }]))

        route.push('/dash')
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

  return (
    <Main align="center">
      <Flex w="50%" mt="1rem">
        <Flex
          as="form"
          direction="column"
          w="full"
          border="2px solid"
          borderColor="gray.300"
          px="3rem"
        >
          <Flex mt="2rem" mb="1rem" align="center">
            <FormLabel fontSize="1.3rem" w="30%" htmlFor="name">
              Name
            </FormLabel>{' '}
            <Input
              type="text"
              id="name"
              name="name"
              w="70%"
              isRequired
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
              isRequired
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
          </Flex>
        </Flex>
      </Flex>
    </Main>
  )
}
