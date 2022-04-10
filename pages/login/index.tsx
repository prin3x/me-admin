import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Image, Input, message, Row } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { _loginAdmin } from "../../services/admin/admin.service";

type Props = {};

function LoginAdmin({}: Props) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function loginUser(user: any) {
    setIsLoading(true);
    try {
      const { data } = await _loginAdmin(user);
      localStorage.setItem("token", data.accessToken);
      message.success("เข้าสู่ระบบ");
      router.push("/");
    } catch (e) {
      message.error({ title: "กรุณาตรวจสอบข้อมูลของท่านใหม่" });
    } finally {
      setIsLoading(false);
    }
  }

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
