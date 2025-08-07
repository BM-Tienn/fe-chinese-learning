import { store } from '../store/configureStore';
import { notify } from 'reapop';

export const showNotification = {
  success: (title: string, message?: string) => {
    store.dispatch(
      notify({
        title,
        message,
        status: 'success',
      }),
    );
  },

  error: (title: string, message?: string) => {
    store.dispatch(
      notify({
        title,
        message,
        status: 'error',
      }),
    );
  },

  warning: (title: string, message?: string) => {
    store.dispatch(
      notify({
        title,
        message,
        status: 'warning',
      }),
    );
  },

  info: (title: string, message?: string) => {
    store.dispatch(
      notify({
        title,
        message,
        status: 'info',
      }),
    );
  },
};

// Common notification messages
export const notifications = {
  login: {
    success: () =>
      showNotification.success(
        'Đăng nhập thành công!',
        'Chào mừng bạn quay trở lại!',
      ),
    error: () =>
      showNotification.error(
        'Đăng nhập thất bại!',
        'Email hoặc mật khẩu không đúng!',
      ),
    systemError: () =>
      showNotification.error(
        'Lỗi hệ thống!',
        'Có lỗi xảy ra, vui lòng thử lại sau!',
      ),
  },

  register: {
    success: () =>
      showNotification.success(
        'Đăng ký thành công!',
        'Vui lòng kiểm tra email để xác thực tài khoản.',
      ),
    error: () =>
      showNotification.error(
        'Đăng ký thất bại!',
        'Có lỗi xảy ra, vui lòng thử lại sau!',
      ),
  },

  course: {
    enrolled: () => showNotification.success('Đăng ký khóa học thành công!'),
    completed: () =>
      showNotification.success(
        'Hoàn thành khóa học!',
        'Chúc mừng bạn đã hoàn thành khóa học!',
      ),
  },

  lesson: {
    completed: () =>
      showNotification.success(
        'Hoàn thành bài học!',
        'Bạn đã hoàn thành bài học này!',
      ),
    saved: () => showNotification.success('Lưu tiến độ thành công!'),
  },

  flashcard: {
    mastered: () =>
      showNotification.success('Thuộc từ vựng!', 'Bạn đã thuộc từ vựng này!'),
    reviewed: () => showNotification.success('Ôn tập thành công!'),
  },

  general: {
    saved: () => showNotification.success('Lưu thành công!'),
    deleted: () => showNotification.success('Xóa thành công!'),
    updated: () => showNotification.success('Cập nhật thành công!'),
    error: (message?: string) =>
      showNotification.error(
        'Có lỗi xảy ra!',
        message || 'Vui lòng thử lại sau!',
      ),
  },
};
