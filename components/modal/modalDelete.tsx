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
  userId: number
}

export function ModalDelete({ isOpen, onClose, userId }: ModalDelProps) {
  const dispatch = useDispatch()
  const list = useAppSelector((state) => state.list.users)

  const deleteUser = () => {
    if (list) {
      const newList = list.slice(0, userId)
      dispatch(setList(newList))
      onClose()
    }
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
              {' ' + list[userId].name}
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
