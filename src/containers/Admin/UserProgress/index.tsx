import React, { useState, useEffect, useCallback } from 'react';
import {
  Modal,
  Form,
  Input,
  message,
  Tag,
  InputNumber,
  Switch,
  DatePicker,
} from 'antd';
import BaseAdminTable from '../components/BaseAdminTable';
import { userProgressApi } from '../../../services';
import type { ColumnsType } from 'antd/es/table';
import type {
  UserProgress,
  CreateUserProgressRequest,
  UpdateUserProgressRequest,
} from '../../../services';
import dayjs from 'dayjs';

const UserProgressAdmin: React.FC = React.memo(() => {
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProgress, setEditingProgress] = useState<UserProgress | null>(
    null,
  );
  const [form] = Form.useForm();

  const fetchUserProgress = useCallback(async () => {
    try {
      setLoading(true);
      const response = await userProgressApi.getAllUserProgress();
      setUserProgress(response.userProgress || []);
    } catch (error) {
      message.error('Không thể tải danh sách tiến độ học tập');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserProgress();
  }, [fetchUserProgress]);

  const handleCreate = () => {
    setEditingProgress(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (progress: UserProgress) => {
    setEditingProgress(progress);
    form.setFieldsValue({
      user: progress.user,
      course: progress.course,
      lesson: progress.lesson,
      flashcardSet: progress.flashcardSet,
      progress: progress.progress,
      score: progress.score,
      timeSpent: progress.timeSpent,
      completedAt: progress.completedAt ? dayjs(progress.completedAt) : null,
      isCompleted: progress.isCompleted,
      lastStudied: progress.lastStudied ? dayjs(progress.lastStudied) : null,
    });
    setModalVisible(true);
  };

  const handleDelete = async (progress: UserProgress) => {
    try {
      await userProgressApi.deleteUserProgress(progress._id);
      message.success('Xóa tiến độ học tập thành công');
      await fetchUserProgress();
    } catch (error) {
      message.error('Có lỗi xảy ra khi xóa tiến độ học tập');
    }
  };

  const handleView = (progress: UserProgress) => {
    message.info(`Xem chi tiết tiến độ học tập: ${progress._id}`);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();

      if (editingProgress) {
        // Update progress
        const updateData: UpdateUserProgressRequest = {
          progress: values.progress,
          score: values.score,
          timeSpent: values.timeSpent,
          completedAt: values.completedAt?.toISOString(),
          isCompleted: values.isCompleted,
          lastStudied: values.lastStudied?.toISOString(),
        };
        await userProgressApi.updateUserProgress(
          editingProgress._id,
          updateData,
        );
        message.success('Cập nhật tiến độ học tập thành công');
      } else {
        // Create new progress
        const createData: CreateUserProgressRequest = {
          course: values.course,
          lesson: values.lesson,
          flashcardSet: values.flashcardSet,
          progress: values.progress,
          score: values.score,
          timeSpent: values.timeSpent,
        };
        await userProgressApi.createUserProgress(createData);
        message.success('Tạo tiến độ học tập thành công');
      }

      setModalVisible(false);
      fetchUserProgress();
    } catch (error) {
      message.error('Có lỗi xảy ra');
    }
  };

  const columns: ColumnsType<UserProgress> = [
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
      title: 'Khóa học',
      dataIndex: 'course',
      key: 'course',
      render: (courseId: string) => (
        <Tag color="green">{courseId.slice(-8)}</Tag>
      ),
    },
    {
      title: 'Bài học',
      dataIndex: 'lesson',
      key: 'lesson',
      render: (lessonId: string) =>
        lessonId ? <Tag color="orange">{lessonId.slice(-8)}</Tag> : '-',
    },
    {
      title: 'Bộ thẻ',
      dataIndex: 'flashcardSet',
      key: 'flashcardSet',
      render: (flashcardSetId: string) =>
        flashcardSetId ? (
          <Tag color="purple">{flashcardSetId.slice(-8)}</Tag>
        ) : (
          '-'
        ),
    },
    {
      title: 'Tiến độ',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress: number) => `${progress}%`,
    },
    {
      title: 'Điểm số',
      dataIndex: 'score',
      key: 'score',
      render: (score: number) => `${score}%`,
    },
    {
      title: 'Thời gian (phút)',
      dataIndex: 'timeSpent',
      key: 'timeSpent',
      render: (timeSpent: number) => `${timeSpent} phút`,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isCompleted',
      key: 'isCompleted',
      render: (isCompleted: boolean) => (
        <Tag color={isCompleted ? 'green' : 'orange'}>
          {isCompleted ? 'Hoàn thành' : 'Đang học'}
        </Tag>
      ),
    },
    {
      title: 'Lần học cuối',
      dataIndex: 'lastStudied',
      key: 'lastStudied',
      render: (date: string) => new Date(date).toLocaleString('vi-VN'),
    },
  ];

  const filters = [
    {
      key: 'isCompleted',
      label: 'Trạng thái',
      options: [
        { label: 'Hoàn thành', value: 'true' },
        { label: 'Đang học', value: 'false' },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      <BaseAdminTable
        title="Quản lý tiến độ học tập"
        data={userProgress}
        loading={loading}
        columns={columns}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onRefresh={fetchUserProgress}
        searchPlaceholder="Tìm kiếm theo ID tiến độ..."
        filters={filters}
      />

      {/* Create/Edit Modal */}
      <Modal
        title={
          editingProgress
            ? 'Chỉnh sửa tiến độ học tập'
            : 'Tạo tiến độ học tập mới'
        }
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        width={800}
        okText={editingProgress ? 'Cập nhật' : 'Tạo'}
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical" className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="course"
              label="ID Khóa học"
              rules={[{ required: true, message: 'Vui lòng nhập ID khóa học' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="lesson" label="ID Bài học">
              <Input />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item name="flashcardSet" label="ID Bộ thẻ">
              <Input />
            </Form.Item>

            <Form.Item
              name="progress"
              label="Tiến độ (%)"
              rules={[{ required: true, message: 'Vui lòng nhập tiến độ' }]}
            >
              <InputNumber min={0} max={100} style={{ width: '100%' }} />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="score"
              label="Điểm số (%)"
              rules={[{ required: true, message: 'Vui lòng nhập điểm số' }]}
            >
              <InputNumber min={0} max={100} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="timeSpent"
              label="Thời gian (phút)"
              rules={[{ required: true, message: 'Vui lòng nhập thời gian' }]}
            >
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item name="completedAt" label="Thời gian hoàn thành">
              <DatePicker showTime style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item name="lastStudied" label="Lần học cuối">
              <DatePicker showTime style={{ width: '100%' }} />
            </Form.Item>
          </div>

          <Form.Item
            name="isCompleted"
            label="Hoàn thành"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
});

export default UserProgressAdmin;
