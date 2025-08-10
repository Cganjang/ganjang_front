import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Chips from './Chips';

const meta: Meta<typeof Chips> = {
  title: 'Base/Chips',
  component: Chips,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Chips 컴포넌트는 선택 가능한 필터, 태그, 또는 작은 정보 조각을 표시하는 데 사용됩니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '칩에 표시될 텍스트',
    },
    variant: {
      control: 'select',
      options: ['default', 'status'],
      description: '칩의 타입',
    },
    status: {
      control: 'select',
      options: ['information', 'success', 'error', 'warning', 'neutral'],
      description: '상태 (status variant일 때만 사용)',
    },
    style: {
      control: 'select',
      options: ['transparent', 'filled', 'outline'],
      description: '스타일 타입',
    },
    selected: {
      control: 'boolean',
      description: '선택 상태',
    },
    disabled: {
      control: 'boolean',
      description: '비활성 상태',
    },
    draggable: {
      control: 'boolean',
      description: '드래그 가능 여부',
    },
    leadingIcon: {
      control: 'select',
      options: [undefined, 'info', 'check', 'user', 'avatar'],
      description: '리딩 아이콘',
    },
    showTrailingIcon: {
      control: 'boolean',
      description: '삭제 버튼 표시 여부',
    },
    onClick: { action: 'clicked' },
    onDelete: { action: 'deleted' },
  },
} satisfies Meta<typeof Chips>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Label',
    variant: 'default',
    leadingIcon: 'user',
    showTrailingIcon: true,
  },
};

export const Selected: Story = {
  args: {
    label: 'Selected',
    variant: 'default',
    selected: true,
    leadingIcon: 'user',
    showTrailingIcon: true,
  },
};

export const WithAvatar: Story = {
  args: {
    label: 'With Avatar',
    variant: 'default',
    leadingIcon: 'avatar',
    avatarInitial: 'A',
    showTrailingIcon: true,
  },
};

export const StatusInformation: Story = {
  args: {
    label: 'Information',
    variant: 'status',
    status: 'information',
    style: 'filled',
  },
};

export const StatusSuccess: Story = {
  args: {
    label: 'Success',
    variant: 'status',
    status: 'success',
    style: 'filled',
  },
};

export const StatusError: Story = {
  args: {
    label: 'Error',
    variant: 'status',
    status: 'error',
    style: 'filled',
  },
};

export const StatusWarning: Story = {
  args: {
    label: 'Warning',
    variant: 'status',
    status: 'warning',
    style: 'filled',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    variant: 'default',
    disabled: true,
    leadingIcon: 'user',
    showTrailingIcon: true,
  },
};

export const Draggable: Story = {
  args: {
    label: 'Draggable',
    variant: 'default',
    draggable: true,
    leadingIcon: 'user',
    showTrailingIcon: true,
  },
};

export const StyleVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ minWidth: '80px', fontSize: '14px' }}>Transparent:</span>
        <Chips label="Information" variant="status" status="information" style="transparent" />
        <Chips label="Success" variant="status" status="success" style="transparent" />
        <Chips label="Error" variant="status" status="error" style="transparent" />
        <Chips label="Warning" variant="status" status="warning" style="transparent" />
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ minWidth: '80px', fontSize: '14px' }}>Filled:</span>
        <Chips label="Information" variant="status" status="information" style="filled" />
        <Chips label="Success" variant="status" status="success" style="filled" />
        <Chips label="Error" variant="status" status="error" style="filled" />
        <Chips label="Warning" variant="status" status="warning" style="filled" />
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ minWidth: '80px', fontSize: '14px' }}>Outline:</span>
        <Chips label="Information" variant="status" status="information" style="outline" />
        <Chips label="Success" variant="status" status="success" style="outline" />
        <Chips label="Error" variant="status" status="error" style="outline" />
        <Chips label="Warning" variant="status" status="warning" style="outline" />
      </div>
    </div>
  ),
};

export const InteractiveExample: Story = {
  render: () => {
    const [chips, setChips] = React.useState([
      { id: 1, label: 'React', selected: false },
      { id: 2, label: 'TypeScript', selected: true },
      { id: 3, label: 'JavaScript', selected: false },
      { id: 4, label: 'CSS', selected: false },
    ]);

    const handleChipClick = (id: number) => {
      setChips(prev => prev.map(chip => 
        chip.id === id ? { ...chip, selected: !chip.selected } : chip
      ));
    };

    const handleChipDelete = (id: number) => {
      setChips(prev => prev.filter(chip => chip.id !== id));
    };

    return (
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {chips.map(chip => (
          <Chips
            key={chip.id}
            label={chip.label}
            selected={chip.selected}
            onClick={() => handleChipClick(chip.id)}
            onDelete={() => handleChipDelete(chip.id)}
            leadingIcon="user"
          />
        ))}
      </div>
    );
  },
};