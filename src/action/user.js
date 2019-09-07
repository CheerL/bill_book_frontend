import api from './api'
import Context from '../store'
import { useRouter } from '../router'

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
    current.loadAll(false)
    api.user.login(username, password)
      .then(res => {
        afterLogin(res)
      })
      .catch(res => {
        console.log(res)
        current.loadAll(true)
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
      .then(logout)
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

  return {
    login,
    login_jwt,
    register,
    forget,
    remove,
    change
  }
}

export default useUserAction