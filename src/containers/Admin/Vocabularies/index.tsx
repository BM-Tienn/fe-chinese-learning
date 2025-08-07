import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, message, Tag } from 'antd';
import BaseAdminTable from '../components/BaseAdminTable';
import type { ColumnsType } from 'antd/es/table';

const { Option } = Select;

interface Vocabulary {
  _id: string;
  word: string;
  pinyin: string;
  meaning: string;
  level: string;
  category: string;
  examples: string[];
  createdAt: string;
  updatedAt: string;
}

const VocabulariesAdmin: React.FC = () => {
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingVocabulary, setEditingVocabulary] = useState<Vocabulary | null>(
    null,
  );
  const [form] = Form.useForm();

  const fetchVocabularies = async () => {
    try {
      setLoading(true);
      // Mock data for now
      const mockVocabularies: Vocabulary[] = [
        {
          _id: '1',
          word: '你好',
          pinyin: 'nǐ hǎo',
          meaning: 'Xin chào',
          level: 'HSK1',
          category: 'greeting',
          examples: ['你好，我是小明', '你好吗？'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
      setVocabularies(mockVocabularies);
    } catch (error) {
      message.error('Không thể tải danh sách từ vựng');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVocabularies();
  }, []);

  const handleCreate = () => {
    setEditingVocabulary(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (vocabulary: Vocabulary) => {
    setEditingVocabulary(vocabulary);
    form.setFieldsValue({
      word: vocabulary.word,
      pinyin: vocabulary.pinyin,
      meaning: vocabulary.meaning,
      level: vocabulary.level,
      category: vocabulary.category,
      examples: vocabulary.examples,
    });
    setModalVisible(true);
  };

  const handleDelete = async (vocabulary: Vocabulary) => {
    try {
      message.success('Xóa từ vựng thành công');
      await fetchVocabularies();
    } catch (error) {
      message.error('Có lỗi xảy ra khi xóa từ vựng');
    }
  };

  const handleView = (vocabulary: Vocabulary) => {
    message.info(`Xem chi tiết từ vựng: ${vocabulary.word}`);
  };

  const handleModalOk = async () => {
    try {
      await form.validateFields();

      if (editingVocabulary) {
        message.success('Cập nhật từ vựng thành công');
      } else {
        message.success('Tạo từ vựng thành công');
      }

      setModalVisible(false);
      fetchVocabularies();
    } catch (error) {
      message.error('Có lỗi xảy ra');
    }
  };

  const columns: ColumnsType<Vocabulary> = [
    {
      title: 'Từ',
      dataIndex: 'word',
      key: 'word',
      sorter: (a, b) => a.word.localeCompare(b.word),
    },
    {
      title: 'Pinyin',
      dataIndex: 'pinyin',
      key: 'pinyin',
    },
    {
      title: 'Nghĩa',
      dataIndex: 'meaning',
      key: 'meaning',
      ellipsis: true,
      width: 150,
    },
    {
      title: 'Cấp độ',
      dataIndex: 'level',
      key: 'level',
      render: (level: string) => <Tag color="blue">{level}</Tag>,
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => <Tag color="green">{category}</Tag>,
    },
    {
      title: 'Ví dụ',
      dataIndex: 'examples',
      key: 'examples',
      render: (examples: string[]) => (
        <div className="flex flex-wrap gap-1">
          {examples?.slice(0, 1).map((example, index) => (
            <Tag key={index} color="purple" className="text-xs">
              {example}
            </Tag>
          ))}
          {examples && examples.length > 1 && (
            <Tag color="purple" className="text-xs">
              +{examples.length - 1}
            </Tag>
          )}
        </div>
      ),
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
      key: 'category',
      label: 'Danh mục',
      options: [
        { label: 'Chào hỏi', value: 'greeting' },
        { label: 'Gia đình', value: 'family' },
        { label: 'Màu sắc', value: 'colors' },
        { label: 'Số đếm', value: 'numbers' },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      <BaseAdminTable
        title="Quản lý từ vựng"
        data={vocabularies}
        loading={loading}
        columns={columns}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onRefresh={fetchVocabularies}
        searchPlaceholder="Tìm kiếm theo từ, nghĩa..."
        filters={filters}
      />

      {/* Create/Edit Modal */}
      <Modal
        title={editingVocabulary ? 'Chỉnh sửa từ vựng' : 'Tạo từ vựng mới'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        width={600}
        okText={editingVocabulary ? 'Cập nhật' : 'Tạo'}
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical" className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="word"
              label="Từ"
              rules={[{ required: true, message: 'Vui lòng nhập từ' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="pinyin"
              label="Pinyin"
              rules={[{ required: true, message: 'Vui lòng nhập pinyin' }]}
            >
              <Input />
            </Form.Item>
          </div>

          <Form.Item
            name="meaning"
            label="Nghĩa"
            rules={[{ required: true, message: 'Vui lòng nhập nghĩa' }]}
          >
            <Input />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
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

            <Form.Item
              name="category"
              label="Danh mục"
              rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
            >
              <Select>
                <Option value="greeting">Chào hỏi</Option>
                <Option value="family">Gia đình</Option>
                <Option value="colors">Màu sắc</Option>
                <Option value="numbers">Số đếm</Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item name="examples" label="Ví dụ">
            <Select mode="tags" placeholder="Nhập ví dụ và nhấn Enter" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default VocabulariesAdmin;
