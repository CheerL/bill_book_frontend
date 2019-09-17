import api from './api'
import Context from '../store'
import { useRouter } from '../router'
import { Toast } from 'antd-mobile'

import useAccountAction from './account'
import useBillAction from './bill'
import useBillbookAction from './billbook'
import useTransferAction from './transfer'
import useCatAction from './cat'
import useRelationAction from './relation'

const useUserAction = () => {
  const { user, current, logout } = Context.useStore()
  const router = useRouter()
  const { getAccounts } = useAccountAction()
  const { getBills } = useBillAction()
  const { getBillbooks } = useBillbookAction()
  const { getTransferbook } = useTransferAction()
  const { getCats } = useCatAction()
  const { getRelation } = useRelationAction()

  const afterLogin = res => {
    user.loginFunc(res)
    getTransferbook()
    getAccounts()
    getBillbooks()
    getBills()
    getCats()
    getRelation()
  }

  const login = ({ username, password }) => {
    api.user.login(username, password)
      .then(res => {
        current.loadAll(false)
        afterLogin(res)
        Toast.success(res.message)
      })
      .catch(res => {
        Toast.fail(res.message)
      })
  }

  const login_jwt = () => {
    api.user.login_jwt()
      .then(res => {
        afterLogin(res)
      })
      .catch(() => {
        localStorage.removeItem('jwt')
        current.loadAll(true)
      })
  }

  const register = ({ username, password, nickname, check_password }) => {
    if (password === check_password) {
      api.user.register(username, password, nickname)
        .then(res => {
          Toast.success(res.message)
          router.history.goBack()
        })
        .catch(res => {
          Toast.fail(res.message)
        })
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
      .then(res => {
        logout()
        Toast.success(res.message)
      })
      .catch(console.log)
  }
  const change = form => {
    api.user.change(form, user.id)
      .then(() => {
        user.nickname = form.nickname
        router.history.goBack()
      })
      .catch(console.log)
  }

  const logoutFunc = () => {
    logout()
    Toast.success('退出成功')
  }

  return {
    login,
    login_jwt,
    register,
    forget,
    remove,
    change,
    logoutFunc
  }
}

export default useUserAction