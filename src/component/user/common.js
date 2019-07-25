import React from "react";
import { Flex, List } from "antd-mobile";
import { Link } from "react-router-dom";

export const UserBox = ({ children, links, title }) => (
  <Flex justify="center" align="center" className="body-box">
    <Flex direction='column' justify='between' className="user-box">
      <h2>{title}</h2>
      <List>{children}</List>
      <Flex
        justify="around"
        direction="row"
        className="user-link"
      >
        {links.map(({ path, text }, index) => (
          <Link to={`/user/${path}`} key={index}>
            {text}
          </Link>
        ))}
      </Flex>
    </Flex>
  </Flex>
);
