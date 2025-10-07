import AuthLayout from "../components/AuthLayout";
import { Input, Button, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

export default function LoginFilled() {
  return (
    <AuthLayout titleText="Sign in to your account to continue">
      <Space direction="vertical" size={16} style={{ width: "100%" }}>
        <Input size="large" prefix={<UserOutlined />} value="info@mail.com" />
        <Input.Password
          size="large"
          iconRender={() => <LockOutlined />}
          value="***********"
        />
        <Button size="large" type="primary" block>
          Log in
        </Button>
      </Space>
    </AuthLayout>
  );
}
