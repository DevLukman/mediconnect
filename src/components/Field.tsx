import type {
  FieldErrorProps as FieldErrorPrimitiveProps,
  GroupProps,
  InputProps as InputPrimitiveProps,
  LabelProps,
  TextFieldProps as TextFieldPrimitiveProps,
  TextProps,
  ValidationResult,
} from "react-aria-components";
import {
  FieldError as FieldErrorPrimitive,
  Group,
  Input as InputPrimitive,
  Label as LabelPrimitive,
  Text,
  composeRenderProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { composeTailwindRenderProps, focusStyles } from "./Primitive";

interface FieldProps {
  label?: string;
  placeholder?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  "aria-label"?: TextFieldPrimitiveProps["aria-label"];
  "aria-labelledby"?: TextFieldPrimitiveProps["aria-labelledby"];
}

const fieldStyles = tv({
  slots: {
    description: "text-pretty text-muted-fg  text-sm/6",
    label: "w-fit cursor-pointer font-bold text-secondary-fg text-sm",
    fieldError: "text-danger text-sm/6 forced-colors:text-[Mark]",
    input: [
      "w-full min-w-0 bg-transparent border border-border px-2.5 py-2 text-base text-fg placeholder-muted-fg outline-hidden data-focused:outline-hidden sm:text-sm [&::-ms-reveal]:hidden",
    ],
  },
});

const { description, label, fieldError, input } = fieldStyles();

const Label = ({ className, ...props }: LabelProps) => {
  return <LabelPrimitive {...props} className={label({ className })} />;
};

interface DescriptionProps extends TextProps {
  isWarning?: boolean;
  ref?: React.RefObject<HTMLElement>;
}

const Description = ({ ref, className, ...props }: DescriptionProps) => {
  const isWarning = props.isWarning ?? false;
  return (
    <Text
      ref={ref}
      {...props}
      slot="description"
      className={description({
        className: isWarning ? "text-warning" : className,
      })}
    />
  );
};

interface FieldErrorProps extends FieldErrorPrimitiveProps {
  ref?: React.RefObject<HTMLElement>;
}
const FieldError = ({ className, ref, ...props }: FieldErrorProps) => {
  return (
    <FieldErrorPrimitive
      ref={ref}
      {...props}
      className={composeTailwindRenderProps(className, fieldError())}
    />
  );
};

const fieldGroupStyles = tv({
  base: [
    "group flex h-10 items-center overflow-hidden rounded-lg border border-input bg-bg transition disabled:opacity-50 disabled:bg-secondary forced-colors:bg-[Field]",
    "focus-within:border-ring/85 focus-within:ring-4 focus-within:ring-ring/20",
    "focus-within:invalid:border-danger focus-within:invalid:ring-4 focus-within:invalid:ring-danger/20",
    "invalid:border-danger",
    "has-[.isPfx]:pl-2.5 has-[.isSfx]:pr-2.5 [&_[data-slot=icon]]:size-4 has-[.atrs]:shrink-0 has-[.atrs]:text-muted-fg",
  ],
});

const FieldGroup = ({ className, ...props }: GroupProps) => {
  return (
    <Group
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        fieldGroupStyles({
          ...renderProps,
          className,
        })
      )}
    />
  );
};

interface InputProps extends InputPrimitiveProps {
  ref?: React.RefObject<HTMLInputElement>;
}
const Input = ({ className, ref, ...props }: InputProps) => {
  return (
    <InputPrimitive
      ref={ref}
      {...props}
      className={composeTailwindRenderProps(className, input())}
    />
  );
};

export { Description, FieldError, FieldGroup, Input, Label };
export type { FieldErrorProps, FieldProps, InputProps };
