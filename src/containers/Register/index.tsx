import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Card, Divider, Checkbox } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  MailOutlined,
  PhoneOutlined,
  GoogleOutlined,
  FacebookOutlined,
} from '@ant-design/icons';
import { GraduationCap } from 'lucide-react';
import { notifications } from '../../utils/notifications';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      // First validate with AI
      console.log(values);
      // Proceed with registration
      // await dispatch(registerUser(values));

      notifications.register.success();
      navigate('/login');
    } catch (error: any) {
      notifications.register.error();
      console.error('Registration error:', error);
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
            Tạo tài khoản mới
          </p>
        </div>

        {/* Register Form */}
        <Card className="shadow-xl border-0">
          <Form
            name="register"
            onFinish={onFinish}
            layout="vertical"
            size="large"
            form={form}
          >
            <Form.Item
              name="fullName"
              label="Họ và tên"
              rules={[
                { required: true, message: 'Vui lòng nhập họ và tên!' },
                { min: 2, message: 'Họ và tên phải có ít nhất 2 ký tự!' },
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-slate-400" />}
                placeholder="Nhập họ và tên đầy đủ"
                className="h-12"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Vui lòng nhập email!' },
                { type: 'email', message: 'Email không hợp lệ!' },
              ]}
            >
              <Input
                prefix={<MailOutlined className="text-slate-400" />}
                placeholder="Nhập email của bạn"
                className="h-12"
              />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[
                { required: true, message: 'Vui lòng nhập số điện thoại!' },
                {
                  pattern: /^[0-9]{10,11}$/,
                  message: 'Số điện thoại không hợp lệ!',
                },
              ]}
            >
              <Input
                prefix={<PhoneOutlined className="text-slate-400" />}
                placeholder="Nhập số điện thoại"
                className="h-12"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[
                { required: true, message: 'Vui lòng nhập mật khẩu!' },
                { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự!' },
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                  message: 'Mật khẩu phải có chữ hoa, chữ thường và số!',
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-slate-400" />}
                placeholder="Tạo mật khẩu mạnh"
                className="h-12"
                iconRender={visible =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Xác nhận mật khẩu"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('Mật khẩu xác nhận không khớp!'),
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-slate-400" />}
                placeholder="Nhập lại mật khẩu"
                className="h-12"
                iconRender={visible =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error('Vui lòng đồng ý với điều khoản!'),
                        ),
                },
              ]}
            >
              <Checkbox className="text-sm text-slate-600 dark:text-slate-400">
                Tôi đồng ý với{' '}
                <Link
                  to="/terms"
                  className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Điều khoản sử dụng
                </Link>{' '}
                và{' '}
                <Link
                  to="/privacy"
                  className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Chính sách bảo mật
                </Link>
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 border-0"
              >
                Đăng ký
              </Button>
            </Form.Item>
          </Form>

          <Divider className="text-slate-400">hoặc</Divider>

          {/* Social Register */}
          <div className="space-y-3">
            <Button
              icon={<GoogleOutlined />}
              className="w-full h-12 border-slate-300 text-slate-700 hover:border-slate-400"
            >
              Đăng ký với Google
            </Button>
            <Button
              icon={<FacebookOutlined />}
              className="w-full h-12 border-slate-300 text-slate-700 hover:border-slate-400"
            >
              Đăng ký với Facebook
            </Button>
          </div>

          {/* Login Link */}
          <div className="text-center mt-6">
            <span className="text-slate-600 dark:text-slate-400">
              Đã có tài khoản?{' '}
            </span>
            <Link
              to="/login"
              className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium"
            >
              Đăng nhập ngay
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;
