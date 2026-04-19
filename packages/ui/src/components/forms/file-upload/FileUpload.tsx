import React, { useId, useState } from "react";
import Label from "../../base/label/Label";
import Icon from "../../base/icon/Icon";
import "./FileUpload.scss";

export interface FileUploadProps {
  /** 선택된 파일 목록 (제어 컴포넌트) */
  files?: File[];
  /** 파일 변경 콜백 */
  onFilesChange?: (files: File[]) => void;
  /** 허용 파일 타입 (e.g. "image/*", ".pdf,.docx") */
  accept?: string;
  /** 다중 선택 허용 */
  multiple?: boolean;
  /** 최대 파일 크기 (bytes) */
  maxSize?: number;
  /** Label 텍스트 */
  label?: string;
  /** 라벨 타입 (none / optional / required) */
  labelType?: "none" | "optional" | "required";
  /** 도움말 메시지 */
  helpMessage?: string;
  /** 에러 상태 */
  error?: boolean;
  /** 비활성화 */
  disabled?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 인라인 스타일 */
  styleOverride?: React.CSSProperties;
}

const FileUpload: React.FC<FileUploadProps> = ({
  files = [],
  onFilesChange,
  accept,
  multiple = true,
  maxSize,
  label,
  labelType = "none",
  helpMessage,
  error = false,
  disabled = false,
  className,
  styleOverride,
}) => {
  const autoId = useId();
  const inputId = `file-upload-${autoId}`;
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = (newFiles: FileList | null) => {
    if (!newFiles || disabled) return;

    let selectedFiles = Array.from(newFiles);

    // maxSize 체크
    if (maxSize) {
      selectedFiles = selectedFiles.filter((file) => file.size <= maxSize);
    }

    // multiple이 false인 경우 첫 번째 파일만 유지
    if (!multiple && selectedFiles.length > 0) {
      selectedFiles = [selectedFiles[0]];
    }

    const newFileList = multiple
      ? [...files, ...selectedFiles]
      : selectedFiles;

    onFilesChange?.(newFileList);
  };

  const handleClick = () => {
    if (disabled) return;
    const input = document.getElementById(inputId) as HTMLInputElement;
    input?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    if (disabled) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (disabled) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleRemoveFile = (index: number) => {
    if (disabled) return;
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange?.(newFiles);
  };

  const wrapperClassNames = [
    "file-upload",
    isDragOver && "file-upload--dragover",
    disabled && "file-upload--disabled",
    error && "file-upload--error",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClassNames} style={styleOverride}>
      {label && (
        <Label type={labelType} size="md">
          {label}
        </Label>
      )}

      <div
        className="file-upload__zone"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
      >
        <input
          id={inputId}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleInputChange}
          style={{ display: "none" }}
          aria-hidden="true"
        />

        <Icon name="upload-cloud" size={32} className="file-upload__icon" />

        <div className="file-upload__text">
          <span className="file-upload__text-main">
            파일을 여기에 드롭하세요
          </span>
          <span className="file-upload__text-sub">
            또는 클릭하여 선택
          </span>
        </div>

        {maxSize && (
          <div className="file-upload__hint">
            최대 파일 크기: {(maxSize / 1024 / 1024).toFixed(2)}MB
          </div>
        )}
      </div>

      {files.length > 0 && (
        <div className="file-upload__list">
          {files.map((file, index) => (
            <div key={`${file.name}-${index}`} className="file-upload__item">
              <div className="file-upload__item-name">{file.name}</div>
              <button
                type="button"
                className="file-upload__item-remove"
                onClick={() => handleRemoveFile(index)}
                disabled={disabled}
                aria-label={`${file.name} 삭제`}
              >
                <Icon name="x" size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {helpMessage && (
        <div className={`file-upload__help ${error ? "file-upload__help--error" : "file-upload__help--normal"}`}>
          {error && <Icon name="circle-x" size={16} />}
          <span className="file-upload__help-text">{helpMessage}</span>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
