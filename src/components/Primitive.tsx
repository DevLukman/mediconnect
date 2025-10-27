"use client";
import { useMediaQuery } from "@/utils/mediaQuery";
import { type ClassValue, clsx } from "clsx";
import { composeRenderProps } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(...inputs));

const composeTailwindRenderProps = <T,>(
  className: string | ((v: T) => string) | undefined,
  tw: string
): string | ((v: T) => string) => {
  return composeRenderProps(className, (className) => twMerge(tw, className));
};

const focusRing = tv({
  base: "outline-none focus:outline-none forced-colors:outline-[Highlight]",
  variants: {
    isFocused: { true: "ring-4 ring-ring/20" },
    isInvalid: { true: "ring-4 ring-danger/20" },
  },
});

const isServerSide = (): boolean => typeof window === "undefined";

const isIos = (userAgent?: string): boolean => {
  if (isServerSide() && !userAgent) return false;
  const result = userAgent || navigator.userAgent;
  return /iPad|iPhone|iPod|iPadOS|iPhoneOS/.test(result);
};

const focusStyles = tv({
  extend: focusRing,
  variants: {
    isFocused: { true: "border-ring" },
    isInvalid: { true: "border-danger" },
  },
});

const focusButtonStyles = tv({
  base: "outline outline-ring forced-colors:outline-[Highlight] outline-offset-2",
  variants: {
    isFocusVisible: {
      false: "outline-0",
      true: "outline-2",
    },
  },
});

const ctr = composeTailwindRenderProps;
const tm = twMerge;
const cr = composeRenderProps;

export {
  cn,
  composeTailwindRenderProps,
  cr,
  ctr,
  focusButtonStyles,
  focusRing,
  focusStyles,
  isIos,
  tm,
  twMerge,
  useMediaQuery,
};
