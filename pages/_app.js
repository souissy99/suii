import '../styles/globals.css'
import { MainProvider } from "../contexts/Main";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import '../styles/globals.css'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return (
    <MainProvider>
      <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
      </QueryClientProvider>
    </MainProvider>

  )
}

export default MyApp
