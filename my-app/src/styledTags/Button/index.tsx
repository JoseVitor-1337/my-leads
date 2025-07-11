import { tv } from "tailwind-variants";

export const buttonStyle = tv({
  base: "cursor-pointer px-4 py-2 rounded transition font-500 focus:outline-blue-800",
  variants: {
    intent: {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      secondary:
        "border-2 border-color-blue-400 bg-white text-blue-400 hover:bg-blue-100",
      danger: "bg-red-600 text-white hover:bg-red-700",
      ghost: "bg-red-600 text-white hover:bg-red-700",
    },
    size: {
      sm: "px-2 py-1 ",
    },
  },
  defaultVariants: {
    intent: "primary",
  },
});
