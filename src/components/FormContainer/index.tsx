/* eslint-disable no-template-curly-in-string */
import React from 'react';
import { Form, FormInstance } from 'antd';

export interface FormContainerProps {
  form?: FormInstance;
  onFinish?: (values: any) => void | Promise<void>;
  initialValues?: any;
  loading?: boolean;
  validateMessages?: any;
  layout?: 'horizontal' | 'vertical' | 'inline';
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const FormContainer: React.FC<FormContainerProps> = ({
  form,
  onFinish,
  initialValues,
  loading = false,
  validateMessages,
  layout = 'vertical',
  children,
  className = '',
  style,
}) => {
  const [formInstance] = Form.useForm(form);

  const handleFinish = async (values: any) => {
    if (onFinish) {
      await onFinish(values);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-5">
      <Form
        form={formInstance}
        layout={layout}
        initialValues={initialValues}
        onFinish={handleFinish}
        className={`form-container ${className}`}
        validateMessages={{
          ...{
            required: '${label} không được để trống',
            string: {
              len: '${label} phải có đúng ${len} ký tự',
              min: '${label} phải có ít nhất ${min} ký tự',
              max: '${label} không được dài hơn ${max} ký tự',
              range: '${label} phải có từ ${min} đến ${max} ký tự',
            },
            types: {
              email: '${label} không đúng định dạng email',
              number: '${label} không đúng định dạng số',
              string: '${label} không đúng định dạng',
              date: '${label} không đúng định dạng ngày',
              method: '${label} không đúng định dạng',
              array: '${label} không đúng định dạng mảng',
              object: '${label} không đúng định dạng object',
              boolean: '${label} không đúng định dạng boolean',
              integer: '${label} không đúng định dạng số nguyên',
              float: '${label} không đúng định dạng số thập phân',
              regexp: '${label} không đúng định dạng regexp',
              url: '${label} không đúng định dạng URL',
              hex: '${label} không đúng định dạng hex',
            },
            number: {
              len: '${label} phải bằng ${len}',
              min: '${label} không được nhỏ hơn ${min}',
              max: '${label} không được lớn hơn ${max}',
              range: '${label} phải từ ${min} đến ${max}',
            },
            array: {
              len: '${label} phải có đúng ${len} phần tử',
              min: '${label} không được ít hơn ${min} phần tử',
              max: '${label} không được nhiều hơn ${max} phần tử',
              range: '${label} phải có từ ${min} đến ${max} phần tử',
            },
            pattern: {
              mismatch: '${label} không khớp với định dạng ${pattern}',
            },
            enum: '${label} phải là một trong [${enum}]',
            whitespace: '${label} không được để trống',
            date: {
              format: '${label} không đúng định dạng ngày',
              parse: '${label} không thể parse thành ngày',
              invalid: '${label} không phải ngày hợp lệ',
            },
          },
          ...validateMessages,
        }}
        style={{ display: 'flex', flexFlow: 'column', gap: '10px', ...style }}
      >
        {children}
      </Form>
    </div>
  );
};

export default FormContainer;
