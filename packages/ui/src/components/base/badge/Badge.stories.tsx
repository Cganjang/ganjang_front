import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Badge from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Base/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Badge 컴포넌트는 상태 표시, 알림 개수, 카테고리 등을 시각적으로 나타내는 데 사용됩니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['dot', 'number', 'letter'],
      description: '뱃지의 타입',
    },
    status: {
      control: 'select',
      options: ['default', 'information', 'warning', 'success', 'important'],
      description: '뱃지의 상태/색상',
    },
    content: {
      control: 'text',
      description: '표시할 내용 (number, letter 타입일 때 사용)',
    },
    max: {
      control: 'number',
      description: '최대 숫자 (이 값을 초과하면 "99+" 형태로 표시)',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// Dot 타입 스토리들
export const DotDefault: Story = {
  args: {
    type: 'dot',
    status: 'default',
  },
};

export const DotInformation: Story = {
  args: {
    type: 'dot',
    status: 'information',
  },
};

export const DotWarning: Story = {
  args: {
    type: 'dot',
    status: 'warning',
  },
};

export const DotSuccess: Story = {
  args: {
    type: 'dot',
    status: 'success',
  },
};

export const DotImportant: Story = {
  args: {
    type: 'dot',
    status: 'important',
  },
};

// Number 타입 스토리들
export const NumberDefault: Story = {
  args: {
    type: 'number',
    status: 'default',
    content: 5,
  },
};

export const NumberInformation: Story = {
  args: {
    type: 'number',
    status: 'information',
    content: 99,
  },
};

export const NumberOverflow: Story = {
  args: {
    type: 'number',
    status: 'important',
    content: 150,
    max: 99,
  },
};

// Letter 타입 스토리들
export const LetterDefault: Story = {
  args: {
    type: 'letter',
    status: 'default',
    content: 'NEW',
  },
};

export const LetterInformation: Story = {
  args: {
    type: 'letter',
    status: 'information',
    content: 'INFO',
  },
};

export const LetterWarning: Story = {
  args: {
    type: 'letter',
    status: 'warning',
    content: 'WARN',
  },
};

export const LetterSuccess: Story = {
  args: {
    type: 'letter',
    status: 'success',
    content: 'OK',
  },
};

export const LetterImportant: Story = {
  args: {
    type: 'letter',
    status: 'important',
    content: 'HOT',
  },
};

// 모든 타입 비교
export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '16px' }}>Dot Type</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Badge type="dot" status="default" />
          <Badge type="dot" status="information" />
          <Badge type="dot" status="warning" />
          <Badge type="dot" status="success" />
          <Badge type="dot" status="important" />
        </div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '16px' }}>Number Type</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Badge type="number" status="default" content={1} />
          <Badge type="number" status="information" content={99} />
          <Badge type="number" status="warning" content={999} max={99} />
          <Badge type="number" status="success" content={5} />
          <Badge type="number" status="important" content={42} />
        </div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '16px' }}>Letter Type</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Badge type="letter" status="default" content="NEW" />
          <Badge type="letter" status="information" content="INFO" />
          <Badge type="letter" status="warning" content="WARN" />
          <Badge type="letter" status="success" content="OK" />
          <Badge type="letter" status="important" content="HOT" />
        </div>
      </div>
    </div>
  ),
};

// 실제 사용 예시
export const UsageExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '16px' }}>Messages</span>
        <Badge type="number" status="important" content={3} />
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '16px' }}>Notifications</span>
        <Badge type="number" status="information" content={15} />
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '16px' }}>Online Status</span>
        <Badge type="dot" status="success" />
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '16px' }}>New Feature</span>
        <Badge type="letter" status="information" content="NEW" />
      </div>
    </div>
  ),
};