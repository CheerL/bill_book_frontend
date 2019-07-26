import React, { useState } from "react";
import { TabBar } from "antd-mobile";
import { useRouter } from "../../common/router";
import "./index.css";

export const Layout = ({ children }) => {
  const router = useRouter();
  const pathname = router.history.location.pathname
  const tabs = [
    { title: "账户", key: "/account" },
    { title: "账本", key: "/bill" },
    { title: "我的", key: "/mine" }
  ];
  const handleTabPress = key => () => {
    setSelected(key);
    router.history.push(key);
  };
  const [selected, setSelected] = useState(pathname);

  return (<div className='layout-body-box'>
    <TabBar>
      {tabs.map(tab => (
        <TabBar.Item
          title={tab.title}
          key={tab.key}
          icon={<div>{tab.key}</div>}
          selectedIcon={<div>{tab.key}</div>}
          onPress={handleTabPress(tab.key)}
          selected={selected === tab.key}
        >
          {selected === tab.key ? children : null}
        </TabBar.Item>
      ))}
    </TabBar></div>
  );
};
