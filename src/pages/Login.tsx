import { useMemo, useState } from "react";
import AuthLayout from "../components/AuthLayout";
import { Input, Button, Space, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { login, ApiError } from "../api/mock";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isDisabled = useMemo(() => !email || !password, [email, password]);
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: () => login({ email, password }),
    onSuccess: (res) => {
      if (res.requires2fa) navigate("/2fa");
    },
  });

  return (
    <AuthLayout titleText="Sign in to your account to continue">
      <Space direction="vertical" size={16} style={{ width: "100%" }}>
        <Input
          size="large"
          placeholder="Email"
          prefix={<UserOutlined />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input.Password
          size="large"
          placeholder="Password"
          prefix={<LockOutlined />}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error ? (
          <Alert type="error" showIcon message={(error as ApiError).message} />
        ) : null}
        <Button
          size="large"
          type="primary"
          disabled={isDisabled}
          loading={isPending}
          block
          onClick={() => mutate()}
        >
          Log in
        </Button>
      </Space>
    </AuthLayout>
  );
}
