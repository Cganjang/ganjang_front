import React, { useState, useRef, useEffect, useId } from "react";
import Label from "../../base/label/Label";
import Icon from "../../base/icon/Icon";
import "./DatePicker.scss";

export interface DatePickerProps {
  /** 선택된 날짜 (제어 컴포넌트) */
  value?: Date | null;
  /** 기본 선택 날짜 (비제어 컴포넌트) */
  defaultValue?: Date | null;
  /** 날짜 변경 핸들러 */
  onChange?: (date: Date | null) => void;

  /** 플레이스홀더 텍스트 */
  placeholder?: string;

  /**
   * 라벨 텍스트 (Figma: Label)
   * 미지정 시 라벨 숨김
   */
  label?: string;
  /** 라벨 타입 (none / optional / required) */
  labelType?: "none" | "optional" | "required";
  /** 라벨 info 아이콘 표시 여부 */
  isInfoIcon?: boolean;

  /**
   * 도움말 메시지 텍스트 (Figma: HelpMessage)
   * 미지정 시 숨김
   */
  helpMessage?: string;
  /** 도움말 메시지 타입 */
  helpMessageType?: "normal" | "success" | "error";

  /** 비활성화 여부 */
  disabled?: boolean;
  /** 에러 상태 */
  error?: boolean;

  /** 추가 CSS 클래스 */
  className?: string;
  /** 인라인 스타일 */
  styleOverride?: React.CSSProperties;
}

const DAYS_OF_WEEK = ["일", "월", "화", "수", "목", "금", "토"];

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}.${m}.${d}`;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function getCalendarDays(year: number, month: number): (Date | null)[] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days: (Date | null)[] = [];

  // 앞 빈 칸
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // 이번 달 날짜
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(new Date(year, month, d));
  }

  // 뒤 빈 칸 (6주 고정)
  while (days.length < 42) {
    days.push(null);
  }

  return days;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  defaultValue,
  onChange,
  placeholder = "날짜 선택",
  label,
  labelType = "none",
  isInfoIcon = false,
  helpMessage,
  helpMessageType = "normal",
  disabled = false,
  error = false,
  className,
  styleOverride,
}) => {
  useId(); // autoId reserved for accessibility (aria-labelledby etc.)

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<Date | null>(
    () => defaultValue ?? null,
  );

  const currentValue = value !== undefined ? value : internalValue;

  const [viewYear, setViewYear] = useState(
    () => currentValue?.getFullYear() ?? today.getFullYear(),
  );
  const [viewMonth, setViewMonth] = useState(
    () => currentValue?.getMonth() ?? today.getMonth(),
  );

  const wrapperRef = useRef<HTMLDivElement>(null);

  const isFilled = currentValue != null;
  const resolvedHelpType = error ? "error" : helpMessageType;

  const wrapperClassNames = [
    "date-picker",
    isOpen && "date-picker--open",
    isFilled && !isOpen && "date-picker--filled",
    disabled && "date-picker--disabled",
    error && "date-picker--error",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // 외부 클릭 시 닫기
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  const toggleCalendar = () => {
    if (disabled) return;
    if (!isOpen) {
      setViewYear(currentValue?.getFullYear() ?? today.getFullYear());
      setViewMonth(currentValue?.getMonth() ?? today.getMonth());
    }
    setIsOpen((prev) => !prev);
  };

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleSelectDay = (date: Date) => {
    const isAlreadySelected = currentValue && isSameDay(currentValue, date);
    const next = isAlreadySelected ? null : date;

    if (value === undefined) {
      setInternalValue(next);
    }
    onChange?.(next);
    setIsOpen(false);
  };

  const calendarDays = getCalendarDays(viewYear, viewMonth);

  return (
    <div ref={wrapperRef} className={wrapperClassNames} style={styleOverride}>
      {label && (
        <Label type={labelType} size="md" isInfoIcon={isInfoIcon}>
          {label}
        </Label>
      )}

      {/* Trigger */}
      <button
        type="button"
        className="date-picker__trigger"
        onClick={toggleCalendar}
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <span
          className={`date-picker__value ${!isFilled ? "date-picker__value--placeholder" : ""}`}
        >
          {isFilled ? formatDate(currentValue!) : placeholder}
        </span>
        <span className="date-picker__icon">
          <Icon name="calendar" size={16} />
        </span>
      </button>

      {/* Calendar Popup */}
      {isOpen && (
        <div className="date-picker__calendar" role="dialog" aria-label="날짜 선택 달력">
          {/* Header */}
          <div className="date-picker__calendar-header">
            <button
              type="button"
              className="date-picker__nav-btn"
              onClick={handlePrevMonth}
              aria-label="이전 달"
            >
              <Icon name="chevron-left" size={16} />
            </button>

            <span className="date-picker__calendar-title">
              {viewYear}년 {String(viewMonth + 1).padStart(2, "0")}월
            </span>

            <button
              type="button"
              className="date-picker__nav-btn"
              onClick={handleNextMonth}
              aria-label="다음 달"
            >
              <Icon name="chevron-right" size={16} />
            </button>
          </div>

          {/* Days of week */}
          <div className="date-picker__weekdays">
            {DAYS_OF_WEEK.map((day) => (
              <span
                key={day}
                className={`date-picker__weekday ${day === "일" ? "date-picker__weekday--sun" : ""} ${day === "토" ? "date-picker__weekday--sat" : ""}`}
              >
                {day}
              </span>
            ))}
          </div>

          {/* Date grid */}
          <div className="date-picker__grid">
            {calendarDays.map((date, idx) => {
              if (!date) {
                return <span key={`empty-${idx}`} className="date-picker__day date-picker__day--empty" />;
              }

              const isToday = isSameDay(date, today);
              const isSelected = currentValue != null && isSameDay(date, currentValue);
              const isSunday = date.getDay() === 0;
              const isSaturday = date.getDay() === 6;

              const dayClassNames = [
                "date-picker__day",
                isToday && !isSelected && "date-picker__day--today",
                isSelected && "date-picker__day--selected",
                isSunday && !isSelected && "date-picker__day--sun",
                isSaturday && !isSelected && "date-picker__day--sat",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <button
                  key={date.toISOString()}
                  type="button"
                  className={dayClassNames}
                  onClick={() => handleSelectDay(date)}
                  aria-label={formatDate(date)}
                  aria-pressed={isSelected}
                  aria-current={isToday ? "date" : undefined}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Help message */}
      {helpMessage && (
        <div className={`date-picker__help date-picker__help--${resolvedHelpType}`}>
          {resolvedHelpType === "success" && <Icon name="check" size={16} />}
          {resolvedHelpType === "error" && <Icon name="circle-x" size={16} />}
          <span className="date-picker__help-text">{helpMessage}</span>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
