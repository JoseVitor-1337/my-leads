import { ButtonHTMLAttributes } from "react";

import { buttonStyle } from "@/styledTags/Button";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading: boolean;
};

export default function ButtonWithLoading({
  isLoading,
  ...buttonProps
}: Props) {
  return (
    <button className={buttonStyle()} {...buttonProps}>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <span>{buttonProps.children}</span>
      )}
    </button>
  );
}
