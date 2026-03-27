import type { Preview } from "@storybook/react-vite";
import "../src/styles/index.scss";

/**
 * 사이드바 정렬 — 함수 대신 `order` 배열만 사용 (Storybook 9 권장, index.json 생성 안정화).
 * @see https://storybook.js.org/docs/writing-stories/naming-components-and-hierarchy#sorting-stories
 */
const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: [
          "Base",
          ["Button", "Divider", "Icon", "Label", "Link"],
          "Forms",
          ["Checkbox", "Input", "Radio", "Select", "Switch", "Textarea"],
          "Data Display",
          "Feedback",
          "Layout",
          "Navigation",
          "Overlay",
        ],
        locales: "ko-KR",
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
