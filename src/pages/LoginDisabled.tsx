import AuthLayout from "../components/AuthLayout";
import { Input, Button, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

export default function LoginDisabled() {
  return (
    <AuthLayout titleText="Sign in to your account to continue">
      <Space direction="vertical" size={16} style={{ width: "100%" }}>
        <Input size="large" prefix={<UserOutlined />} placeholder="Email" />
        <Input.Password
          size="large"
          iconRender={() => <LockOutlined />}
          placeholder="Password"
        />
        <Button size="large" type="default" block disabled>
          Log in
        </Button>
      </Space>
    </AuthLayout>
  );
}
