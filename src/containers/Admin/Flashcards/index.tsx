import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Input, Select, message, Tag } from 'antd';
import { Plus, Edit, Delete } from 'lucide-react';
import { flashcardsApi } from '../../../services';
import { FlashcardSet } from '../../../services/flashcardsApi';
import ModalContainer from '../../../components/ModalContainer';
import FormContainer from '../../../components/FormContainer';

const { Option } = Select;
const { TextArea } = Input;

const FlashcardsAdmin: React.FC = () => {
  const [flashcardSets, setFlashcardSets] = useState<FlashcardSet[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingFlashcardSet, setEditingFlashcardSet] =
    useState<FlashcardSet | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchFlashcardSets();
  }, []);

  const fetchFlashcardSets = async () => {
    setLoading(true);
    try {
      const response = await flashcardsApi.getAllFlashcardSets();
      setFlashcardSets(response.flashcardSets);
    } catch (error) {
      message.error('Lỗi khi tải danh sách bộ thẻ');
    } finally {
      setLoading(false);
    }
  };

  const handleModalOk = async (values: any) => {
    try {
      if (editingFlashcardSet) {
        await flashcardsApi.updateFlashcardSet(editingFlashcardSet._id, values);
        message.success('Cập nhật bộ thẻ thành công');
      } else {
        await flashcardsApi.createFlashcardSet(values);
        message.success('Tạo bộ thẻ thành công');
      }
      setModalVisible(false);
      setEditingFlashcardSet(null);
      form.resetFields();
      fetchFlashcardSets();
    } catch (error) {
      message.error('Lỗi khi lưu bộ thẻ');
    }
  };

  const handleEdit = (record: FlashcardSet) => {
    setEditingFlashcardSet(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await flashcardsApi.deleteFlashcardSet(id);
      message.success('Xóa bộ thẻ thành công');
      fetchFlashcardSets();
    } catch (error) {
      message.error('Lỗi khi xóa bộ thẻ');
    }
  };

  const handleAdd = () => {
    setEditingFlashcardSet(null);
    form.resetFields();
    setModalVisible(true);
  };

  const columns = [
    {
      title: 'Tên bộ thẻ',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Số thẻ',
      dataIndex: 'cardCount',
      key: 'cardCount',
      render: (count: number) => <Tag color="blue">{count || 0}</Tag>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? 'Hoạt động' : 'Không hoạt động'}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_, record: FlashcardSet) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            type="text"
            icon={<Edit size={16} />}
            onClick={() => handleEdit(record)}
          />
          <Button
            type="text"
            danger
            icon={<Delete size={16} />}
            onClick={() => handleDelete(record._id)}
          />
        </div>
      ),
    },
  ];

  const renderFormFields = () => {
    return (
      <>
        <Form.Item
          name="title"
          label="Tên bộ thẻ"
          rules={[{ required: true, message: 'Vui lòng nhập tên bộ thẻ' }]}
        >
          <Input placeholder="Nhập tên bộ thẻ" />
        </Form.Item>

        <Form.Item name="description" label="Mô tả">
          <TextArea rows={3} placeholder="Nhập mô tả (tùy chọn)" />
        </Form.Item>

        <Form.Item
          name="category"
          label="Danh mục"
          rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
        >
          <Select placeholder="Chọn danh mục">
            <Option value="greetings">Chào hỏi</Option>
            <Option value="food">Thức ăn</Option>
            <Option value="family">Gia đình</Option>
            <Option value="numbers">Số đếm</Option>
            <Option value="colors">Màu sắc</Option>
            <Option value="animals">Động vật</Option>
            <Option value="weather">Thời tiết</Option>
            <Option value="travel">Du lịch</Option>
            <Option value="business">Kinh doanh</Option>
            <Option value="other">Khác</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="level"
          label="Cấp độ"
          rules={[{ required: true, message: 'Vui lòng chọn cấp độ' }]}
        >
          <Select placeholder="Chọn cấp độ">
            <Option value="HSK1">HSK1</Option>
            <Option value="HSK2">HSK2</Option>
            <Option value="HSK3">HSK3</Option>
            <Option value="HSK4">HSK4</Option>
            <Option value="HSK5">HSK5</Option>
            <Option value="HSK6">HSK6</Option>
          </Select>
        </Form.Item>

        <Form.Item name="isActive" label="Trạng thái" valuePropName="checked">
          <Select placeholder="Chọn trạng thái">
            <Option value={true}>Hoạt động</Option>
            <Option value={false}>Không hoạt động</Option>
          </Select>
        </Form.Item>
      </>
    );
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<Plus />} onClick={handleAdd}>
          Thêm bộ thẻ
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={flashcardSets}
        loading={loading}
        rowKey="_id"
        pagination={{
          position: ['bottomRight'],
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} của ${total} bộ thẻ`,
        }}
      />

      <ModalContainer
        title={editingFlashcardSet ? 'Chỉnh sửa bộ thẻ' : 'Thêm bộ thẻ mới'}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
        size="medium"
        variant="success"
        okText={editingFlashcardSet ? 'Cập nhật' : 'Tạo'}
        cancelText="Hủy"
      >
        <FormContainer form={form} onFinish={handleModalOk} layout="vertical">
          {renderFormFields()}
        </FormContainer>
      </ModalContainer>
    </div>
  );
};

export default FlashcardsAdmin;
