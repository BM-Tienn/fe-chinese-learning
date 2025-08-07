import axios, {
  AxiosResponse,
  AxiosError,
  AxiosInstance,
  AxiosPromise,
  InternalAxiosRequestConfig,
} from 'axios';
import Qs from 'qs';
import { TYPE_COOKIE } from './constants';
import { getCookie } from './cookies';
import { API_CONFIG } from '../config/env';

const onSuccessInterceptorRequest = async (
  config: InternalAxiosRequestConfig,
) => {
  // Chỉ kiểm tra token từ cookie
  const token = getCookie(TYPE_COOKIE.TOKEN);

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  config.paramsSerializer = (params: any) =>
    Qs.stringify(params, {
      arrayFormat: 'brackets',
    });
  return config;
};

const onErrorInterceptorRequest = (error: AxiosError) => Promise.reject(error);

const onErrorInterceptorResponse = (error: AxiosError) => {
  if (error.response && error.response.status) {
    if (error.response.status === 401) {
      // Handle unauthorized - redirect to login
      window.location.href = '/login';
    } else {
      // Handle other errors
      console.error('API Error:', error.response.data);
    }
  }
  return Promise.reject(error);
};

const onSuccessInterceptorResponse = (response: AxiosResponse) => {
  return response;
};

axios.defaults.headers.post['Accept'] = 'application/json';

const apiConfig = API_CONFIG;

const _axios: AxiosInstance = axios.create({
  baseURL: apiConfig.FULL_BASE_URL,
  timeout: apiConfig.TIMEOUT,
});

// Request interceptor
_axios.interceptors.request.use(
  onSuccessInterceptorRequest,
  onErrorInterceptorRequest,
);

// Response interceptor
_axios.interceptors.response.use(
  onSuccessInterceptorResponse,
  onErrorInterceptorResponse,
);

class AxiosXHRConstructor {
  axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  public $get(url: string, params?: any, config?: any): AxiosPromise {
    return this.axiosInstance.get(url, { params, ...config });
  }

  public $post(url: string, data?: any, config?: any): AxiosPromise {
    return this.axiosInstance.post(url, data, config);
  }

  public $put(url: string, data?: any, config?: any): AxiosPromise {
    return this.axiosInstance.put(url, data, config);
  }

  public $patch(url: string, data?: any, config?: any): AxiosPromise {
    return this.axiosInstance.patch(url, data, config);
  }

  public $delete(url: string, data?: any): AxiosPromise {
    return this.axiosInstance.delete(url, { data });
  }
}

export const axiosInstance = new AxiosXHRConstructor(_axios);
export default _axios;
