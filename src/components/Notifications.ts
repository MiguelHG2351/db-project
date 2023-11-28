import { toast } from 'react-toastify'

export const successNotification = (successMessage: string) => {
    toast.success(successMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}

export const confirmAccountNotification = (successMessage: string) => {
  toast.info(successMessage, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  })
}

export const errorNotification = (successMessage: string) => {
    toast.error(successMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}