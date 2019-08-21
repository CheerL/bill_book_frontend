import React from 'react'
import Avatar from 'react-avatar'

const UserAvatar = ({ user, className, size='50px'}) => {
  const isDefault = user.avatar === 'default'
  return <Avatar
    size={size}
    className={className}
    name={isDefault ? user.nickname: null}
    src={isDefault ? null:user.avatar}
    round
  />
}

export default UserAvatar