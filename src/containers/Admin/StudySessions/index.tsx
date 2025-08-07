import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Tag, InputNumber, Switch, DatePicker } from 'antd';
import BaseAdminTable from '../components/BaseAdminTable';
import { studySessionsApi } from '../../../services';
import type { ColumnsType } from 'antd/es/table';
import type {
  I_StudySession,
  I_CreateStudySessionRequest,
  I_UpdateStudySessionRequest,
} from '../../../types/shared';
import { T_StudySessionType } from '../../../types/shared/common';
import { showNotification } from '../../../utils/notifications';
import dayjs from 'dayjs';

const StudySessionsAdmin: React.FC = () => {
  const [studySessions, setStudySessions] = useState<I_StudySession[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingSession, setEditingSession] = useState<I_StudySession | null>(
    null,
  );
  const [form] = Form.useForm();

  const fetchStudySessions = async () => {
    try {
      setLoading(true);
      const response = await studySessionsApi.getAllStudySessions();
      setStudySessions(response.studySessions || []);
    } catch (error) {
      showNotification.error('Không thể tải danh sách phiên học tập');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudySessions();
  }, []);

  const handleCreate = () => {
    setEditingSession(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (session: I_StudySession) => {
    setEditingSession(session);
    form.setFieldsValue({
      user: session.user,
      course: session.course,
      lesson: session.lesson,
      flashcardSet: session.flashcardSet,
      startTime: session.startTime ? dayjs(session.startTime) : null,
      endTime: session.endTime ? dayjs(session.endTime) : null,
      duration: session.duration,
      score: session.score,
      progress: session.progress,
      isCompleted: session.isCompleted,
    });
    setModalVisible(true);
  };

  const handleDelete = async (session: I_StudySession) => {
    try {
      await studySessionsApi.deleteStudySession(session._id);
      showNotification.success('Xóa phiên học tập thành công');
      await fetchStudySessions();
    } catch (error) {
      showNotification.error('Có lỗi xảy ra khi xóa phiên học tập');
    }
  };

  const handleView = (session: I_StudySession) => {
    showNotification.info('Xem chi tiết phiên học tập', `ID: ${session._id}`);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();

      if (editingSession) {
        // Update session
        const updateData: I_UpdateStudySessionRequest = {
          endTime: values.endTime?.toISOString(),
          duration: values.duration,
          score: values.score,
          progress: values.progress,
          isCompleted: values.isCompleted,
        };
        await studySessionsApi.updateStudySession(
          editingSession._id,
          updateData,
        );
        showNotification.success('Cập nhật phiên học tập thành công');
      } else {
        // Create new session
        const createData: I_CreateStudySessionRequest = {
          course: values.course,
          lesson: values.lesson,
          flashcardSet: values.flashcardSet,
          type: 'lesson' as T_StudySessionType,
          metadata: {
            notes: `Session created by admin`,
          },
        };
        await studySessionsApi.createStudySession(createData);
        showNotification.success('Tạo phiên học tập thành công');
      }

      setModalVisible(false);
      fetchStudySessions();
    } catch (error) {
      showNotification.error('Có lỗi xảy ra');
    }
  };

  const columns: ColumnsType<I_StudySession> = [
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
      render: (courseId: string) =>
        courseId ? <Tag color="green">{courseId.slice(-8)}</Tag> : '-',
    },
    {
      title: 'Bài học',
      dataIndex: 'lesson',
      key: 'lesson',
      render: (lessonId: string) =>
        lessonId ? <Tag color="orange">{lessonId.slice(-8)}</Tag> : '-',
    },
    {
      title: 'Thời gian (phút)',
      dataIndex: 'duration',
      key: 'duration',
      render: (duration: number) => `${duration} phút`,
    },
    {
      title: 'Điểm số',
      dataIndex: 'score',
      key: 'score',
      render: (score: number) => `${score}%`,
    },
    {
      title: 'Tiến độ',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress: number) => `${progress}%`,
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
      title: 'Thời gian bắt đầu',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (date: string) => new Date(date).toLocaleString('vi-VN'),
    },
    {
      title: 'Thời gian kết thúc',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (date: string) =>
        date ? new Date(date).toLocaleString('vi-VN') : '-',
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
        title="Quản lý phiên học tập"
        data={studySessions}
        loading={loading}
        columns={columns}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onRefresh={fetchStudySessions}
        searchPlaceholder="Tìm kiếm theo ID phiên học tập..."
        filters={filters}
      />

      {/* Create/Edit Modal */}
      <Modal
        title={
          editingSession ? 'Chỉnh sửa phiên học tập' : 'Tạo phiên học tập mới'
        }
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        width={800}
        okText={editingSession ? 'Cập nhật' : 'Tạo'}
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical" className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="user"
              label="ID Người dùng"
              rules={[
                { required: true, message: 'Vui lòng nhập ID người dùng' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="course" label="ID Khóa học">
              <Input />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item name="lesson" label="ID Bài học">
              <Input />
            </Form.Item>

            <Form.Item name="flashcardSet" label="ID Bộ thẻ">
              <Input />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item name="startTime" label="Thời gian bắt đầu">
              <DatePicker showTime style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item name="endTime" label="Thời gian kết thúc">
              <DatePicker showTime style={{ width: '100%' }} />
            </Form.Item>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Form.Item
              name="duration"
              label="Thời gian (phút)"
              rules={[{ required: true, message: 'Vui lòng nhập thời gian' }]}
            >
              <InputNumber min={1} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="score"
              label="Điểm số (%)"
              rules={[{ required: true, message: 'Vui lòng nhập điểm số' }]}
            >
              <InputNumber min={0} max={100} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="progress"
              label="Tiến độ (%)"
              rules={[{ required: true, message: 'Vui lòng nhập tiến độ' }]}
            >
              <InputNumber min={0} max={100} style={{ width: '100%' }} />
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
};

export default StudySessionsAdmin;
