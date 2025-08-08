import React, { useState, useEffect, useCallback } from 'react';
import {
  Modal,
  Form,
  Input,
  Select,
  message,
  Tag,
  InputNumber,
  Switch,
  DatePicker,
} from 'antd';
import BaseAdminTable from '../components/BaseAdminTable';
import { userGoalsApi } from '../../../services';
import type { ColumnsType } from 'antd/es/table';
import type {
  UserGoal,
  CreateUserGoalRequest,
  UpdateUserGoalRequest,
} from '../../../services';
import dayjs from 'dayjs';

const { Option } = Select;

const UserGoalsAdmin: React.FC = React.memo(() => {
  const [userGoals, setUserGoals] = useState<UserGoal[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingGoal, setEditingGoal] = useState<UserGoal | null>(null);
  const [form] = Form.useForm();

  const fetchUserGoals = useCallback(async () => {
    try {
      setLoading(true);
      const response = await userGoalsApi.getAllUserGoals();
      setUserGoals(response.userGoals || []);
    } catch (error) {
      message.error('Không thể tải danh sách mục tiêu học tập');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserGoals();
  }, [fetchUserGoals]);

  const handleCreate = () => {
    setEditingGoal(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (goal: UserGoal) => {
    setEditingGoal(goal);
    form.setFieldsValue({
      type: goal.type,
      category: goal.category,
      label: goal.label,
      current: goal.current,
      total: goal.total,
      unit: goal.unit,
      color: goal.color,
      icon: goal.icon,
      startDate: goal.startDate ? dayjs(goal.startDate) : null,
      endDate: goal.endDate ? dayjs(goal.endDate) : null,
      isCompleted: goal.isCompleted,
      isActive: goal.isActive,
    });
    setModalVisible(true);
  };

  const handleDelete = async (goal: UserGoal) => {
    try {
      await userGoalsApi.deleteUserGoal(goal._id);
      message.success('Xóa mục tiêu học tập thành công');
      await fetchUserGoals();
    } catch (error) {
      message.error('Có lỗi xảy ra khi xóa mục tiêu học tập');
    }
  };

  const handleView = (goal: UserGoal) => {
    message.info(`Xem chi tiết mục tiêu học tập: ${goal.label}`);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();

      if (editingGoal) {
        // Update goal
        const updateData: UpdateUserGoalRequest = {
          label: values.label,
          total: values.total,
          current: values.current,
          unit: values.unit,
          color: values.color,
          icon: values.icon,
          endDate: values.endDate?.toISOString(),
          isActive: values.isActive,
        };
        await userGoalsApi.updateUserGoal(editingGoal._id, updateData);
        message.success('Cập nhật mục tiêu học tập thành công');
      } else {
        // Create new goal
        const createData: CreateUserGoalRequest = {
          type: values.type,
          category: values.category,
          label: values.label,
          total: values.total,
          unit: values.unit,
          color: values.color,
          icon: values.icon,
          endDate: values.endDate?.toISOString(),
          isActive: values.isActive,
        };
        await userGoalsApi.createUserGoal(createData);
        message.success('Tạo mục tiêu học tập thành công');
      }

      setModalVisible(false);
      fetchUserGoals();
    } catch (error) {
      message.error('Có lỗi xảy ra');
    }
  };

  const columns: ColumnsType<UserGoal> = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      render: (id: string) => (
        <span className="font-mono text-xs">{id.slice(-8)}</span>
      ),
    },
    {
      title: 'Người dùng',
      dataIndex: 'user',
      key: 'user',
      render: (userId: string) => <Tag color="blue">{userId.slice(-8)}</Tag>,
    },
    {
      title: 'Nhãn',
      dataIndex: 'label',
      key: 'label',
      sorter: (a, b) => a.label.localeCompare(b.label),
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => <Tag color="purple">{type}</Tag>,
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => <Tag color="green">{category}</Tag>,
    },
    {
      title: 'Tiến độ',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress: number) => `${progress}%`,
    },
    {
      title: 'Hiện tại/Tổng',
      key: 'progress_detail',
      render: (_, record) => `${record.current}/${record.total} ${record.unit}`,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isCompleted',
      key: 'isCompleted',
      render: (isCompleted: boolean) => (
        <Tag color={isCompleted ? 'green' : 'orange'}>
          {isCompleted ? 'Hoàn thành' : 'Đang thực hiện'}
        </Tag>
      ),
    },
    {
      title: 'Hoạt động',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? 'Hoạt động' : 'Không hoạt động'}
        </Tag>
      ),
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
    },
  ];

  const filters = [
    {
      key: 'type',
      label: 'Loại',
      options: [
        { label: 'Hàng ngày', value: 'daily' },
        { label: 'Hàng tuần', value: 'weekly' },
        { label: 'Hàng tháng', value: 'monthly' },
        { label: 'Tùy chỉnh', value: 'custom' },
      ],
    },
    {
      key: 'category',
      label: 'Danh mục',
      options: [
        { label: 'Từ mới', value: 'new_words' },
        { label: 'Ký tự', value: 'characters' },
        { label: 'Nghe', value: 'listening' },
        { label: 'Đọc', value: 'reading' },
        { label: 'Viết', value: 'writing' },
        { label: 'Nói', value: 'speaking' },
        { label: 'Tổng hợp', value: 'mixed' },
      ],
    },
    {
      key: 'isCompleted',
      label: 'Trạng thái',
      options: [
        { label: 'Hoàn thành', value: 'true' },
        { label: 'Đang thực hiện', value: 'false' },
      ],
    },
    {
      key: 'isActive',
      label: 'Hoạt động',
      options: [
        { label: 'Hoạt động', value: 'true' },
        { label: 'Không hoạt động', value: 'false' },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      <BaseAdminTable
        title="Quản lý mục tiêu học tập"
        data={userGoals}
        loading={loading}
        columns={columns}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onRefresh={fetchUserGoals}
        searchPlaceholder="Tìm kiếm theo nhãn mục tiêu..."
        filters={filters}
      />

      {/* Create/Edit Modal */}
      <Modal
        title={
          editingGoal
            ? 'Chỉnh sửa mục tiêu học tập'
            : 'Tạo mục tiêu học tập mới'
        }
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        width={800}
        okText={editingGoal ? 'Cập nhật' : 'Tạo'}
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical" className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="label"
              label="Nhãn"
              rules={[
                { required: true, message: 'Vui lòng nhập nhãn' },
                { min: 3, message: 'Nhãn phải có ít nhất 3 ký tự' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="type"
              label="Loại"
              rules={[{ required: true, message: 'Vui lòng chọn loại' }]}
            >
              <Select>
                <Option value="daily">Hàng ngày</Option>
                <Option value="weekly">Hàng tuần</Option>
                <Option value="monthly">Hàng tháng</Option>
                <Option value="custom">Tùy chỉnh</Option>
              </Select>
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="category"
              label="Danh mục"
              rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
            >
              <Select>
                <Option value="new_words">Từ mới</Option>
                <Option value="characters">Ký tự</Option>
                <Option value="listening">Nghe</Option>
                <Option value="reading">Đọc</Option>
                <Option value="writing">Viết</Option>
                <Option value="speaking">Nói</Option>
                <Option value="mixed">Tổng hợp</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="unit"
              label="Đơn vị"
              rules={[{ required: true, message: 'Vui lòng chọn đơn vị' }]}
            >
              <Select>
                <Option value="từ">Từ</Option>
                <Option value="chữ">Chữ</Option>
                <Option value="bài">Bài</Option>
                <Option value="phút">Phút</Option>
                <Option value="điểm">Điểm</Option>
              </Select>
            </Form.Item>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Form.Item
              name="total"
              label="Mục tiêu"
              rules={[{ required: true, message: 'Vui lòng nhập mục tiêu' }]}
            >
              <InputNumber min={1} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="current"
              label="Hiện tại"
              rules={[{ required: true, message: 'Vui lòng nhập hiện tại' }]}
            >
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="color"
              label="Màu sắc"
              rules={[{ required: true, message: 'Vui lòng chọn màu sắc' }]}
            >
              <Select>
                <Option value="blue">Xanh dương</Option>
                <Option value="green">Xanh lá</Option>
                <Option value="purple">Tím</Option>
                <Option value="red">Đỏ</Option>
                <Option value="orange">Cam</Option>
                <Option value="yellow">Vàng</Option>
              </Select>
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item name="icon" label="Icon">
              <Input placeholder="Tên icon (Lucide)" />
            </Form.Item>

            <Form.Item name="endDate" label="Ngày kết thúc">
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="isCompleted"
              label="Hoàn thành"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item
              name="isActive"
              label="Hoạt động"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
});

export default UserGoalsAdmin;
