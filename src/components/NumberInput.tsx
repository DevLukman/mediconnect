import {
  IconChevronDown,
  IconChevronUp,
  IconMinus,
  IconPlus,
} from "@intentui/icons";
import {
  Button,
  type ButtonProps,
  NumberField as NumberFieldPrimitive,
  type NumberFieldProps as NumberFieldPrimitiveProps,
  type ValidationResult,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { type Ref, useImperativeHandle, useRef } from "react";
import { Description, FieldError, FieldGroup, Input, Label } from "./Field";
import { composeTailwindRenderProps } from "./Primitive";
import { useMediaQuery } from "@/utils/mediaQuery";

const fieldBorderStyles = tv({
  base: "group-data-focused:border-primary/70 forced-colors:border-[Highlight]",
  variants: {
    isInvalid: {
      true: "group-data-focused:border-danger/70 forced-colors:border-[Mark]",
    },
    isDisabled: {
      true: "group-data-focused:border-input/70",
    },
  },
});

const numberFieldStyles = tv({
  slots: {
    base: "group  flex flex-col gap-y-1.5",
    stepperButton:
      "h-10 cursor-pointer px-3 text-muted-fg data-pressed:bg-primary data-pressed:text-primary-fg group-data-disabled:bg-secondary/70 forced-colors:group-data-disabled:text-[GrayText]",
  },
});

const { base, stepperButton } = numberFieldStyles();

interface NumberFieldProps extends NumberFieldPrimitiveProps {
  label?: string;
  description?: string;
  placeholder?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  ref?: Ref<HTMLInputElement>;
}

const NumberField = ({
  label,
  ref,
  placeholder,
  description,
  className,
  errorMessage,
  ...props
}: NumberFieldProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  // biome-ignore lint/style/noNonNullAssertion: This would not be null
  const inputRef = useRef<HTMLInputElement>(null!);

  // NOTE: This is a hack cause the Underlying Input component expects a RefObject and libs like React Hook Form passes in a RefCallback. We need a solution that converts the Ref (which could be a RefCallback) to a RefObject for the underlying Input component. The useImperativeHandle hook ensures that no matter what type of ref is passed (from useRef or RHF's register), the component will always expose a valid RefObject to the underlying Input.

  // biome-ignore lint/style/noNonNullAssertion: This would not be null
  useImperativeHandle(ref, () => inputRef.current!, []);

  return (
    <NumberFieldPrimitive
      {...props}
      className={composeTailwindRenderProps(className, base())}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup className="overflow-hidden">
        {(renderProps) => (
          <>
            {isMobile ? (
              <StepperButton slot="decrement" className="border-r" />
            ) : null}
            <Input
              ref={inputRef}
              className="tabular-nums"
              placeholder={placeholder}
            />
            <div
              className={fieldBorderStyles({
                ...renderProps,
                className: "grid h-10 place-content-center border-s",
              })}
            >
              {isMobile ? (
                <StepperButton slot="increment" />
              ) : (
                <div className="flex h-full flex-col">
                  <StepperButton
                    slot="increment"
                    emblemType="chevron"
                    className="h-5 px-1"
                  />
                  <div
                    className={fieldBorderStyles({
                      ...renderProps,
                      className: "border-border border-b",
                    })}
                  />
                  <StepperButton
                    slot="decrement"
                    emblemType="chevron"
                    className="h-5 px-1"
                  />
                </div>
              )}
            </div>
          </>
        )}
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </NumberFieldPrimitive>
  );
};

interface StepperButtonProps extends ButtonProps {
  slot: "increment" | "decrement";
  emblemType?: "chevron" | "default";
  className?: string;
}

const StepperButton = ({
  slot,
  className,
  emblemType = "default",
  ...props
}: StepperButtonProps) => {
  const icon =
    emblemType === "chevron" ? (
      slot === "increment" ? (
        <IconChevronUp className="size-5" />
      ) : (
        <IconChevronDown className="size-5" />
      )
    ) : slot === "increment" ? (
      <IconPlus />
    ) : (
      <IconMinus />
    );
  return (
    <Button className={stepperButton({ className })} slot={slot} {...props}>
      {icon}
    </Button>
  );
};

export { NumberField };
export type { NumberFieldProps };
