import React from "react";
import { Flex, List } from "antd-mobile";
import { Link } from "react-router-dom";

export const UserBox = ({ children, links }) => (
  <>
    <List className="user-sub-box">{children}</List>
    <Flex justify="around" wrap="wrap" direction="row" className="user-sub-box">
      {links.map(({ path, text }, index) => (
        <Link to={`/user/${path}`} key={index}>
          {text}
        </Link>
      ))}
    </Flex>
  </>
);
