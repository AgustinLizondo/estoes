import {
  Select as ShadcnSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { SelectProps } from './types';
import { cn } from '@/lib/utils';

const Select = (props: SelectProps) => {
  const {
    placeholder = 'Select an option',
    options,
    className,
    triggerClassName,
    label,
    ...rest
  } = props;

  return (
    <SelectGroup
      className={className}
    >
      <ShadcnSelect
        {...rest}
      >
        {label && (
          <span
            className='text-sm text-black'
          >
            {label}
          </span>
        )}
        <SelectTrigger
          className={cn(triggerClassName, "mt-2")}
        >
          <SelectValue
            placeholder={placeholder}
          />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </ShadcnSelect>
    </SelectGroup>
  );
};

export default Select;
