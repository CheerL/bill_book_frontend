import api from './api'
import Context from '../store'
import { useRouter } from '../router'

const useUserAction = () => {
  const { user } = Context.useStore()
  const router = useRouter()

  const login = ({ username, password }) => {
    api.user.login(username, password)
      .then(res => {
        user.loginFunc(res)
      })
      .catch(console.log)
  }

  const register = ({ username, password, nickname, check_password }) => {
    if (password === check_password) {
      api.user.register(username, password, nickname)
        .then(() => {
          router.history.goBack()
        })
        .catch(console.log)
    }
  }

  const forget = ({ username, password, check_password }) => {
    if (password === check_password) {
      api.user.forget(username, password)
        .then(() => {
          router.history.goBack()
        })
        .catch(console.log)
    }
  }

  return {
    login,
    register,
    forget
  }
}

export default useUserAction