import { TextareaHTMLAttributes } from "react";

import { inputStyle } from "@/styledTags";

type Props = {
  label: string;
  textareaEvent: TextareaHTMLAttributes<HTMLTextAreaElement>;
};

export default function FormItemTextarea({ label, textareaEvent }: Props) {
  return (
    <div>
      <label htmlFor={textareaEvent.id}>{label}</label>
      <textarea
        className={inputStyle()}
        id={textareaEvent.name}
        {...textareaEvent}
      />
    </div>
  );
}
