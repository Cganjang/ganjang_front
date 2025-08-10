import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Link from './Link';

const meta: Meta<typeof Link> = {
  title: 'Base/Link',
  component: Link,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Link 컴포넌트는 사용자가 다른 페이지나 섹션으로 이동할 수 있도록 하는 네비게이션 요소입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: '링크에 표시될 텍스트',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: '링크의 타입',
    },
    linkStyle: {
      control: 'select',
      options: ['underline', 'standalone'],
      description: '링크의 스타일',
    },
    leadingIcon: {
      control: 'select',
      options: [undefined, 'heart', 'user', 'info'],
      description: '앞쪽에 표시될 아이콘',
    },
    trailingIcon: {
      control: 'select',
      options: [undefined, 'chevron-right', 'x', 'check'],
      description: '뒤쪽에 표시될 아이콘',
    },
    disabled: {
      control: 'boolean',
      description: '비활성 상태',
    },
    href: {
      control: 'text',
      description: '링크 URL',
    },
    target: {
      control: 'select',
      options: [undefined, '_blank', '_self', '_parent', '_top'],
      description: '링크 타겟',
    },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리들
export const PrimaryUnderline: Story = {
  args: {
    children: 'Primary Link',
    variant: 'primary',
    linkStyle: 'underline',
    href: '#',
  },
};

export const PrimaryStandalone: Story = {
  args: {
    children: 'Primary Link',
    variant: 'primary',
    linkStyle: 'standalone',
    href: '#',
  },
};

export const SecondaryUnderline: Story = {
  args: {
    children: 'Secondary Link',
    variant: 'secondary',
    linkStyle: 'underline',
    href: '#',
  },
};

export const SecondaryStandalone: Story = {
  args: {
    children: 'Secondary Link',
    variant: 'secondary',
    linkStyle: 'standalone',
    href: '#',
  },
};

// 아이콘이 있는 링크들
export const WithLeadingIcon: Story = {
  args: {
    children: 'Link with Icon',
    variant: 'primary',
    linkStyle: 'underline',
    leadingIcon: 'heart',
    href: '#',
  },
};

export const WithTrailingIcon: Story = {
  args: {
    children: 'Link with Icon',
    variant: 'primary',
    linkStyle: 'underline',
    trailingIcon: 'chevron-right',
    href: '#',
  },
};

export const WithBothIcons: Story = {
  args: {
    children: 'Link with Both Icons',
    variant: 'primary',
    linkStyle: 'standalone',
    leadingIcon: 'heart',
    trailingIcon: 'chevron-right',
    href: '#',
  },
};

// 상태별 스토리들
export const Disabled: Story = {
  args: {
    children: 'Disabled Link',
    variant: 'primary',
    linkStyle: 'underline',
    disabled: true,
    href: '#',
  },
};

export const ExternalLink: Story = {
  args: {
    children: 'External Link',
    variant: 'primary',
    linkStyle: 'underline',
    href: 'https://example.com',
    target: '_blank',
  },
};

// 모든 조합 보기
export const AllVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>Primary Links</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Link variant="primary" linkStyle="underline" href="#">Primary Underline</Link>
          <Link variant="primary" linkStyle="standalone" href="#">Primary Standalone</Link>
          <Link variant="primary" linkStyle="underline" leadingIcon="heart" href="#">With Leading Icon</Link>
          <Link variant="primary" linkStyle="underline" trailingIcon="chevron-right" href="#">With Trailing Icon</Link>
          <Link variant="primary" linkStyle="underline" disabled href="#">Disabled Primary</Link>
        </div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>Secondary Links</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Link variant="secondary" linkStyle="underline" href="#">Secondary Underline</Link>
          <Link variant="secondary" linkStyle="standalone" href="#">Secondary Standalone</Link>
          <Link variant="secondary" linkStyle="underline" leadingIcon="heart" href="#">With Leading Icon</Link>
          <Link variant="secondary" linkStyle="underline" trailingIcon="chevron-right" href="#">With Trailing Icon</Link>
          <Link variant="secondary" linkStyle="underline" disabled href="#">Disabled Secondary</Link>
        </div>
      </div>
    </div>
  ),
};

// 실제 사용 예시
export const UsageExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px', maxWidth: '400px' }}>
      <p style={{ margin: 0, lineHeight: 1.6 }}>
        이것은 일반적인 문단입니다. 여기에 {' '}
        <Link variant="primary" linkStyle="underline" href="#">인라인 링크</Link>
        {' '}가 포함되어 있습니다. 또한 {' '}
        <Link variant="secondary" linkStyle="underline" href="#">보조 링크</Link>
        {' '}도 있습니다.
      </p>
      
      <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
        <Link variant="primary" linkStyle="standalone" trailingIcon="chevron-right" href="#">
          더 보기
        </Link>
        <Link variant="secondary" linkStyle="standalone" href="#">
          취소
        </Link>
      </div>
    </div>
  ),
};