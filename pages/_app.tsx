import '../styles/globals.less';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import axios from 'axios';
import { BASE_URL } from '../config/axios.config';
import { API_URL } from '../config';
import { getAuthToken } from '../services/auth/auth.service';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

axios.defaults.baseURL = API_URL;

axios.interceptors.request.use((config) => {
  const jwtToken = getAuthToken();
  if (jwtToken !== null) {
    config.headers["Authorization"] = `Bearer ${jwtToken}`;
  }
  return config;
});


function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
