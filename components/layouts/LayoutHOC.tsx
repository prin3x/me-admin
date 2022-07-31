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
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { checkAuth } from "../../services/auth/auth.service";
import { ADMIN_ROLES, IAdminJWT } from "../../services/admin/admin.model";
import { validateAdminRole } from "../../services/admin/admin.service";
import jwt_decode from "jwt-decode";

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
  {
    url: "/admin-management",
    key: "Admin Management",
  },
];

function LayoutHOC({ children }: Props): ReactElement {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [adminDetails, setAdminDetails] = useState<IAdminJWT>({
    username: "",
    id: 0,
    role: ADMIN_ROLES.USER,
    iat: 0,
  });

  async function checkAdminId() {
    let res;
    try {
      res = validateAdminRole();
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
        <RenderAdminAccess router={router} roles={adminDetails.role} />
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

function RenderAdminAccess({ roles, router }: any) {
  return (
    <Menu
      theme="dark"
      mode="inline"
      multiple={false}
      selectedKeys={[router.pathname]}
      className="menu-antd-item"
    >
      {roles === "admin" ? (
        <>
          <Menu.Item key={"/carousel"} icon={<ProfileOutlined />}>
            <Link href="/carousel" passHref>
              <div className="text-[20px]">Cover</div>
            </Link>
          </Menu.Item>
          <Menu.Item key={"/admin-management"} icon={<UserOutlined />}>
            <Link href="/admin-management" passHref>
              <div className="text-[20px]">Admin Management</div>
            </Link>
          </Menu.Item>
        </>
      ) : roles === "superAdmin" ? (
        <>
          <Menu.Item key={"/carousel"} icon={<ProfileOutlined />}>
            <Link href="/carousel" passHref>
              <div className="text-[20px]">Cover</div>
            </Link>
          </Menu.Item>
          <Menu.Item key={"/contacts"} icon={<BarsOutlined />}>
            <Link href="/contacts" passHref>
              <div className="text-[20px]">Contacts</div>
            </Link>
          </Menu.Item>
          <Menu.Item key={"/calendar"} icon={<CalendarOutlined />}>
            <Link href="/calendar" passHref>
              <div className="text-[20px]">Calendar</div>
            </Link>
          </Menu.Item>
          <Menu.Item key={"/news-editor"} icon={<FileOutlined />}>
            <Link href="/news-editor" passHref>
              <div className="text-[20px]">Posts</div>
            </Link>
          </Menu.Item>
          <Menu.Item key={"/meeting-rooms"} icon={<ScheduleOutlined />}>
            <Link href="/meeting-rooms" passHref>
              <div className="text-[20px]">Meeting Rooms</div>
            </Link>
          </Menu.Item>
          <Menu.Item key={"/service-contact"} icon={<ContainerOutlined />}>
            <Link href="/service-contact" passHref>
              <div className="text-[20px]">Service Contacts</div>
            </Link>
          </Menu.Item>
          <Menu.Item key={"/forms-request"} icon={<DownloadOutlined />}>
            <Link href="/forms-request" passHref>
              <div className="text-[20px]">Forms Request</div>
            </Link>
          </Menu.Item>
          <Menu.Item key={"/admin-management"} icon={<UserOutlined />}>
            <Link href="/admin-management" passHref>
              <div className="text-[20px]">Admin Management</div>
            </Link>
          </Menu.Item>
        </>
      ) : null}
    </Menu>
  );
}

export default LayoutHOC;
