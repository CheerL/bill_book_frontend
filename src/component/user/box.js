import React from "react";
import { Flex, List, Button } from "antd-mobile";
import { useRouter } from '../../router'
import './index.css'

export const UserBox = ({ children, links, title }) => {
  const router = useRouter()
  return (
  <Flex justify="center" align="center" className="user-body-box">
    <Flex direction='column' justify='between' className="user-box">
      <h2>{title}</h2>
      <List>{children}</List>
      <Flex
        justify="around"
        direction="row"
        className="user-link-box"
      >
        {links.map(({ path, text }, index) => (
          <Button
            key={index}
            size='small'
            className='user-link'
            onClick={() => router.history.push(path)}>{text}</Button>
          // <Link to={`/user/${path}`} key={index}>
          //   {text}
          // </Link>
        ))}
      </Flex>
    </Flex>
  </Flex>
)}
