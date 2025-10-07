import React from "react";
import { Flex, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

type AuthLayoutProps = {
  titleText?: string;
  children: React.ReactNode;
};

export default function AuthLayout({ titleText, children }: AuthLayoutProps) {
  const navigate = useNavigate();
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
          position: "relative",
        }}
      >
        {/* Стрелка назад в верхнем левом углу */}
        <ArrowLeftOutlined
          style={{
            fontSize: 22,
            cursor: "pointer",
            position: "absolute",
            top: 24,
            left: 24,
            zIndex: 2,
          }}
          onClick={() => navigate(-1)}
        />
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
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: 12,
                    height: 12,
                    background: "#fff",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <Text strong style={{ marginLeft: 9 }}>
                Company
              </Text>
            </div>
          </div>
          {titleText ? (
            <Text
              strong
              style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.2 }}
            >
              {titleText}
            </Text>
          ) : null}
        </Flex>

        {children}
      </Flex>
    </Flex>
  );
}
