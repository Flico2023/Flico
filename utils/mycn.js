import { twMerge as _twMerge } from "tailwind-merge";
import clsx from "clsx";

export function mycn(...args) {
  return _twMerge(clsx(args));
}