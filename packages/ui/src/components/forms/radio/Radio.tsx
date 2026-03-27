import React, { useId } from "react";
import "./Radio.scss";

export interface RadioProps {
  /** 라디오 버튼 라벨 텍스트 */
  label?: React.ReactNode;
  /** 라디오 버튼 값 */
  value: string;
  /** 라디오 그룹 이름 */
  name?: string;
  /** 선택 상태 */
  checked?: boolean;
  /** 기본 선택 상태 (비제어) */
  defaultChecked?: boolean;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 라디오 크기 */
  size?: "sm" | "md" | "lg";
  /** 변경 이벤트 핸들러 */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 인라인 스타일 */
  styleOverride?: React.CSSProperties;
}

const Radio: React.FC<RadioProps> = ({
  label,
  value,
  name,
  checked,
  defaultChecked,
  disabled = false,
  size = "md",
  onChange,
  className,
  styleOverride,
}) => {
  const instanceId = useId();
  const safeValue = String(value).replace(/[^a-zA-Z0-9_-]/g, "_");
  const inputId = `radio-${instanceId.replace(/:/g, "")}_v_${safeValue}`;

  const classNames = [
    "radio",
    `radio--${size}`,
    disabled && "radio--disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const isControlled = checked !== undefined;

  return (
    <label
      className={classNames}
      style={styleOverride}
      htmlFor={inputId}
    >
      <input
        id={inputId}
        className="radio__input"
        type="radio"
        name={name}
        value={value}
        {...(isControlled
          ? { checked }
          : defaultChecked !== undefined
            ? { defaultChecked }
            : {})}
        disabled={disabled}
        onChange={onChange}
        aria-disabled={disabled}
      />
      <span className="radio__indicator" aria-hidden="true" />
      {label && <span className="radio__label">{label}</span>}
    </label>
  );
};

export default Radio;
