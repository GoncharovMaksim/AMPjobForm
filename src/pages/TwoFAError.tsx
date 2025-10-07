import { useMemo, useState } from "react";
import AuthLayout from "../components/AuthLayout";
import { Button, Space, Typography } from "antd";
import OtpInput from "../components/OtpInput";

const { Text } = Typography;

export default function TwoFAError() {
  const [code, setCode] = useState("");
  const isDisabled = useMemo(() => code.length !== 6, [code]);

  return (
    <AuthLayout titleText="Two-Factor Authentication">
      <Space
        direction="vertical"
        size={8}
        style={{ width: "100%", alignItems: "center" }}
      >
        <Text>Enter the 6-digit code from the Google Authenticator app</Text>
        <OtpInput value={code} onChange={setCode} status="error" />
        <Text type="danger">Invalid code</Text>
        <Button size="large" type="primary" disabled={isDisabled} block>
          Continue
        </Button>
      </Space>
    </AuthLayout>
  );
}
