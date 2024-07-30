import {
  Control,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  RegisterOptions,
  UseFormStateReturn,
} from "react-hook-form";
import { InputProps } from "../ui/input";

export interface ControllerInputProps extends InputProps {
  name: string;
  control: Control<FieldValues>;
  rules?: RegisterOptions;
}

export interface RenderInputProps {
  field: ControllerRenderProps;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FieldValues>;
}
