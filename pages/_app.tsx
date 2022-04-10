import '../styles/globals.less';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import axios from 'axios';
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

axios.interceptors.response.use((response) => {
  return response;
}, function (error) {
  if(error.response.status && error.response.status === 401){
    window.location.replace('/login')
  }
  return Promise.reject(error);
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
