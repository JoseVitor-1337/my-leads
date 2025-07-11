"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Spinner from "@/components/PageSpinner";
import { getFromStorage } from "@/utils/storage";
import { AUTHENTICATION_TOKEN_KEY } from "@/constants/storage";

export default function HomePage() {
  const { push } = useRouter();

  useEffect(() => {
    const token = getFromStorage(AUTHENTICATION_TOKEN_KEY);
    if (token) {
      push("/leads");
    } else {
      push("/login");
    }
  }, [push]);

  return <Spinner />;
}
