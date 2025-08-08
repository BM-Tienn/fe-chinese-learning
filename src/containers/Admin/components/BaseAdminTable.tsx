import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Table,
  Button,
  Input,
  Select,
  Space,
  notification,
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

  const handleDelete = useCallback(
    async (record: T) => {
      try {
        if (onDelete) {
          await onDelete(record);
          notification.success({
            message: 'Xóa thành công',
          });
        }
      } catch (error) {
        notification.error({
          message: 'Có lỗi xảy ra khi xóa',
        });
      }
    },
    [onDelete],
  );

  const actionColumns: ColumnsType<T> = useMemo(
    () => [
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
                  />
                </Popconfirm>
              </Tooltip>
            )}
          </Space>
        ),
      },
    ],
    [onView, onEdit, onDelete, handleDelete],
  );

  const allColumns = useMemo(
    () => [...columns, ...actionColumns],
    [columns, actionColumns],
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Title level={3} className="!mb-0">
          {title}
        </Title>
        <Space>
          {onRefresh && (
            <Button
              icon={<RefreshCw className="w-4 h-4" />}
              onClick={onRefresh}
              loading={loading}
            >
              Làm mới
            </Button>
          )}
          {onCreate && (
            <Button
              type="primary"
              icon={<Plus className="w-4 h-4" />}
              onClick={onCreate}
            >
              Tạo mới
            </Button>
          )}
        </Space>
      </div>

      {/* Filters and Search */}
      <Card>
        <div className="flex flex-wrap gap-4 items-end">
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <Input
              placeholder={searchPlaceholder}
              prefix={<Search className="w-4 h-4" />}
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              allowClear
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
            >
              Xóa bộ lọc
            </Button>
          )}
        </div>
      </Card>

      {/* Table */}
      <Card>
        <Table
          columns={allColumns}
          dataSource={filteredData}
          loading={loading}
          rowKey="_id"
          pagination={false}
          scroll={{ x: 'max-content' }}
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
          />
        </div>
      )}
    </div>
  );
}

export default BaseAdminTable;
