import { tv } from "tailwind-variants";

export const paragraphStyle = tv({
  base: "text-md font-normal lg:text-lg",
  variants: {
    intent: {
      primary: "text-black dark:text-white",
      secondary: "text-gray-600 dark:text-gray-400",
      danger: "text-red-600 text-center dark:text-red-400",
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "md",
  },
});
