import { tv } from "tailwind-variants";

export const headingStyle = tv({
  base: "text-xl font-normal lg:text-2xl",
  variants: {
    intent: {
      primary: "text-black dark:text-white",
      secondary: "text-gray-600  dark:text-gray-400",
    },
  },
  defaultVariants: {
    intent: "primary",
  },
});
