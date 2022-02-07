import {
  Text,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../redux/hooks/useAppSelector'
import { setList } from '../../redux/reducers/listUserReducer'

type ModalDelProps = {
  isOpen: boolean
  onClose: () => void
  userId: string
  index: number
}

export function ModalDelete({ isOpen, onClose, userId, index }: ModalDelProps) {
  const dispatch = useDispatch()
  const list = useAppSelector((state) => state.list.users)

  const deleteUser = () => {
    const sliceList = list.filter((item) => item.id != userId)

    const newList = sliceList.map((item, index) => ({
      id: (index + 1).toString(),
      name: item.name,
      username: item.username,
      email: item.email,
      city: item.city
    }))

    dispatch(setList(newList))
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg">Delete</Heading>
        </ModalHeader>
        <ModalBody>
          <Text>
            You will delete the user
            <Text as="span" fontWeight="bold">
              {' ' + list[index].name}
            </Text>
            .
          </Text>
          <Text>Want to continue deleting?</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="gray" w="100px" onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="red" w="150px" ml="1rem" onClick={deleteUser}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
