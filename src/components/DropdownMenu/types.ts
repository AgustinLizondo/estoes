import { HTMLAttributes, ReactNode } from "react";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";

type Option = {
  id: number;
  icon: ReactNode;
  title: string;
  onClick?: (id: number) => void;
  triggers?: boolean;
};

export interface DropdownMenuProps extends DropdownMenuContentProps {
  className?: HTMLAttributes<HTMLDivElement>["className"];
  trigger: ReactNode;
  options: Option[];
}
