/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Switch,
  message,
  Tag,
  InputNumber,
} from 'antd';
import { Plus, Edit, Delete, Eye } from 'lucide-react';
import { coursesApi } from '../../../services';
import type {
  I_Course,
  I_CreateCourseRequest,
  I_UpdateCourseRequest,
} from '../../../types/shared';
import { ColumnsType } from 'antd/es/table';
import { ADMIN_COURSES_GET_LIST, useAdminCoursesSlice } from './slice';
import { useSelector } from 'react-redux';
import { store } from '../../../store/configureStore';

const api = coursesApi;

const { Option } = Select;
const { TextArea } = Input;

const CoursesAdmin: React.FC = React.memo(() => {
  const { actions: adminCoursesActions } = useAdminCoursesSlice();

  // Sử dụng useSelector để lấy state từ Redux store
  const {
    list: courses,
    loading,
    pagination,
  } = useSelector(
    (state: any) =>
      state.adminCourses || { list: [], loading: false, pagination: null },
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [editingCourse, setEditingCourse] = useState<I_Course | null>(null);
  const [form] = Form.useForm();

  const fetchCourses = useCallback(async () => {
    try {
      console.log('Component: Dispatching ADMIN_COURSES_GET_LIST action');
      // Dispatch action với payload đúng format cho redux-saga-routines
      store.dispatch(
        ADMIN_COURSES_GET_LIST({
          params: {
            page: 1,
            limit: 10,
          },
        }),
      );
    } catch (error) {
      console.error('Component: Error dispatching action:', error);
      message.error('Không thể tải danh sách khóa học');
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleCreate = () => {
    setEditingCourse(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (course: I_Course) => {
    setEditingCourse(course);
    form.setFieldsValue({
      title: course.title,
      description: course.description,
      level: course.level,
      levelColor: course.levelColor,
      image: course.image,
      duration: course.duration,
      order: course.order,
      isNewCourse: course.isNewCourse,
      isPopular: course.isPopular,
      isActive: course.isActive,
      metadata: course.metadata,
    });
    setModalVisible(true);
  };

  const handleDelete = async (course: I_Course) => {
    try {
      await api.deleteCourse(course._id);
      await fetchCourses();
      message.success('Xóa khóa học thành công');
    } catch (error) {
      message.error('Có lỗi xảy ra khi xóa khóa học');
    }
  };

  const handleView = (course: I_Course) => {
    message.info(`Xem chi tiết khóa học: ${course.title}`);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();

      if (editingCourse) {
        // Update course
        const updateData: I_UpdateCourseRequest = {
          title: values.title,
          description: values.description,
          level: values.level,
          levelColor: values.levelColor,
          image: values.image,
          duration: values.duration,
          order: values.order,
          isNewCourse: values.isNewCourse,
          isPopular: values.isPopular,
          isActive: values.isActive,
          metadata: values.metadata,
        };
        await api.updateCourse(editingCourse._id, updateData);
        message.success('Cập nhật khóa học thành công');
      } else {
        // Create new course
        const createData: I_CreateCourseRequest = {
          title: values.title,
          description: values.description,
          level: values.level,
          levelColor: values.levelColor,
          image: values.image,
          duration: values.duration,
          order: values.order,
          isNewCourse: values.isNewCourse,
          isPopular: values.isPopular,
          isActive: values.isActive,
          metadata: values.metadata,
        };
        await api.createCourse(createData);
        message.success('Tạo khóa học thành công');
      }

      setModalVisible(false);
      fetchCourses();
    } catch (error) {
      message.error('Có lỗi xảy ra');
    }
  };

  const columns: ColumnsType<I_Course> = [
    {
      title: 'Tên khóa học',
      dataIndex: 'title',
      key: 'title',
      sorter: (a: I_Course, b: I_Course) => a.title.localeCompare(b.title),
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Cấp độ',
      dataIndex: 'level',
      key: 'level',
      render: (level: string) => <Tag color="blue">{level}</Tag>,
    },
    {
      title: 'Thời gian',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Thứ tự',
      dataIndex: 'order',
      key: 'order',
      sorter: (a: I_Course, b: I_Course) => (a.order || 0) - (b.order || 0),
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_, record: I_Course) => (
        <div className="space-y-1">
          <div>
            <Tag color={record.isActive ? 'green' : 'red'}>
              {record.isActive ? 'Hoạt động' : 'Không hoạt động'}
            </Tag>
          </div>
          {record.isNewCourse && <Tag color="orange">Mới</Tag>}
          {record.isPopular && <Tag color="purple">Phổ biến</Tag>}
        </div>
      ),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_, record: I_Course) => (
        <div className="flex space-x-2">
          <Button
            type="text"
            icon={<Eye className="w-4 h-4" />}
            onClick={() => handleView(record)}
            title="Xem chi tiết"
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          />
          <Button
            type="text"
            icon={<Edit className="w-4 h-4" />}
            onClick={() => handleEdit(record)}
            title="Chỉnh sửa"
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          />
          <Button
            type="text"
            danger
            icon={<Delete className="w-4 h-4" />}
            onClick={() => handleDelete(record)}
            title="Xóa"
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          />
        </div>
      ),
    },
  ];

  const filters = [
    {
      key: 'level',
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
    {
      key: 'difficulty',
      label: 'Độ khó',
      options: [
        { label: 'Cơ bản', value: 'beginner' },
        { label: 'Trung cấp', value: 'intermediate' },
        { label: 'Nâng cao', value: 'advanced' },
      ],
    },
    {
      key: 'isPublished',
      label: 'Trạng thái',
      options: [
        { label: 'Đã xuất bản', value: 'true' },
        { label: 'Bản nháp', value: 'false' },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý khóa học</h1>
        <Button
          type="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={handleCreate}
        >
          Thêm khóa học
        </Button>
      </div>

      <Table
        dataSource={courses}
        loading={loading}
        columns={columns}
        pagination={{ pageSize: 10 }}
        rowKey="_id"
      />

      {/* Create/Edit Modal */}
      <Modal
        title={editingCourse ? 'Chỉnh sửa khóa học' : 'Tạo khóa học mới'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        width={800}
        okText={editingCourse ? 'Cập nhật' : 'Tạo'}
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical" className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="title"
              label="Tên khóa học"
              rules={[
                { required: true, message: 'Vui lòng nhập tên khóa học' },
                { min: 3, message: 'Tên khóa học phải có ít nhất 3 ký tự' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="level"
              label="Cấp độ"
              rules={[{ required: true, message: 'Vui lòng chọn cấp độ' }]}
            >
              <Select>
                <Option value="HSK1">HSK1</Option>
                <Option value="HSK2">HSK2</Option>
                <Option value="HSK3">HSK3</Option>
                <Option value="HSK4">HSK4</Option>
                <Option value="HSK5">HSK5</Option>
                <Option value="HSK6">HSK6</Option>
                <Option value="Common">Common</Option>
                <Option value="Idiom">Idiom</Option>
                <Option value="Proverb">Proverb</Option>
                <Option value="Advanced">Advanced</Option>
                <Option value="Other">Other</Option>
                <Option value="Place Name">Place Name</Option>
                <Option value="Person Name">Person Name</Option>
                <Option value="Technical">Technical</Option>
                <Option value="Literary">Literary</Option>
                <Option value="Informal">Informal</Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
          >
            <TextArea rows={3} />
          </Form.Item>

          <div className="grid grid-cols-3 gap-4">
            <Form.Item
              name="levelColor"
              label="Màu cấp độ"
              rules={[{ required: true, message: 'Vui lòng chọn màu cấp độ' }]}
            >
              <Select>
                <Option value="red">Đỏ</Option>
                <Option value="orange">Cam</Option>
                <Option value="yellow">Vàng</Option>
                <Option value="green">Xanh lá</Option>
                <Option value="blue">Xanh dương</Option>
                <Option value="purple">Tím</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="duration"
              label="Thời lượng"
              rules={[{ required: true, message: 'Vui lòng nhập thời lượng' }]}
            >
              <Input placeholder="e.g., 8 tuần" />
            </Form.Item>

            <Form.Item name="order" label="Thứ tự">
              <InputNumber min={0} className="w-full" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item name="image" label="Hình ảnh">
              <Input placeholder="URL hình ảnh" />
            </Form.Item>

            <Form.Item name="students" label="Số học viên">
              <InputNumber min={0} className="w-full" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Form.Item
              name="isNewCourse"
              label="Khóa học mới"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item
              name="isPopular"
              label="Phổ biến"
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

          <Form.Item name="metadata" label="Thông tin phụ (JSON)">
            <TextArea
              rows={3}
              placeholder='{"difficulty": "Beginner", "category": "Vocabulary", "tags": ["basic", "essential"]}'
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
});

export default CoursesAdmin;
