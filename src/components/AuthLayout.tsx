import React from "react";
import { Flex, Typography } from "antd";

const { Text } = Typography;

type AuthLayoutProps = {
  titleText?: string;
  children: React.ReactNode;
};

export default function AuthLayout({ titleText, children }: AuthLayoutProps) {
  return (
    <Flex
      vertical
      align="center"
      justify="center"
      style={{ minHeight: "100vh", background: "#F5F5F5", padding: 24 }}
    >
      <Flex
        vertical
        align="stretch"
        style={{
          width: 440,
          background: "#fff",
          padding: 32,
          borderRadius: 6,
          gap: 24,
        }}
      >
        <Flex vertical align="center" style={{ gap: 4 }}>
          <div
            style={{
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <div
                style={{
                  width: 24,
                  height: 24,
                  background: "#1677FF",
                  borderRadius: 9999,
                }}
              />
              <div
                style={{
                  width: 12,
                  height: 12,
                  background: "#D9D9D9",
                  borderRadius: 9999,
                }}
              />
              <Text strong style={{ marginLeft: 9 }}>
                Company
              </Text>
            </div>
          </div>
          {titleText ? <Text>{titleText}</Text> : null}
        </Flex>

        {children}
      </Flex>
    </Flex>
  );
}
