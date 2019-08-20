import React, { useState } from "react";
import { TabBar } from "antd-mobile";
import { Icon } from 'antd'
import { useRouter } from "../../common/router";
import "./index.css";

export const Layout = ({ children }) => {
  const router = useRouter();
  const location = router.location.pathname.split('/')[1]
  const tabs = [
    { title: "账户", key: "account", icon: "wallet"},
    { title: "账本", key: "bill", icon: "account-book" },
    { title: "我的", key: "mine", icon: "user" }
  ];

  const handleTabPress = key => () => {
    setSelected(key);
    router.history.push(`/${key}`);
  };
  const [selected, setSelected] = useState(location)

  return (<div className='layout-body-box'>
    <TabBar>
      {tabs.map(tab => (
        <TabBar.Item
          title={tab.title}
          key={tab.key}
          icon={<Icon type={tab.icon} className='layout-icon'/>}
          selectedIcon={<Icon type={tab.icon} className='layout-icon layout-icon-selected'/>}
          onPress={handleTabPress(tab.key)}
          selected={selected === tab.key}
        >
          {selected === tab.key ? children : null}
        </TabBar.Item>
      ))}
    </TabBar></div>
  );
};
