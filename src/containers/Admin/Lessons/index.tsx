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
  Button,
} from 'antd';
import BaseAdminTable from '../components/BaseAdminTable';
import { coursesApi, lessonsApi } from '../../../services';
import type { ColumnsType } from 'antd/es/table';
import type {
  I_Lesson,
  I_CreateLessonRequest,
  I_UpdateLessonRequest,
} from '../../../types/shared';
import { Eye, Edit, Delete } from 'lucide-react';

const { Option } = Select;
const { TextArea } = Input;

const LessonsAdmin: React.FC = React.memo(() => {
  const [lessons, setLessons] = useState<I_Lesson[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingLesson, setEditingLesson] = useState<I_Lesson | null>(null);
  const [form] = Form.useForm();

  const fetchLessons = useCallback(async () => {
    try {
      setLoading(true);
      const response = await lessonsApi.getAllLessons();
      // Transform API response to match our interface
      const transformedLessons: I_Lesson[] = (response.lessons || []).map(
        lesson => ({
          _id: lesson._id,
          title: lesson.title,
          subtitle: lesson.subtitle,
          course: lesson.course,
          level: lesson.level,
          order: lesson.order,
          image: lesson.image,
          content: lesson.content,
          vocabulary: lesson.vocabulary,
          grammar: lesson.grammar,
          exercises: lesson.exercises,
          estimatedTime: lesson.estimatedTime,
          difficulty: lesson.difficulty,
          isActive: lesson.isActive,
          metadata: lesson.metadata,
          createdAt: lesson.createdAt,
          updatedAt: lesson.updatedAt,
        }),
      );
      setLessons(transformedLessons);
    } catch (error) {
      message.error('Không thể tải danh sách bài học');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCourses = useCallback(async () => {
    try {
      const response = await coursesApi.getAllCourses();
      setCourses(response.courses || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }, []);

  useEffect(() => {
    fetchLessons();
    fetchCourses();
  }, [fetchLessons, fetchCourses]);

  const handleCreate = () => {
    setEditingLesson(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (lesson: I_Lesson) => {
    setEditingLesson(lesson);
    form.setFieldsValue({
      title: lesson.title,
      subtitle: lesson.subtitle,
      course: lesson.course,
      level: lesson.level,
      order: lesson.order,
      estimatedTime: lesson.estimatedTime,
      difficulty: lesson.difficulty,
      content: lesson.content,
      isActive: lesson.isActive,
    });
    setModalVisible(true);
  };

  const handleDelete = async (lesson: I_Lesson) => {
    try {
      await lessonsApi.deleteLesson(lesson._id);
      message.success('Xóa bài học thành công');
      await fetchLessons();
    } catch (error) {
      message.error('Có lỗi xảy ra khi xóa bài học');
    }
  };

  const handleView = (lesson: I_Lesson) => {
    message.info(`Xem chi tiết bài học: ${lesson.title}`);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();

      if (editingLesson) {
        // Update lesson
        const updateData: I_UpdateLessonRequest = {
          title: values.title,
          subtitle: values.subtitle,
          course: values.course,
          level: values.level,
          order: values.order,
          estimatedTime: values.estimatedTime,
          difficulty: values.difficulty,
          content: values.content,
          isActive: values.isActive,
        };
        await lessonsApi.updateLesson(editingLesson._id, updateData);
        message.success('Cập nhật bài học thành công');
      } else {
        // Create new lesson
        const createData: I_CreateLessonRequest = {
          title: values.title,
          subtitle: values.subtitle,
          course: values.course,
          level: values.level,
          order: values.order,
          estimatedTime: values.estimatedTime,
          difficulty: values.difficulty,
          content: values.content,
          isActive: values.isActive,
        };
        await lessonsApi.createLesson(createData);
        message.success('Tạo bài học thành công');
      }

      setModalVisible(false);
      fetchLessons();
    } catch (error) {
      message.error('Có lỗi xảy ra');
    }
  };

  const columns: ColumnsType<I_Lesson> = [
    {
      title: 'Tên bài học',
      dataIndex: 'title',
      key: 'title',
      sorter: (a: I_Lesson, b: I_Lesson) => a.title.localeCompare(b.title),
    },
    {
      title: 'Khóa học',
      dataIndex: 'course',
      key: 'course',
      render: (courseId: string) => {
        const course = courses.find(c => c._id === courseId);
        return course ? course.title : courseId;
      },
    },
    {
      title: 'Cấp độ',
      dataIndex: 'level',
      key: 'level',
      render: (level: string) => <Tag color="blue">{level}</Tag>,
    },
    {
      title: 'Thứ tự',
      dataIndex: 'order',
      key: 'order',
      sorter: (a: I_Lesson, b: I_Lesson) => a.order - b.order,
    },
    {
      title: 'Thời gian ước tính',
      dataIndex: 'estimatedTime',
      key: 'estimatedTime',
      render: (time: number) => `${time} phút`,
    },
    {
      title: 'Độ khó',
      dataIndex: 'difficulty',
      key: 'difficulty',
      render: (difficulty: string) => (
        <Tag
          color={
            difficulty === 'Easy'
              ? 'green'
              : difficulty === 'Medium'
                ? 'orange'
                : 'red'
          }
        >
          {difficulty}
        </Tag>
      ),
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_, record: I_Lesson) => (
        <Tag color={record.isActive ? 'green' : 'red'}>
          {record.isActive ? 'Hoạt động' : 'Không hoạt động'}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_, record: I_Lesson) => (
        <div className="flex space-x-2">
          <Button
            type="text"
            icon={<Eye className="w-4 h-4" />}
            onClick={() => handleView(record)}
            title="Xem chi tiết"
          />
          <Button
            type="text"
            icon={<Edit className="w-4 h-4" />}
            onClick={() => handleEdit(record)}
            title="Chỉnh sửa"
          />
          <Button
            type="text"
            danger
            icon={<Delete className="w-4 h-4" />}
            onClick={() => handleDelete(record)}
            title="Xóa"
          />
        </div>
      ),
    },
  ];

  const filters = [
    {
      key: 'course',
      label: 'Khóa học',
      options: courses.map(course => ({
        label: course.title,
        value: course._id,
      })),
    },
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
        { label: 'Dễ', value: 'Easy' },
        { label: 'Trung bình', value: 'Medium' },
        { label: 'Khó', value: 'Hard' },
      ],
    },
    {
      key: 'isActive',
      label: 'Trạng thái',
      options: [
        { label: 'Hoạt động', value: 'true' },
        { label: 'Không hoạt động', value: 'false' },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      <BaseAdminTable
        title="Quản lý bài học"
        data={lessons}
        loading={loading}
        columns={columns}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onRefresh={fetchLessons}
        searchPlaceholder="Tìm kiếm theo tên bài học..."
        filters={filters}
      />

      {/* Create/Edit Modal */}
      <Modal
        title={editingLesson ? 'Chỉnh sửa bài học' : 'Tạo bài học mới'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        width={800}
        okText={editingLesson ? 'Cập nhật' : 'Tạo'}
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical" className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="title"
              label="Tên bài học"
              rules={[
                { required: true, message: 'Vui lòng nhập tên bài học' },
                { min: 3, message: 'Tên bài học phải có ít nhất 3 ký tự' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="subtitle" label="Phụ đề">
              <Input />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="course"
              label="Khóa học"
              rules={[{ required: true, message: 'Vui lòng chọn khóa học' }]}
            >
              <Select>
                {courses.map(course => (
                  <Option key={course._id} value={course._id}>
                    {course.title}
                  </Option>
                ))}
              </Select>
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
              </Select>
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="order"
              label="Thứ tự"
              rules={[{ required: true, message: 'Vui lòng nhập thứ tự' }]}
            >
              <InputNumber min={1} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="estimatedTime"
              label="Thời lượng (phút)"
              rules={[{ required: true, message: 'Vui lòng nhập thời lượng' }]}
            >
              <InputNumber min={1} max={180} style={{ width: '100%' }} />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="difficulty"
              label="Độ khó"
              rules={[{ required: true, message: 'Vui lòng chọn độ khó' }]}
            >
              <Select>
                <Option value="Easy">Dễ</Option>
                <Option value="Medium">Trung bình</Option>
                <Option value="Hard">Khó</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="isActive"
              label="Trạng thái"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </div>

          <Form.Item
            name="content"
            label="Nội dung bài học"
            rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
          >
            <TextArea rows={6} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
});

export default LessonsAdmin;
