import React, { ReactElement, useEffect, useState } from "react";
import { Layout, Menu, Breadcrumb, Row, Col, message } from "antd";
import {
  FileOutlined,
  BarsOutlined,
  CalendarOutlined,
  ProfileOutlined,
  ScheduleOutlined,
  ExportOutlined,
  ContainerOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { checkAuth } from "../../services/auth/auth.service";

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
  {
    url: "/service-contact",
    key: "Service Contacts",
  },
  {
    url: "/forms-request",
    key: "Forms Request",
  },
];

function LayoutHOC({ children }: Props): ReactElement {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [adminDetails, setAdminDetails] = useState({ username: "" });

  async function checkAdminId() {
    let res;
    try {
      res = await checkAuth();
      setAdminDetails(res);
    } catch (e) {
      message.error("Unauthorized");
      onLogout();
    }
  }

  // return (
  //   <div style={{backgroundColor: '#faf9f8', minHeight: '100vh'}}>
  //     <Navbar />

  //     {children}
  //   </div>
  // );

  const onCollapse = (collapsed) => {
    setIsCollapsed(collapsed);
  };

  function onLogout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  useEffect(() => {
    checkAdminId();
  }, []);

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
            <div className="my-auto uppercase">
              {adminDetails.username || ""}
            </div>
          </div>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          multiple={false}
          selectedKeys={[router.pathname]}
          className="menu-antd-item"
        >
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
          <Menu.Item key={"/service-contact"} icon={<ContainerOutlined />}>
            <Link href="/service-contact">Service Contacts</Link>
          </Menu.Item>
          <Menu.Item key={"/forms-request"} icon={<DownloadOutlined />}>
            <Link href="/forms-request">Forms Request</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Row align="middle" justify="end" className="h-full">
            <Col span={6} pull={1}>
              <div className="cursor-pointer" onClick={onLogout}>
                <Row align="middle" justify="end" className="h-full">
                  <ExportOutlined style={{ color: "white", fontSize: 20 }} />
                  <div className="text-white font-bold text-2xl uppercase ml-4">
                    Log Out
                  </div>
                </Row>
              </div>
            </Col>
          </Row>
        </Header>
        <Content>
          <div className="w-80 min-w-full">{children}</div>
        </Content>
        <Footer style={{ textAlign: "center", color: "white" }}>
          Design ©2022 Created by Prin3x
        </Footer>
      </Layout>
    </Layout>
  );
}

export default LayoutHOC;
