import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import { Header } from '../components/Header'
import { useRouter } from 'next/router'
import { setCookie } from 'nookies'

function MyApp({ Component, pageProps }: AppProps) {
  const route = useRouter()
  setCookie(undefined, 'THEME', 'light')

  return (
    <ChakraProvider>
      <Provider store={store}>
        {route.pathname != '/' && <Header />}
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  )
}

export default MyApp
