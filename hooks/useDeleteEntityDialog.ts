import { useCallback, useReducer } from 'react';
import { DeleteEntityDialog } from '@/components';

const ALERT_TIMEOUT = 3000;

interface IState<T> {
  isLoading: boolean;
  isSuccess: boolean;
  showAlert: boolean;
  showDialog: boolean;
  timeoutID?: ReturnType<typeof setTimeout>;
  params: T | null;
}

const reducer = <T>(state: IState<T>, value: Partial<IState<T>>): IState<T> => {
  return { ...state, ...value };
};

interface IDeleteDialog<T> {
  failMessage: string;
  modalTitle: string;
  modalDescription: string;
  successMessage: string;
  onConfirm: (params: IState<T>['params']) => boolean | Promise<boolean>;
}

export function useDeleteEntityDialog<T>({
  failMessage,
  modalDescription,
  modalTitle,
  successMessage,
  onConfirm,
}: IDeleteDialog<T>) {
  const [state, dispatch] = useReducer<(state: IState<T>, value: Partial<IState<T>>) => IState<T>>(
    reducer,
    {
      isLoading: false,
      isSuccess: false,
      showAlert: false,
      showDialog: false,
      params: null,
    },
  );

  const onCancel = () => {
    dispatch({ params: null, showDialog: false });
  };

  const onCloseCallback = useCallback(() => {
    if (state.isLoading) return;

    dispatch({ showDialog: false });
  }, [state.isLoading]);

  const onConfirmCallback = useCallback(async () => {
    clearTimeout(state.timeoutID);
    dispatch({ isLoading: true, showAlert: false });

    try {
      const success = await onConfirm(state.params);
      dispatch({ isSuccess: success });
    } catch (error) {
      dispatch({ isSuccess: false });
    } finally {
      dispatch({ isLoading: false, showDialog: false, showAlert: true });
      const timeoutID = setTimeout(() => {
        dispatch({ showAlert: false });
      }, ALERT_TIMEOUT);
      dispatch({ timeoutID });
    }
  }, [onConfirm, state.params, state.timeoutID]);

  return {
    openDialog: (params: T) => {
      dispatch({ params, showDialog: true });
    },
    DialogComponent: DeleteEntityDialog({
      failMessage,
      isSuccess: state.isSuccess,
      isLoading: state.isLoading,
      modalDescription,
      modalTitle,
      successMessage,
      shouldShowAlert: state.showAlert,
      showDialog: state.showDialog,
      onCancel,
      onCloseModal: onCloseCallback,
      onConfirm: onConfirmCallback,
    }),
  };
}
