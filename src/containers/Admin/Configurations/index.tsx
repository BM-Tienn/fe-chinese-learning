/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import {
  Table,
  Button,
  Form,
  Input,
  Select,
  Switch,
  notification,
  Tag,
  InputNumber,
} from 'antd';
import { Plus, Edit, Delete } from 'lucide-react';
import { configurationsApi } from '../../../services';
import { I_Configuration } from '../../../types/shared/configuration';
import { T_ConfigurationType } from '../../../types/shared/common';
import ModalContainer from '../../../components/ModalContainer';
import FormContainer from '../../../components/FormContainer';

const { Option } = Select;

const ConfigurationsAdmin: React.FC = React.memo(() => {
  const [configurations, setConfigurations] = useState<I_Configuration[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingConfiguration, setEditingConfiguration] =
    useState<I_Configuration | null>(null);
  const [form] = Form.useForm();

  const fetchConfigurations = useCallback(async () => {
    try {
      setLoading(true);
      const response = await configurationsApi.getConfigurations();
      // setConfigurations(response.configurations);
    } catch (error) {
      notification.error({
        message: 'Lỗi khi tải danh sách cấu hình',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConfigurations();
  }, [fetchConfigurations]);

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();

      if (editingConfiguration) {
        await configurationsApi.updateConfiguration(
          editingConfiguration._id,
          values,
        );
        notification.success({
          message: 'Cập nhật cấu hình thành công',
        });
      } else {
        await configurationsApi.createConfiguration(values);
        notification.success({
          message: 'Tạo cấu hình thành công',
        });
      }

      setModalVisible(false);
      fetchConfigurations();
    } catch (error) {
      notification.error({
        message: 'Lỗi khi lưu cấu hình',
      });
    }
  };

  const handleEdit = (record: I_Configuration) => {
    setEditingConfiguration(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await configurationsApi.deleteConfiguration(id);
      notification.success({
        message: 'Xóa cấu hình thành công',
      });
      fetchConfigurations();
    } catch (error) {
      notification.error({
        message: 'Lỗi khi xóa cấu hình',
      });
    }
  };

  const handleAdd = () => {
    setEditingConfiguration(null);
    form.resetFields();
    setModalVisible(true);
  };

  const columns = [
    {
      title: 'Tên',
      dataIndex: 'label',
      key: 'label',
    },
    {
      title: 'Khóa',
      dataIndex: 'key',
      key: 'key',
      render: (key: string) => <Tag color="blue">{key}</Tag>,
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
      render: (type: T_ConfigurationType) => <Tag color="purple">{type}</Tag>,
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
      render: (_, record: I_Configuration) => (
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
          name="key"
          label="Khóa"
          rules={[{ required: true, message: 'Vui lòng nhập khóa' }]}
        >
          <Input placeholder="Nhập khóa" />
        </Form.Item>

        <Form.Item
          name="label"
          label="Tên cấu hình"
          rules={[{ required: true, message: 'Vui lòng nhập tên cấu hình' }]}
        >
          <Input placeholder="Nhập tên cấu hình" />
        </Form.Item>

        <Form.Item
          name="type"
          label="Loại"
          rules={[{ required: true, message: 'Vui lòng chọn loại' }]}
        >
          <Select placeholder="Chọn loại">
            <Option value="filter">Filter</Option>
            <Option value="topic">Topic</Option>
            <Option value="wordType">Word Type</Option>
            <Option value="level">Level</Option>
            <Option value="category">Category</Option>
            <Option value="difficulty">Difficulty</Option>
            <Option value="tag">Tag</Option>
            <Option value="setting">Setting</Option>
          </Select>
        </Form.Item>

        <Form.Item name="isActive" label="Trạng thái" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item name="order" label="Thứ tự">
          <InputNumber style={{ width: '100%' }} placeholder="Nhập thứ tự" />
        </Form.Item>

        <Form.Item name="count" label="Số lượng">
          <InputNumber style={{ width: '100%' }} placeholder="Nhập số lượng" />
        </Form.Item>
      </>
    );
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<Plus />} onClick={handleAdd}>
          Thêm cấu hình
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={configurations}
        loading={loading}
        rowKey="_id"
        pagination={{
          position: ['bottomRight'],
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} của ${total} cấu hình`,
        }}
      />

      <ModalContainer
        title={
          editingConfiguration ? 'Chỉnh sửa cấu hình' : 'Thêm cấu hình mới'
        }
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
        size="medium"
        variant="success"
        okText={editingConfiguration ? 'Cập nhật' : 'Tạo'}
        cancelText="Hủy"
      >
        <FormContainer form={form} onFinish={handleModalOk} layout="vertical">
          {renderFormFields()}
        </FormContainer>
      </ModalContainer>
    </div>
  );
});

export default ConfigurationsAdmin;
