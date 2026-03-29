export type ComponentCategory = "base" | "forms" | "data-display" | "feedback" | "layout" | "navigation" | "overlay";

export interface ComponentMeta {
  slug: string;
  name: string;
  category: ComponentCategory;
  description: string;
}

export const componentsMeta: ComponentMeta[] = [
  // Base
  { slug: "button", name: "Button", category: "base", description: "" },
  { slug: "icon", name: "Icon", category: "base", description: "" },
  { slug: "label", name: "Label", category: "base", description: "" },
  { slug: "divider", name: "Divider", category: "base", description: "" },
  { slug: "link", name: "Link", category: "base", description: "" },
  // Forms
  { slug: "input", name: "Input", category: "forms", description: "" },
  { slug: "textarea", name: "Textarea", category: "forms", description: "" },
  { slug: "checkbox", name: "Checkbox", category: "forms", description: "" },
  { slug: "radio", name: "Radio", category: "forms", description: "" },
  { slug: "switch", name: "Switch", category: "forms", description: "" },
  { slug: "select", name: "Select", category: "forms", description: "" },
  // Data Display
  { slug: "avatar", name: "Avatar", category: "data-display", description: "" },
  { slug: "badge", name: "Badge", category: "data-display", description: "" },
  { slug: "card", name: "Card", category: "data-display", description: "" },
  { slug: "chips", name: "Chips", category: "data-display", description: "" },
  { slug: "accordion", name: "Accordion", category: "data-display", description: "" },
  { slug: "carousel", name: "Carousel", category: "data-display", description: "" },
  { slug: "table", name: "Table", category: "data-display", description: "" },
  // Feedback
  { slug: "alert", name: "Alert", category: "feedback", description: "" },
  { slug: "spinner", name: "Spinner", category: "feedback", description: "" },
  { slug: "skeleton", name: "Skeleton", category: "feedback", description: "" },
  { slug: "progress-bar", name: "ProgressBar", category: "feedback", description: "" },
  // Layout
  { slug: "header", name: "Header", category: "layout", description: "" },
  // Navigation
  { slug: "tabs", name: "Tabs", category: "navigation", description: "" },
  { slug: "breadcrumbs", name: "Breadcrumbs", category: "navigation", description: "" },
  { slug: "pagination", name: "Pagination", category: "navigation", description: "" },
  { slug: "side-nav", name: "SideNav", category: "navigation", description: "" },
  { slug: "bottom-nav", name: "BottomNav", category: "navigation", description: "" },
  // Overlay
  { slug: "modal", name: "Modal", category: "overlay", description: "" },
  { slug: "tooltip", name: "Tooltip", category: "overlay", description: "" },
];
