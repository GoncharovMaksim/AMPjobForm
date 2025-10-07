import React, { useEffect, useRef } from "react";
import { Input } from "antd";
import type { InputRef } from "antd";

type OtpInputProps = {
  value: string;
  length?: number;
  onChange: (val: string) => void;
  status?: "default" | "error";
};

export default function OtpInput({
  value,
  length = 6,
  onChange,
  status = "default",
}: OtpInputProps) {
  const inputsRef = useRef<Array<InputRef | null>>([]);

  useEffect(() => {
    inputsRef.current = inputsRef.current.slice(0, length);
  }, [length]);

  const handleChangeAt = (index: number, char: string) => {
    const chars = value.split("");
    if (char === "") {
      chars[index] = "";
      onChange(chars.join(""));
      return;
    }
    if (/^[0-9]$/.test(char)) {
      chars[index] = char;
      const next = chars.join("");
      onChange(next);
      const nextIndex = Math.min(index + 1, length - 1);
      inputsRef.current[nextIndex]?.focus?.();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus?.();
    }
    if (e.key === "ArrowLeft" && index > 0)
      inputsRef.current[index - 1]?.focus?.();
    if (e.key === "ArrowRight" && index < length - 1)
      inputsRef.current[index + 1]?.focus?.();
  };

  return (
    <div style={{ display: "flex", gap: 12, width: "100%" }}>
      {Array.from({ length }).map((_, i) => (
        <Input
          key={i}
          value={value[i] ?? ""}
          size="large"
          onChange={(e) => handleChangeAt(i, e.target.value.slice(-1))}
          onKeyDown={(e) => handleKeyDown(i, e)}
          maxLength={1}
          status={status === "error" ? "error" : undefined}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          style={{ textAlign: "center" }}
        />
      ))}
    </div>
  );
}
