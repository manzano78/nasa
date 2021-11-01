import { Select as AntdSelect } from 'antd';

interface SelectProps {
  options: Array<{
    value: string;
    label: string;
  }>;
  onSelect?: (value: string) => void;
  onClear?: () => void;
  className?: string;
  allowClear?: boolean;
  showSearch?: boolean;
  placeholder?: string;
  defaultValue?: string;
  loading?: boolean;
}

export function Select(props: SelectProps) {
  const {
    className,
    onClear,
    onSelect,
    options,
    allowClear,
    showSearch,
    placeholder,
    defaultValue,
    loading,
  } = props;

  return (
    <AntdSelect
      className={className}
      showSearch={showSearch}
      allowClear={allowClear}
      options={options}
      onSelect={onSelect}
      onClear={onClear}
      placeholder={placeholder}
      defaultValue={defaultValue}
      loading={loading}
    />
  );
}
