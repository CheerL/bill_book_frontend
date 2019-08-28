import api from './api'
import Context from '../store'
import { useRouter } from '../router'

import useAccountAction from './account'
import useBillAction from './bill'
import useBillbookAction from './billbook'
import useTransferAction from './transfer'

const useUserAction = () => {
  const { user } = Context.useStore()
  const router = useRouter()
  const { getAccounts } = useAccountAction()
  const { getBills } = useBillAction()
  const { getBillbooks } = useBillbookAction()
  const { getTransfer } = useTransferAction()

  const afterLogin = res => {
    user.loginFunc(res)
    getTransfer()
    getAccounts()
    getBillbooks()
    getBills()
  }

  const login = ({ username, password }) => {
    api.user.login(username, password)
      .then(res => {
        afterLogin(res)
      })
      .catch(console.log)
  }

  const login_jwt = func => {
    api.user.login_jwt()
      .then(res => {
        afterLogin(res)
        func()
      })
      .catch(() => {
        func()
      })
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
  const remove = () => {
    api.user.delete()
    .then(() => {
      user.logoutFunc()
    })
    .catch(console.log)
  }

  return {
    login,
    login_jwt,
    register,
    forget,
    remove
  }
}

export default useUserAction