import { useState, useCallback } from 'react';

export interface UseModalReturn {
  visible: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  setVisible: (visible: boolean) => void;
}

export const useModal = (initialVisible: boolean = false): UseModalReturn => {
  const [visible, setVisible] = useState(initialVisible);

  const open = useCallback(() => {
    setVisible(true);
  }, []);

  const close = useCallback(() => {
    setVisible(false);
  }, []);

  const toggle = useCallback(() => {
    setVisible(prev => !prev);
  }, []);

  return {
    visible,
    open,
    close,
    toggle,
    setVisible,
  };
};
