import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import FileUpload from "./FileUpload";

const meta = {
  title: "Forms/FileUpload",
  component: FileUpload,
  decorators: [
    (Story, context) => {
      const [files, setFiles] = React.useState<File[]>(context.args.files ?? []);
      React.useEffect(
        () => {
          setFiles(context.args.files ?? []);
        },
        [context.args.files],
      );
      return (
        <Story
          args={{
            ...context.args,
            files,
            onFilesChange: setFiles,
          }}
        />
      );
    },
  ],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
파일 업로드 컴포넌트입니다.

**특징:**
- 드래그 앤 드롭 지원
- 클릭으로 파일 선택 지원
- 최대 파일 크기 검증
- 단일/다중 파일 선택 지원
- 파일 목록에서 개별 삭제 가능
- Label 지원 (none/optional/required)
- 도움말 메시지 지원 (normal/error)
- 비활성화 상태 지원
- 에러 상태 지원
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    files: {
      control: false,
      description: "선택된 파일 목록 (제어 컴포넌트)",
    },
    onFilesChange: {
      action: "filesChanged",
      description: "파일 변경 콜백",
    },
    accept: {
      control: { type: "text" },
      description: "허용 파일 타입 (e.g. image/*, .pdf,.docx)",
    },
    multiple: {
      control: { type: "boolean" },
      description: "다중 선택 허용",
    },
    maxSize: {
      control: { type: "number" },
      description: "최대 파일 크기 (bytes)",
    },
    label: {
      control: { type: "text" },
      description: "Label 텍스트",
    },
    labelType: {
      control: { type: "select" },
      options: ["none", "optional", "required"],
      description: "라벨 타입",
    },
    helpMessage: {
      control: { type: "text" },
      description: "도움말 메시지",
    },
    error: {
      control: { type: "boolean" },
      description: "에러 상태",
    },
    disabled: {
      control: { type: "boolean" },
      description: "비활성화",
    },
    className: {
      control: false,
      description: "추가 CSS 클래스",
    },
    styleOverride: {
      control: false,
      description: "인라인 스타일",
    },
  },
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 기본 상태
export const Default: Story = {
  args: {
    label: "파일 업로드",
    labelType: "none",
    multiple: true,
    helpMessage: "파일을 드래그하거나 클릭하여 선택하세요",
  },
};

// 2. 파일 목록이 있는 상태
export const WithFiles: Story = {
  args: {
    label: "파일 업로드",
    labelType: "none",
    multiple: true,
    helpMessage: "파일을 드래그하거나 클릭하여 선택하세요",
    files: [
      new File(["content"], "document.pdf", { type: "application/pdf" }),
      new File(["content"], "image.jpg", { type: "image/jpeg" }),
      new File(["content"], "spreadsheet.xlsx", {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }),
    ],
  },
};

// 3. 라벨 타입 변형
export const WithLabelTypes: Story = {
  args: {},
  render: () => (
    <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
      <FileUpload
        label="선택사항"
        labelType="optional"
        helpMessage="파일을 선택하세요"
      />
      <FileUpload
        label="필수"
        labelType="required"
        helpMessage="파일을 반드시 선택해야 합니다"
      />
    </div>
  ),
};

// 4. 비활성화 상태
export const Disabled: Story = {
  args: {
    label: "파일 업로드",
    labelType: "none",
    disabled: true,
    helpMessage: "현재 파일 업로드가 비활성화되었습니다",
  },
};

// 5. 에러 상태
export const WithError: Story = {
  args: {
    label: "파일 업로드",
    labelType: "none",
    error: true,
    helpMessage: "지원하지 않는 파일 형식입니다",
  },
};

// 6. 파일 크기 제한
export const WithMaxSize: Story = {
  args: {
    label: "이미지 업로드",
    labelType: "optional",
    accept: "image/*",
    multiple: true,
    maxSize: 5 * 1024 * 1024, // 5MB
    helpMessage: "5MB 이하의 이미지만 업로드 가능합니다",
  },
};

// 7. 단일 파일 선택
export const SingleFile: Story = {
  args: {
    label: "프로필 사진",
    labelType: "required",
    accept: "image/*",
    multiple: false,
    helpMessage: "하나의 이미지만 선택할 수 있습니다",
  },
};

// 8. 사용 예시
export const UsageExample: Story = {
  args: {},
  render: () => {
    const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([]);
    const [uploadError, setUploadError] = React.useState(false);

    const handleFilesChange = (newFiles: File[]) => {
      setUploadedFiles(newFiles);
      setUploadError(false);
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <FileUpload
          label="문서 업로드"
          labelType="required"
          accept=".pdf,.doc,.docx,.xls,.xlsx"
          multiple={true}
          maxSize={10 * 1024 * 1024} // 10MB
          files={uploadedFiles}
          onFilesChange={handleFilesChange}
          error={uploadError}
          helpMessage={
            uploadError
              ? "파일 업로드에 실패했습니다"
              : "PDF, DOC, DOCX, XLS, XLSX 파일만 업로드 가능합니다 (최대 10MB)"
          }
        />
        <div style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "#f0f0f0", borderRadius: "4px" }}>
          <p style={{ margin: "0 0 0.5rem 0", fontWeight: "bold" }}>
            업로드된 파일: {uploadedFiles.length}개
          </p>
          {uploadedFiles.length > 0 && (
            <ul style={{ margin: 0, paddingLeft: "1.5rem" }}>
              {uploadedFiles.map((file, index) => (
                <li key={`${file.name}-${index}`} style={{ fontSize: "12px" }}>
                  {file.name} ({(file.size / 1024 / 1024).toFixed(2)}MB)
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  },
};
