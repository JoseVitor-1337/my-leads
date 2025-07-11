import { useState } from "react";

import { Error } from "@/types/Error";

export default function useError() {
  const [error, setError] = useState<Error>({ hasError: false, message: "" });

  return { error, setError };
}
