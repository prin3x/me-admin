import React, { ReactElement, useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  FileOutlined,
  BarsOutlined,
  CalendarOutlined,
  ProfileOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";

const { Header, Content, Footer, Sider } = Layout;

interface Props {
  children: ReactElement;
}

const availableSelectedKeys = [
  {
    url: "/carousel",
    key: "Carousel",
  },
  {
    url: "/staff-contact",
    key: "Contacts",
  },
  {
    url: "/calendar",
    key: "Calendar",
  },
  {
    url: "/post",
    key: "Post",
  },
  {
    url: "/meeting-rooms",
    key: "Meeting Rooms",
  },
];

function LayoutHOC({ children }: Props): ReactElement {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState(true);
  // return (
  //   <div style={{backgroundColor: '#faf9f8', minHeight: '100vh'}}>
  //     <Navbar />

  //     {children}
  //   </div>
  // );

  const onCollapse = (collapsed) => {
    setIsCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsed={false} onCollapse={onCollapse}>
        <div className="flex items-center justify-center">
          <div
            className={`${
              !isCollapsed
                ? "flex items-center justify-center text-4xl"
                : "text-xl"
            } w-36 h-36 rounded-full text-white font-bold text-center`}
          >
            {isCollapsed ? (
              <>
                <div className="d-inline w-full">A</div>
                <div className="d-inline w-full">D</div>
                <div className="d-inline w-full">M</div>
                <div className="d-inline w-full">I</div>
                <div className="d-inline w-full">N</div>
              </>
            ) : (
              <div className="my-auto">ADMIN</div>
            )}
          </div>
        </div>
        <Menu theme="dark" mode="inline" multiple={false} selectedKeys={[router.pathname]} className="menu-antd-item">
          <Menu.Item key={"/carousel"} icon={<ProfileOutlined />}>
            <Link href="/carousel">Carousel</Link>
          </Menu.Item>
          <Menu.Item key={"/contacts"} icon={<BarsOutlined />}>
            <Link href="/contacts">Contacts</Link>
          </Menu.Item>
          <Menu.Item key={"/calendar"} icon={<CalendarOutlined />}>
            <Link href="/calendar">Calendar</Link>
          </Menu.Item>
          <Menu.Item key={"/news-editor"} icon={<FileOutlined />}>
            <Link href="/news-editor">Posts</Link>
          </Menu.Item>
          <Menu.Item key={"/meeting-rooms"} icon={<ScheduleOutlined />}>
            <Link href="/meeting-rooms">Meeting Rooms</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content>
          {children}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}

export default LayoutHOC;
