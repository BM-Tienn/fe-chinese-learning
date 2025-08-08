/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Form, Input, Select, message, Tag } from 'antd';
import BaseAdminTable from '../components/BaseAdminTable';
import type { ColumnsType } from 'antd/es/table';
import {
  ADMIN_VOCABULARIES_GET_LIST,
  useAdminVocabulariesSlice,
} from './slice';
import {
  selectAdminVocabulariesData,
  selectAdminVocabulariesLoading,
  selectAdminVocabulariesPagination,
} from './slice/selectors';
import {
  I_Vocabulary,
  I_VocabularyFilters,
  I_VocabularyExample,
} from 'types/shared';
import { store } from 'store/configureStore';
import { showNotification } from 'utils/notifications';
import { useSelector } from 'react-redux';

const { Option } = Select;

const VocabulariesAdmin: React.FC = React.memo(() => {
  const { actions } = useAdminVocabulariesSlice();
  const vocabularies = useSelector(selectAdminVocabulariesData);
  const loading = useSelector(selectAdminVocabulariesLoading);
  const pagination = useSelector(selectAdminVocabulariesPagination);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingVocabulary, setEditingVocabulary] =
    useState<I_Vocabulary | null>(null);
  const [form] = Form.useForm();

  const fetchVocabularies = useCallback(async () => {
    try {
      store.dispatch(
        ADMIN_VOCABULARIES_GET_LIST({
          params: {
            page: 1,
            limit: 10,
          },
        }),
      );
    } catch (error) {
      showNotification.error(
        'Không thể tải danh sách từ vựng',
        error as string,
      );
    }
  }, []);

  useEffect(() => {
    fetchVocabularies();
  }, [fetchVocabularies]);

  const handleCreate = () => {
    setEditingVocabulary(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (vocabulary: I_Vocabulary) => {
    setEditingVocabulary(vocabulary);
    form.setFieldsValue({
      chinese: vocabulary.chinese,
      pinyin: vocabulary.pinyin,
      meaning: vocabulary.meaning.primary,
      level: vocabulary.grammar?.level || vocabulary.hskLevel?.toString(),
      category: vocabulary.category,
      examples: vocabulary.examples?.map(ex => ex.chinese) || [],
    });
    setModalVisible(true);
  };

  const handleDelete = async (vocabulary: I_Vocabulary) => {
    try {
      message.success('Xóa từ vựng thành công');
      await fetchVocabularies();
    } catch (error) {
      message.error('Có lỗi xảy ra khi xóa từ vựng');
    }
  };

  const handleView = (vocabulary: I_Vocabulary) => {
    message.info(`Xem chi tiết từ vựng: ${vocabulary.chinese}`);
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

  const columns: ColumnsType<I_Vocabulary> = [
    {
      title: 'Từ tiếng Trung',
      dataIndex: 'chinese',
      key: 'chinese',
      sorter: (a, b) => a.chinese.localeCompare(b.chinese),
    },
    {
      title: 'Pinyin',
      dataIndex: 'pinyin',
      key: 'pinyin',
    },
    {
      title: 'Nghĩa',
      dataIndex: ['meaning', 'primary'],
      key: 'meaning',
      ellipsis: true,
      width: 150,
    },
    {
      title: 'Cấp độ',
      dataIndex: 'hskLevel',
      key: 'level',
      render: (level: number) => <Tag color="blue">HSK{level}</Tag>,
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
      render: (examples: I_VocabularyExample[]) => (
        <div className="flex flex-wrap gap-1">
          {examples?.slice(0, 1).map((example, index) => (
            <Tag key={index} color="purple" className="text-xs">
              {example.chinese}
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
        pagination={{
          current: pagination?.page || 1,
          pageSize: pagination?.limit || 10,
          total: pagination?.count || 0,
          onChange: (page, pageSize) => {
            console.log('page', page);
            console.log('pageSize', pageSize);
            store.dispatch(
              ADMIN_VOCABULARIES_GET_LIST({
                params: {
                  page,
                  limit: pageSize,
                },
              }),
            );
          },
        }}
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
              name="chinese"
              label="Từ tiếng Trung"
              rules={[
                { required: true, message: 'Vui lòng nhập từ tiếng Trung' },
              ]}
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
              name="hskLevel"
              label="Cấp độ HSK"
              rules={[{ required: true, message: 'Vui lòng chọn cấp độ HSK' }]}
            >
              <Select>
                <Option value={1}>HSK1</Option>
                <Option value={2}>HSK2</Option>
                <Option value={3}>HSK3</Option>
                <Option value={4}>HSK4</Option>
                <Option value={5}>HSK5</Option>
                <Option value={6}>HSK6</Option>
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
});

export default VocabulariesAdmin;
