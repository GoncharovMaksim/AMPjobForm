import { useMemo, useState } from "react";
import AuthLayout from "../components/AuthLayout";
import { Button, Space, Typography, Alert } from "antd";
import OtpInput from "../components/OtpInput";
import { useMutation } from "@tanstack/react-query";
import { verifyOtp, ApiError } from "../api/mock";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

export default function TwoFA() {
  const [code, setCode] = useState("");
  const isDisabled = useMemo(() => code.length !== 6, [code]);
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: () => verifyOtp({ code }),
    onSuccess: () => navigate("/"),
  });

  return (
    <AuthLayout titleText="Two-Factor Authentication">
      <Space
        direction="vertical"
        size={16}
        style={{ width: "100%", alignItems: "center" }}
      >
        <Text>Enter the 6-digit code from the Google Authenticator app</Text>
        <OtpInput value={code} onChange={setCode} />
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
          Continue
        </Button>
        <Button size="large" type="default" block>
          Get new
        </Button>
      </Space>
    </AuthLayout>
  );
}
