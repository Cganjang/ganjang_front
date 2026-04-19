import React, { useState, useId } from "react";
import Label from "../../base/label/Label";
import "./Slider.scss";

export interface SliderProps {
  /** 현재 값 (controlled) */
  value?: number;
  /** 변경 콜백 */
  onChange?: (value: number) => void;
  /** 최솟값 */
  min?: number;
  /** 최댓값 */
  max?: number;
  /** 스텝 */
  step?: number;
  /** 라벨 텍스트 */
  label?: string;
  /** 현재 값 표시 */
  showValue?: boolean;
  /** 값 포맷터 */
  formatValue?: (value: number) => string;
  /** 비활성화 */
  disabled?: boolean;
  /** 에러 상태 */
  error?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 인라인 스타일 */
  styleOverride?: React.CSSProperties;
}

const Slider: React.FC<SliderProps> = ({
  value = 50,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = false,
  formatValue,
  disabled = false,
  error = false,
  className,
  styleOverride,
}) => {
  const autoId = useId();
  const sliderId = `slider-${autoId}`;
  const [internalValue, setInternalValue] = useState(value);

  // value prop이 변경되면 내부 상태 업데이트
  React.useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const newValue = parseFloat(e.target.value);
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  // fill 퍼센트 계산
  const percent = ((internalValue - min) / (max - min)) * 100;
  const displayValue = formatValue ? formatValue(internalValue) : internalValue;

  const wrapperClassNames = [
    "slider",
    disabled && "slider--disabled",
    error && "slider--error",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClassNames} style={styleOverride}>
      {(label || showValue) && (
        <div className="slider__label-row">
          {label && <Label size="md">{label}</Label>}
          {showValue && <span className="slider__value">{displayValue}</span>}
        </div>
      )}

      <div className="slider__track-wrap">
        <div
          className="slider__fill"
          style={
            {
              "--slider-fill-percent": `${percent}%`,
            } as React.CSSProperties
          }
        />
        <input
          id={sliderId}
          className="slider__input"
          type="range"
          min={min}
          max={max}
          step={step}
          value={internalValue}
          onChange={handleChange}
          disabled={disabled}
          aria-disabled={disabled}
          aria-invalid={error}
        />
        <div className="slider__track" />
      </div>
    </div>
  );
};

export default Slider;
