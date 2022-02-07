import { Box, Flex, Icon } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useAppSelector } from '../../redux/hooks/useAppSelector'
import { useDispatch } from 'react-redux'
import { setList } from '../../redux/reducers/listUserReducer'
import { userProps } from '../../types/user'
import { useEffect, useState } from 'react'

export function TableHeader() {
  const dispatch = useDispatch()
  const list = useAppSelector((state) => state.list.users)
  const [order, setOrder] = useState(1)
  const [arraySort, setArraySort] = useState<userProps[] | null>(null)

  const sortListUser = () => {
    setOrder(-order)
    if (arraySort) {
      const newList = arraySort.sort((a, b) => {
        return a.username < b.username ? -order : order
      })

      dispatch(setList(newList))
    }
  }

  useEffect(() => {
    setArraySort([...list])
  }, [list])

  return (
    <Flex
      w="full"
      py="2rem"
      bgColor="gray.200"
      mt="2rem"
      border="2px solid"
      borderColor="gray.300"
      borderRadius="5px 5px 0 0 "
    >
      <Flex flex="1" justify="center" align="center">
        Id
      </Flex>
      <Flex flex="3" justify="center" align="center">
        Name
      </Flex>
      <Flex flex="2" justify="center" align="center">
        <Box onClick={sortListUser} cursor="pointer">
          Username
          <ChevronDownIcon ml="0.5rem" />
        </Box>
      </Flex>
      <Flex flex="3" justify="center" align="center">
        Email
      </Flex>
      <Flex flex="2" justify="center" align="center">
        City
      </Flex>
      <Flex flex="2" justify="center" align="center">
        Edit
      </Flex>
      <Flex flex="2" justify="center" align="center">
        Delete
      </Flex>
    </Flex>
  )
}
