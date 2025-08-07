import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, message, Tag } from 'antd';
import BaseAdminTable from '../components/BaseAdminTable';
import { usersApi } from '../../../services';
import type { ColumnsType } from 'antd/es/table';

const { Option } = Select;

interface User {
  _id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  active: boolean;
  learningProfile: {
    currentLevel: string;
    totalStudyTime: number;
    totalWordsLearned: number;
    totalLessonsCompleted: number;
    streak: number;
    bestStreak: number;
  };
  preferences: {
    theme: string;
    language: string;
    notifications: boolean;
    dailyGoal: number;
  };
  createdAt: string;
  updatedAt: string;
}

const UsersAdmin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await usersApi.getAllUsers();
      setUsers(response.users || []);
    } catch (error) {
      message.error('Không thể tải danh sách người dùng');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = () => {
    setEditingUser(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    form.setFieldsValue({
      username: user.username,
      email: user.email,
      role: user.role,
      active: user.active,
      currentLevel: user.learningProfile?.currentLevel,
      theme: user.preferences?.theme,
      language: user.preferences?.language,
      notifications: user.preferences?.notifications,
      dailyGoal: user.preferences?.dailyGoal,
    });
    setModalVisible(true);
  };

  const handleDelete = async (user: User) => {
    try {
      await usersApi.deleteUser(user._id);
      await fetchUsers();
      message.success('Xóa người dùng thành công');
    } catch (error) {
      message.error('Có lỗi xảy ra khi xóa người dùng');
    }
  };

  const handleView = (user: User) => {
    // Navigate to user detail page or show modal
    message.info(`Xem chi tiết người dùng: ${user.username}`);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();

      if (editingUser) {
        // Update user
        await usersApi.updateUser(editingUser._id, values);
        message.success('Cập nhật người dùng thành công');
      } else {
        // Create new user
        await usersApi.createUser(values);
        message.success('Tạo người dùng thành công');
      }

      setModalVisible(false);
      fetchUsers();
    } catch (error) {
      message.error('Có lỗi xảy ra');
    }
  };

  const columns: ColumnsType<User> = [
    {
      title: 'Tên người dùng',
      dataIndex: 'username',
      key: 'username',
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <Tag color={role === 'admin' ? 'red' : 'blue'}>
          {role === 'admin' ? 'Quản trị viên' : 'Người dùng'}
        </Tag>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'active',
      key: 'active',
      render: (active: boolean) => (
        <Tag color={active ? 'green' : 'red'}>
          {active ? 'Hoạt động' : 'Không hoạt động'}
        </Tag>
      ),
    },
    {
      title: 'Cấp độ hiện tại',
      dataIndex: ['learningProfile', 'currentLevel'],
      key: 'currentLevel',
      render: (level: string) => <Tag color="purple">{level}</Tag>,
    },
    {
      title: 'Thời gian học (phút)',
      dataIndex: ['learningProfile', 'totalStudyTime'],
      key: 'totalStudyTime',
      render: (time: number) => `${time || 0} phút`,
    },
    {
      title: 'Từ đã học',
      dataIndex: ['learningProfile', 'totalWordsLearned'],
      key: 'totalWordsLearned',
      render: (words: number) => `${words || 0} từ`,
    },
    {
      title: 'Bài học hoàn thành',
      dataIndex: ['learningProfile', 'totalLessonsCompleted'],
      key: 'totalLessonsCompleted',
      render: (lessons: number) => `${lessons || 0} bài`,
    },
    {
      title: 'Chuỗi học tập',
      dataIndex: ['learningProfile', 'streak'],
      key: 'streak',
      render: (streak: number) => `${streak || 0} ngày`,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
    },
  ];

  const filters = [
    {
      key: 'role',
      label: 'Vai trò',
      options: [
        { label: 'Người dùng', value: 'user' },
        { label: 'Quản trị viên', value: 'admin' },
      ],
    },
    {
      key: 'active',
      label: 'Trạng thái',
      options: [
        { label: 'Hoạt động', value: 'true' },
        { label: 'Không hoạt động', value: 'false' },
      ],
    },
    {
      key: 'learningProfile.currentLevel',
      label: 'Cấp độ',
      options: [
        { label: 'HSK1', value: 'HSK1' },
        { label: 'HSK2', value: 'HSK2' },
        { label: 'HSK3', value: 'HSK3' },
        { label: 'HSK4', value: 'HSK4' },
        { label: 'HSK5', value: 'HSK5' },
        { label: 'HSK6', value: 'HSK6' },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      <BaseAdminTable
        title="Quản lý người dùng"
        data={users}
        loading={loading}
        columns={columns}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onRefresh={fetchUsers}
        searchPlaceholder="Tìm kiếm theo tên, email..."
        filters={filters}
      />

      {/* Create/Edit Modal */}
      <Modal
        title={editingUser ? 'Chỉnh sửa người dùng' : 'Tạo người dùng mới'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        width={600}
        okText={editingUser ? 'Cập nhật' : 'Tạo'}
        cancelText="Hủy"
        className="dark:bg-slate-800"
        styles={{
          content: {
            backgroundColor: 'var(--ant-color-bg-container)',
          },
          header: {
            backgroundColor: 'var(--ant-color-bg-container)',
            borderBottom: '1px solid var(--ant-color-border)',
          },
          body: {
            backgroundColor: 'var(--ant-color-bg-container)',
          },
          footer: {
            backgroundColor: 'var(--ant-color-bg-container)',
            borderTop: '1px solid var(--ant-color-border)',
          },
        }}
      >
        <Form form={form} layout="vertical" className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="username"
              label="Tên người dùng"
              rules={[
                { required: true, message: 'Vui lòng nhập tên người dùng' },
                { min: 3, message: 'Tên người dùng phải có ít nhất 3 ký tự' },
              ]}
              className="dark:text-slate-200"
            >
              <Input className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Vui lòng nhập email' },
                { type: 'email', message: 'Email không hợp lệ' },
              ]}
              className="dark:text-slate-200"
            >
              <Input className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400" />
            </Form.Item>
          </div>

          {!editingUser && (
            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[
                  { required: true, message: 'Vui lòng nhập mật khẩu' },
                  { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự' },
                ]}
                className="dark:text-slate-200"
              >
                <Input.Password className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400" />
              </Form.Item>

              <Form.Item
                name="passwordConfirm"
                label="Xác nhận mật khẩu"
                rules={[
                  { required: true, message: 'Vui lòng xác nhận mật khẩu' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Mật khẩu không khớp'));
                    },
                  }),
                ]}
                className="dark:text-slate-200"
              >
                <Input.Password className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400" />
              </Form.Item>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="role"
              label="Vai trò"
              rules={[{ required: true, message: 'Vui lòng chọn vai trò' }]}
              className="dark:text-slate-200"
            >
              <Select className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100">
                <Option value="user">Người dùng</Option>
                <Option value="admin">Quản trị viên</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="active"
              label="Trạng thái"
              valuePropName="checked"
              className="dark:text-slate-200"
            >
              <Select className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100">
                <Option value={true}>Hoạt động</Option>
                <Option value={false}>Không hoạt động</Option>
              </Select>
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="currentLevel"
              label="Cấp độ hiện tại"
              className="dark:text-slate-200"
            >
              <Select className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100">
                <Option value="HSK1">HSK1</Option>
                <Option value="HSK2">HSK2</Option>
                <Option value="HSK3">HSK3</Option>
                <Option value="HSK4">HSK4</Option>
                <Option value="HSK5">HSK5</Option>
                <Option value="HSK6">HSK6</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="theme"
              label="Giao diện"
              className="dark:text-slate-200"
            >
              <Select className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100">
                <Option value="light">Sáng</Option>
                <Option value="dark">Tối</Option>
                <Option value="auto">Tự động</Option>
              </Select>
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="language"
              label="Ngôn ngữ"
              className="dark:text-slate-200"
            >
              <Select className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100">
                <Option value="vi">Tiếng Việt</Option>
                <Option value="en">English</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="dailyGoal"
              label="Mục tiêu hàng ngày (phút)"
              className="dark:text-slate-200"
            >
              <Input
                type="number"
                min={1}
                max={480}
                className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
              />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default UsersAdmin;
