"use client";

import { paragraphStyle } from "@/styledTags/Paragraph";
import { Error } from "@/types/Error";

type Props = Error;

export default function ErrorMessage({ hasError, message }: Props) {
  if (!hasError) return null;
  return <p className={paragraphStyle({ intent: "danger" })}>{message}</p>;
}
