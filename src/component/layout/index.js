import React, { useState } from "react";
import { TabBar } from "antd-mobile";
import { WalletOutlined, AccountBookOutlined, UserOutlined } from '@ant-design/icons'
import { useRouter } from "../../router";
import "./index.css";

export const Layout = ({ children }) => {
  const router = useRouter();
  const location = router.location.pathname.split('/')[1]
  const tabs = [
    { title: "账户", key: "account", icon: WalletOutlined},
    { title: "账本", key: "billbook", icon: AccountBookOutlined },
    { title: "我的", key: "mine", icon: UserOutlined }
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
          icon={<tab.icon className='layout-icon'/>}
          selectedIcon={<tab.icon id={`icon-${tab.key}`} className='layout-icon layout-icon-selected'/>}
          onPress={handleTabPress(tab.key)}
          selected={selected === tab.key}
        >
          {selected === tab.key ? children : null}
        </TabBar.Item>
      ))}
    </TabBar></div>
  );
};
