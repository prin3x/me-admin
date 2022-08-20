import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Image, Input, message, Row } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ADMIN_ROLES, IAdminJWT } from "../../services/admin/admin.model";
import {
  validateAdminRole,
  _loginAdmin,
} from "../../services/admin/admin.service";
import jwt_decode from "jwt-decode";
type Props = {};

function LoginAdmin({}: Props) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function checkAdminDetails(token: string = "") {
    let adminDetails;
    if (!token) {
      adminDetails = validateAdminRole();
    } else {
      adminDetails = jwt_decode(token);
    }
    if(!adminDetails) return;
    if (adminDetails.role === ADMIN_ROLES.USER) return;
    if (adminDetails.role === ADMIN_ROLES.ADMIN) {
      router.push("/carousel");
    }
    if (adminDetails.role === ADMIN_ROLES.SUPER_ADMIN) {
      router.push("/contacts");
    }
    if (adminDetails.role === ADMIN_ROLES.HOST) {
      router.push("/contacts");
    }
  }

  async function loginUser(user: any) {
    setIsLoading(true);
    try {
      const { data } = await _loginAdmin(user);
      localStorage.setItem("token", data.accessToken);
      message.success("เข้าสู่ระบบ");
      checkAdminDetails(data.accessToken);
    } catch (e) {
      message.error("กรุณาตรวจสอบข้อมูลของท่าน");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    checkAdminDetails();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Row justify="center" className="mt-10 w-full">
        <Col lg={6}>
          <Form form={form} onFinish={loginUser}>
            <Form.Item name="username">
              <Input
                prefix={<UserOutlined style={{ color: "#fca125" }} />}
                className="border-primary-color"
                type="username"
                placeholder="username"
              />
            </Form.Item>
            <Form.Item name="password">
              <Input
                prefix={<KeyOutlined style={{ color: "#fca125" }} />}
                className="border-primary-color"
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Row justify="center">
              <Form.Item>
                <Button
                  size="large"
                  loading={isLoading}
                  htmlType="submit"
                  type="primary"
                >
                  <span className="font-bold">Sign In</span>
                </Button>
              </Form.Item>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default LoginAdmin;
