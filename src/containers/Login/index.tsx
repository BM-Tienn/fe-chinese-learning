import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Card, Divider } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  GoogleOutlined,
  FacebookOutlined,
} from '@ant-design/icons';
import { GraduationCap } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { notifications } from '../../utils/notifications';

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Sử dụng AuthContext để đăng nhập
      await login(values.email, values.password);

      // Hiển thị thông báo thành công
      notifications.login.success();

      // Chuyển hướng đến dashboard
      navigate('/dashboard');
    } catch (error: any) {
      // Hiển thị thông báo lỗi
      notifications.login.error();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-cyan-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Hán Ngữ Thông
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Đăng nhập để tiếp tục học tập
          </p>
        </div>

        {/* Login Form */}
        <Card className="shadow-xl border-0">
          <Form name="login" onFinish={onFinish} layout="vertical" size="large">
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Vui lòng nhập email!' },
                { type: 'email', message: 'Email không hợp lệ!' },
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-slate-400" />}
                placeholder="Nhập email của bạn"
                className="h-12"
                autoComplete="username"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[
                { required: true, message: 'Vui lòng nhập mật khẩu!' },
                { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-slate-400" />}
                placeholder="Nhập mật khẩu"
                className="h-12"
                autoComplete="current-password"
                iconRender={visible =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item>
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">
                    Ghi nhớ đăng nhập
                  </span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Quên mật khẩu?
                </Link>
              </div>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 border-0"
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>

          <Divider className="text-slate-400">hoặc</Divider>

          {/* Social Login */}
          <div className="space-y-3">
            <Button
              icon={<GoogleOutlined />}
              className="w-full h-12 border-slate-300 text-slate-700 hover:border-slate-400"
            >
              Đăng nhập với Google
            </Button>
            <Button
              icon={<FacebookOutlined />}
              className="w-full h-12 border-slate-300 text-slate-700 hover:border-slate-400"
            >
              Đăng nhập với Facebook
            </Button>
          </div>

          {/* Register Link */}
          <div className="text-center mt-6">
            <span className="text-slate-600 dark:text-slate-400">
              Chưa có tài khoản?{' '}
            </span>
            <Link
              to="/register"
              className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium"
            >
              Đăng ký ngay
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
