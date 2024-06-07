import { useSnackbar } from 'notistack';

let useSnackbarRef:any;

export const SnackbarUtilsConfigurator = () => {
  useSnackbarRef = useSnackbar();
  return null;
};

export default {
  success(msg:string) {
    this.toast(msg, 'success');
  },
  warning(msg:string) {
    this.toast(msg, 'warning');
  },
  info(msg:string) {
    this.toast(msg, 'info');
  },
  error(msg:string) {
    this.toast(msg, 'error');
  },
  toast(msg:string, variant = 'default') {
    useSnackbarRef.enqueueSnackbar(msg, {
      variant,
      autoHideDuration: 3000,
      action: () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
    });
  },
};
