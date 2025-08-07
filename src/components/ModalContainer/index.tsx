import React from 'react';
import { Modal, Button, Space } from 'antd';
import { X } from 'lucide-react';
import type { ModalProps } from 'antd';

export interface CommonModalProps extends Omit<ModalProps, 'footer'> {
  // Custom props
  title?: string | React.ReactNode;
  children: React.ReactNode;
  visible: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
  loading?: boolean;
  width?: number | string;
  centered?: boolean;
  maskClosable?: boolean;
  destroyOnClose?: boolean;

  // Custom footer
  showFooter?: boolean;
  customFooter?: React.ReactNode;

  // Size variants
  size?: 'small' | 'medium' | 'large' | 'xl';

  // Style variants
  variant?: 'default' | 'danger' | 'success' | 'warning';

  // Additional props
  className?: string;
  bodyClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
}

const CommonModal: React.FC<CommonModalProps> = ({
  title,
  children,
  visible,
  onOk,
  onCancel,
  okText = 'Xác nhận',
  cancelText = 'Hủy',
  loading = false,
  width,
  centered = true,
  maskClosable = false,
  destroyOnClose = true,
  showFooter = true,
  customFooter,
  size = 'medium',
  variant = 'default',
  className = '',
  bodyClassName = '',
  headerClassName = '',
  footerClassName = '',
  ...restProps
}) => {
  // Size mapping
  const getSizeWidth = () => {
    if (width) return width;

    switch (size) {
      case 'small':
        return 480;
      case 'medium':
        return 600;
      case 'large':
        return 800;
      case 'xl':
        return 1000;
      default:
        return 600;
    }
  };

  // Variant mapping for button colors
  const getVariantStyles = () => {
    switch (variant) {
      case 'danger':
        return {
          okButtonProps: { danger: true },
          okText: okText || 'Xóa',
        };
      case 'success':
        return {
          okButtonProps: { type: 'primary' as const },
          okText: okText || 'Lưu',
        };
      case 'warning':
        return {
          okButtonProps: { type: 'primary' as const },
          okText: okText || 'Cập nhật',
        };
      default:
        return {
          okButtonProps: { type: 'primary' as const },
          okText: okText || 'Xác nhận',
        };
    }
  };

  const variantStyles = getVariantStyles();

  // Default footer
  const defaultFooter = (
    <Space>
      <Button onClick={onCancel} disabled={loading}>
        {cancelText}
      </Button>
      {onOk && (
        <Button
          onClick={onOk}
          loading={loading}
          {...variantStyles.okButtonProps}
        >
          {variantStyles.okText}
        </Button>
      )}
    </Space>
  );

  return (
    <Modal
      title={title}
      open={visible}
      onCancel={onCancel}
      width={getSizeWidth()}
      centered={centered}
      maskClosable={maskClosable}
      destroyOnClose={destroyOnClose}
      footer={showFooter ? customFooter || defaultFooter : null}
      className={`common-modal ${className}`}
      styles={{
        content: {
          backgroundColor: 'var(--ant-color-bg-container)',
          borderRadius: '12px',
          border: '1px solid var(--ant-color-border)',
          boxShadow:
            '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        },
        header: {
          backgroundColor: 'var(--ant-color-bg-container)',
          borderBottom: '1px solid var(--ant-color-border)',
          borderRadius: '12px 12px 0 0',
          padding: '20px 24px',
        },
        body: {
          backgroundColor: 'var(--ant-color-bg-container)',
          padding: '24px',
          color: 'var(--ant-color-text)',
        },
        footer: {
          backgroundColor: 'var(--ant-color-bg-container)',
          borderTop: '1px solid var(--ant-color-border)',
          borderRadius: '0 0 12px 12px',
          padding: '16px 24px',
        },
        mask: {
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
        },
      }}
      closeIcon={
        <X className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors" />
      }
      {...restProps}
    >
      <div className="common-modal-content">{children}</div>
    </Modal>
  );
};

export default CommonModal;
