import { Flex, FlexProps } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { getListUsers } from '../hooks/useGetListUsers'
import { useAppSelector } from '../redux/hooks/useAppSelector'
import React from 'react'
import { parseCookies } from 'nookies'

export function Main({ children, ...rest }: FlexProps) {
  const cookie = parseCookies()
  const route = useRouter()
  const statusLog = cookie['STATUS']
  const list = useAppSelector((state) => state.list.users)

  if (statusLog === 'logged') {
    getListUsers()
  }

  useEffect(() => {
    !statusLog && route.push('/')
  }, [list])

  return (
    <Flex as="main" w="full" h="100vh" justify="center">
      <Flex maxW="1300px" w="full" h="full" direction="column" {...rest}>
        {statusLog ? children : route.pathname === '/' && children}
      </Flex>
    </Flex>
  )
}
