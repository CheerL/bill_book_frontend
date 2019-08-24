const initUser = {
  id: '001',
  username: 'cheer',
  nickname: 'Cheer.L',
  avatar: 'default',
  jwt: 'aaa',
  login: false
}

const UserStoreCreater = initValue => {
  const store = {
    id: initValue.id,
    username: initValue.username,
    nickname: initValue.nickname,
    avatar: initValue.avatar,
    jwt: initValue.jwt,
    login: initValue.login,

    loginFunc(user) {
      this.id = user.id
      this.nickname = user.nickname
      this.username = user.username
      this.avatar = user.avatar
      this.jwt = user.jwt
      this.login = true
    },
    logoutFunc() {
      this.id = ''
      this.nickname = ''
      this.username = ''
      this.avatar = ''
      this.jwt = ''
      this.login = false
    }
  }
  return store
}

export default UserStoreCreater(initUser)