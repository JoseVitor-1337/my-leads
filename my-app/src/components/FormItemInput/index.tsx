import { InputHTMLAttributes } from "react";

import { inputStyle } from "@/styledTags";

type Props = {
  label: string;
  inputEvent: InputHTMLAttributes<HTMLInputElement>;
};

export default function FormItemInput({ label, inputEvent }: Props) {
  return (
    <div>
      <label htmlFor={inputEvent.id}>{label}</label>
      <input className={inputStyle()} id={inputEvent.name} {...inputEvent} />
    </div>
  );
}
