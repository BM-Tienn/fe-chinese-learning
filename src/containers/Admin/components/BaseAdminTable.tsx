import { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Input,
  Select,
  Space,
  message,
  Popconfirm,
  Card,
  Typography,
  Tooltip,
  Pagination,
} from 'antd';
import { Plus, Search, Edit, Delete, Eye, RefreshCw } from 'lucide-react';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;
const { Option } = Select;

export interface BaseAdminTableProps<T> {
  title: string;
  data: T[];
  loading: boolean;
  columns: ColumnsType<T>;
  onCreate?: () => void;
  onEdit?: (record: T) => void;
  onDelete?: (record: T) => Promise<void>;
  onView?: (record: T) => void;
  onRefresh?: () => void;
  searchPlaceholder?: string;
  filters?: {
    key: string;
    label: string;
    options: { label: string; value: any }[];
  }[];
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
  };
}

function BaseAdminTable<T extends { _id: string }>({
  title,
  data,
  loading,
  columns,
  onCreate,
  onEdit,
  onDelete,
  onView,
  onRefresh,
  searchPlaceholder = 'Tìm kiếm...',
  filters = [],
  pagination,
}: BaseAdminTableProps<T>) {
  const [searchText, setSearchText] = useState('');
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});
  const [filteredData, setFilteredData] = useState<T[]>(data);

  // Update filtered data when data or filters change
  useEffect(() => {
    let filtered = [...data];

    // Apply search
    if (searchText) {
      filtered = filtered.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(searchText.toLowerCase()),
        ),
      );
    }

    // Apply filters
    Object.entries(filterValues).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        filtered = filtered.filter(item => {
          const itemValue = (item as any)[key];
          return (
            String(itemValue).toLowerCase() === String(value).toLowerCase()
          );
        });
      }
    });

    setFilteredData(filtered);
  }, [data, searchText, filterValues]);

  const handleDelete = async (record: T) => {
    try {
      if (onDelete) {
        await onDelete(record);
        message.success('Xóa thành công');
      }
    } catch (error) {
      message.error('Có lỗi xảy ra khi xóa');
    }
  };

  const actionColumns: ColumnsType<T> = [
    {
      title: 'Thao tác',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space size="small">
          {onView && (
            <Tooltip title="Xem chi tiết">
              <Button
                type="text"
                size="small"
                icon={<Eye className="w-4 h-4" />}
                onClick={() => onView(record)}
                className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              />
            </Tooltip>
          )}
          {onEdit && (
            <Tooltip title="Chỉnh sửa">
              <Button
                type="text"
                size="small"
                icon={<Edit className="w-4 h-4" />}
                onClick={() => onEdit(record)}
                className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
              />
            </Tooltip>
          )}
          {onDelete && (
            <Tooltip title="Xóa">
              <Popconfirm
                title="Bạn có chắc chắn muốn xóa?"
                description="Hành động này không thể hoàn tác."
                onConfirm={() => handleDelete(record)}
                okText="Xóa"
                cancelText="Hủy"
              >
                <Button
                  type="text"
                  size="small"
                  danger
                  icon={<Delete className="w-4 h-4" />}
                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                />
              </Popconfirm>
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  const allColumns = [...columns, ...actionColumns];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Title level={3} className="!mb-0 text-slate-800 dark:text-slate-200">
          {title}
        </Title>
        <Space>
          {onRefresh && (
            <Button
              icon={<RefreshCw className="w-4 h-4" />}
              onClick={onRefresh}
              loading={loading}
              className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600"
            >
              Làm mới
            </Button>
          )}
          {onCreate && (
            <Button
              type="primary"
              icon={<Plus className="w-4 h-4" />}
              onClick={onCreate}
              className="bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600"
            >
              Tạo mới
            </Button>
          )}
        </Space>
      </div>

      {/* Filters and Search */}
      <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex flex-wrap gap-4 items-end">
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <Input
              placeholder={searchPlaceholder}
              prefix={
                <Search className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              }
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              allowClear
              className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 hover:border-slate-300 dark:hover:border-slate-500 focus:border-blue-500 dark:focus:border-blue-400"
            />
          </div>

          {/* Filters */}
          {filters.map(filter => (
            <div key={filter.key} className="min-w-[150px]">
              <Select
                placeholder={filter.label}
                value={filterValues[filter.key]}
                onChange={value =>
                  setFilterValues(prev => ({ ...prev, [filter.key]: value }))
                }
                allowClear
                style={{ width: '100%' }}
                className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100 hover:border-slate-300 dark:hover:border-slate-500 focus:border-blue-500 dark:focus:border-blue-400"
                dropdownClassName="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 dark:shadow-lg"
              >
                {filter.options.map(option => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </div>
          ))}

          {/* Clear filters */}
          {(searchText ||
            Object.values(filterValues).some(
              v => v !== undefined && v !== null && v !== '',
            )) && (
            <Button
              onClick={() => {
                setSearchText('');
                setFilterValues({});
              }}
              className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600"
            >
              Xóa bộ lọc
            </Button>
          )}
        </div>
      </Card>

      {/* Table */}
      <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
        <Table
          columns={allColumns}
          dataSource={filteredData}
          loading={loading}
          rowKey="_id"
          pagination={false}
          scroll={{ x: 'max-content' }}
          className="dark:bg-slate-800"
          rowClassName="hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors duration-200"
        />
      </Card>

      {/* Pagination */}
      {pagination && (
        <div className="flex justify-end">
          <Pagination
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={pagination.total}
            onChange={pagination.onChange}
            showSizeChanger
            showQuickJumper
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} của ${total} mục`
            }
            className="dark:text-slate-200"
          />
        </div>
      )}
    </div>
  );
}

export default BaseAdminTable;
