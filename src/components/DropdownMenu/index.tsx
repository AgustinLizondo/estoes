import {
  DropdownMenu as DropdownMenuSCN,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu';
import React from 'react';
import { DropdownMenuProps } from './types';
import { DialogTrigger } from '../ui/dialog';

const DropdownMenu = (props: DropdownMenuProps) => {
  const {
    trigger,
    options,
    ...rest
  } = props;

  return (
    <DropdownMenuSCN>
      <DropdownMenuTrigger
        asChild
      >
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        {...rest}
      >
        {options.map(({
          id,
          icon,
          title,
          onClick,
          triggers,
        }) =>
          triggers
            ? (<DialogTrigger
              key={id}
            >
              <DropdownMenuItem
                onClick={() => onClick && onClick(id)}
                className="gap-4"
              >
                {icon}
                {title}
              </DropdownMenuItem>
              {id !== options.length - 1 && <DropdownMenuSeparator />}
            </DialogTrigger>)
            : (
              <>
                <DropdownMenuItem
                  onClick={() => onClick && onClick(id)}
                  className="gap-4"
                >
                  {icon}
                  {title}
                </DropdownMenuItem>
                {id !== options.length - 1 && <DropdownMenuSeparator />}
              </>)
        )}
      </DropdownMenuContent>
    </DropdownMenuSCN>

  )
}

export default DropdownMenu