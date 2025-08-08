import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Form, Input, Select, notification, Tag } from 'antd';
import BaseAdminTable from '../components/BaseAdminTable';
import type { ColumnsType } from 'antd/es/table';

const { Option } = Select;

interface Word {
  _id: string;
  character: string;
  pinyin: string;
  meaning: string;
  level: string;
  strokeCount: number;
  radicals: string[];
  createdAt: string;
  updatedAt: string;
}

const WordsAdmin: React.FC = React.memo(() => {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingWord, setEditingWord] = useState<Word | null>(null);
  const [form] = Form.useForm();

  const fetchWords = useCallback(async () => {
    try {
      setLoading(true);
      // Mock data for now
      const mockWords: Word[] = [
        {
          _id: '1',
          character: '你',
          pinyin: 'nǐ',
          meaning: 'bạn',
          level: 'HSK1',
          strokeCount: 7,
          radicals: ['亻', '尔'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
      setWords(mockWords);
    } catch (error) {
      notification.error({
        message: 'Không thể tải danh sách từ',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWords();
  }, [fetchWords]);

  const handleCreate = () => {
    setEditingWord(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (word: Word) => {
    setEditingWord(word);
    form.setFieldsValue({
      character: word.character,
      pinyin: word.pinyin,
      meaning: word.meaning,
      level: word.level,
      strokeCount: word.strokeCount,
      radicals: word.radicals,
    });
    setModalVisible(true);
  };

  const handleDelete = async (word: Word) => {
    try {
      notification.success({
        message: 'Xóa từ thành công',
      });
      await fetchWords();
    } catch (error) {
      notification.error({
        message: 'Có lỗi xảy ra khi xóa từ',
      });
    }
  };

  const handleView = (word: Word) => {
    notification.info({
      message: `Xem chi tiết từ: ${word.character}`,
    });
  };

  const handleModalOk = async () => {
    try {
      await form.validateFields();

      if (editingWord) {
        notification.success({
          message: 'Cập nhật từ thành công',
        });
      } else {
        notification.success({
          message: 'Tạo từ thành công',
        });
      }

      setModalVisible(false);
      fetchWords();
    } catch (error) {
      notification.error({
        message: 'Có lỗi xảy ra',
      });
    }
  };

  const columns: ColumnsType<Word> = [
    {
      title: 'Chữ Hán',
      dataIndex: 'character',
      key: 'character',
      sorter: (a, b) => a.character.localeCompare(b.character),
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
      title: 'Số nét',
      dataIndex: 'strokeCount',
      key: 'strokeCount',
      render: (count: number) => `${count} nét`,
    },
    {
      title: 'Bộ thủ',
      dataIndex: 'radicals',
      key: 'radicals',
      render: (radicals: string[]) => (
        <div className="flex flex-wrap gap-1">
          {radicals?.map((radical, index) => (
            <Tag key={index} color="green" className="text-xs">
              {radical}
            </Tag>
          ))}
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
  ];

  return (
    <div className="space-y-4">
      <BaseAdminTable
        title="Quản lý từ"
        data={words}
        loading={loading}
        columns={columns}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onRefresh={fetchWords}
        searchPlaceholder="Tìm kiếm theo chữ Hán, nghĩa..."
        filters={filters}
      />

      {/* Create/Edit Modal */}
      <Modal
        title={editingWord ? 'Chỉnh sửa từ' : 'Tạo từ mới'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        width={600}
        okText={editingWord ? 'Cập nhật' : 'Tạo'}
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical" className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="character"
              label="Chữ Hán"
              rules={[{ required: true, message: 'Vui lòng nhập chữ Hán' }]}
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
              name="strokeCount"
              label="Số nét"
              rules={[{ required: true, message: 'Vui lòng nhập số nét' }]}
            >
              <Input type="number" min={1} max={50} />
            </Form.Item>
          </div>

          <Form.Item name="radicals" label="Bộ thủ">
            <Select mode="tags" placeholder="Nhập bộ thủ và nhấn Enter" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
});

export default WordsAdmin;
