import { Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { ReactNode } from 'react';

interface RadioButtonGroupProps {
  value: string
  onChange?: (newValue: string) => void
  options: Array<{
    value: string
    label: ReactNode
  }>
  className?: string
}

export function RadioButtonGroup(props: RadioButtonGroupProps) {
  const {
    value,
    onChange,
    options,
    className,
  } = props;

  const handleChange = (e: RadioChangeEvent) => {
    onChange?.(e.target.value);
  }

  return (
    <Radio.Group
      value={value}
      onChange={handleChange}
      className={className}
    >
      {options.map(({ value, label }) => (
        <Radio.Button
          key={value}
          value={value}
        >
          {label}
        </Radio.Button>
      ))}
    </Radio.Group>
  );
}
