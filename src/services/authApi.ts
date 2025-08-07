import { BaseApi } from './baseApi';
import { API_CONFIG } from '../config/env';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface AuthResponse {
  status: string;
  message: string;
  data: {
    item: {
      token: string;
      user: {
        _id: string;
        username: string;
        email: string;
        role: string;
        createdAt: string;
        updatedAt: string;
      };
    };
  };
}

export interface LogoutResponse {
  status: string;
  message: string;
  data: {
    items: any[];
  };
}

export class AuthApi extends BaseApi {
  constructor() {
    super(API_CONFIG.FULL_BASE_URL);
  }

  /**
   * Đăng nhập người dùng
   */
  async login(credentials: LoginRequest): Promise<AuthResponse['data']> {
    try {
      return await this.post<AuthResponse['data']>('/login', credentials);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Đăng nhập thất bại');
    }
  }

  /**
   * Đăng ký người dùng mới
   */
  async signup(userData: SignupRequest): Promise<AuthResponse['data']> {
    try {
      return await this.post<AuthResponse['data']>('/signup', userData);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Đăng ký thất bại');
    }
  }

  /**
   * Đăng xuất người dùng
   */
  async logout(): Promise<LogoutResponse['data']> {
    try {
      return await this.get<LogoutResponse['data']>('/logout');
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Đăng xuất thất bại');
    }
  }

  /**
   * Làm mới token
   */
  async refreshToken(): Promise<AuthResponse['data']> {
    try {
      return await this.post<AuthResponse['data']>('/refresh-token');
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Làm mới token thất bại',
      );
    }
  }

  /**
   * Quên mật khẩu
   */
  async forgotPassword(email: string): Promise<any> {
    try {
      return await this.post('/forgot-password', { email });
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Gửi email khôi phục thất bại',
      );
    }
  }

  /**
   * Đặt lại mật khẩu
   */
  async resetPassword(
    token: string,
    password: string,
    passwordConfirm: string,
  ): Promise<any> {
    try {
      return await this.post('/reset-password', {
        token,
        password,
        passwordConfirm,
      });
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Đặt lại mật khẩu thất bại',
      );
    }
  }
}

const authApi = new AuthApi();
export default authApi;
