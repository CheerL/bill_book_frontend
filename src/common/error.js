import { Toast } from 'antd-mobile'

const useErrorHandle = (getFieldError, filed) => {
  const error = getFieldError(filed)
  const hasError = error.length
  const onErrorClick = () => {
    if (error) {
      Toast.info(error[0].message)
    }
  }
  return {
    error: hasError,
    onErrorClick
  }
}

export default useErrorHandle