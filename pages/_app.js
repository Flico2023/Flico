import Layout from '@/components/UI/layout/Layout'
import ProductsContextProvider from '@/context/ProductsFilterProvider'
import UserContextProvider from '@/context/UserContext'
import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'


// Yeni bir QueryClient örneği oluşturun
const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  return (
    <ProductsContextProvider>
      <UserContextProvider>
      {/* QueryClientProvider'ı kullanarak React Query'yi entegre edin */}
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Toaster position="top-center" />
          <Component {...pageProps} />
        </Layout>
        {/* ReactQueryDevtools ile geliştirme araçlarını entegre edin */}
      </QueryClientProvider>
      </UserContextProvider>
    </ProductsContextProvider>
  )
}
