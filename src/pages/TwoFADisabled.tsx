import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import { Button, Space, Typography } from "antd";
import OtpInput from "../components/OtpInput";

const { Text } = Typography;

export default function TwoFADisabled() {
  const [code, setCode] = useState("");
  return (
    <AuthLayout titleText="Two-Factor Authentication">
      <Space
        direction="vertical"
        size={16}
        style={{ width: "100%", alignItems: "center" }}
      >
        <Text>Enter the 6-digit code from the Google Authenticator app</Text>
        <OtpInput value={code} onChange={setCode} />
        <Button size="large" type="default" block disabled>
          Continue
        </Button>
      </Space>
    </AuthLayout>
  );
}
