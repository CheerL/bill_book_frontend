// const initUser = {
//   id: '001',
//   username: 'cheer',
//   nickname: 'Cheer.L',
//   avatar: 'default',
//   login: false
// }
const initUser = {
  id: '',
  username: '',
  nickname: '',
  avatar: '',
  login: false
}

const UserStoreCreater = initValue => {
  const store = {
    id: initValue.id,
    username: initValue.username,
    nickname: initValue.nickname,
    avatar: initValue.avatar,
    login: initValue.login,
    transfer: undefined,

    loginFunc(user) {
      this.id = user.id
      this.nickname = user.nickname
      this.username = user.username
      this.avatar = user.avatar
      this.login = true
    },
    logoutFunc() {
      this.id = ''
      this.nickname = ''
      this.username = ''
      this.avatar = ''
      this.login = false
      this.transfer = undefined
      localStorage.removeItem('jwt')
    }
  }
  return store
}

export default UserStoreCreater(initUser)