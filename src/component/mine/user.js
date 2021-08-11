import React from 'react'
import { Bar, colorSpan } from '../../common'
// import Context from '../../store'
import { useRouter } from '../../router'
import { useUserAction } from '../../action'


const UserDetail = () => {
  // const { user } = Context.useStore()
  const { remove } = useUserAction()
  const router = useRouter()
  const rightContent = [
    {
      value: 'change', content: '修改用户',
      onSelect: () => {
        router.history.push('/mine/change')
      }
    },
    {
      value: 'delete', content: colorSpan('删除用户', 'red'),
      onSelect: () => { remove() }
    }
  ]

  return (
    <>
      <Bar title='用户详情' rightContent={rightContent} />
    </>
  )
}

export default UserDetail