import { Flex, Button, useBoolean } from '@chakra-ui/react'
import { Item } from 'framer-motion/types/components/Reorder/Item'
import { useRouter } from 'next/router'
import { tableBodyProps } from '../../types/user'
import { ModalDelete } from '../modal/modalDelete'

export function TableBody({ user, index }: tableBodyProps) {
  const route = useRouter()
  const [openModalDelete, setModalDelete] = useBoolean()

  return (
    <Flex
      w="full"
      py="2rem"
      mt="-2px"
      border="2px solid"
      borderColor="gray.300"
    >
      {user && (
        <>
          <Flex flex="1" justify="center" align="center">
            {user.id}
          </Flex>
          <Flex flex="3" justify="center" align="center">
            {user.name}
          </Flex>
          <Flex flex="2" justify="center" align="center">
            {user.username}
          </Flex>
          <Flex flex="3" justify="center" align="center">
            {user.email}
          </Flex>
          <Flex flex="2" justify="center" align="center">
            {user.city}
          </Flex>
          <Flex flex="2" justify="center" align="center">
            <Button
              colorScheme="orange"
              w="80%"
              onClick={() =>
                route.push({
                  pathname: '/user/edit',
                  query: {
                    userId: index + 1
                  }
                })
              }
            >
              edit
            </Button>
          </Flex>
          <Flex flex="2" justify="center" align="center">
            <Button colorScheme="red" w="80%" onClick={setModalDelete.on}>
              delete
            </Button>
          </Flex>
        </>
      )}

      <ModalDelete
        isOpen={openModalDelete}
        onClose={setModalDelete.off}
        userId={user.id}
        index={index}
      />
    </Flex>
  )
}
