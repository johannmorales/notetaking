"use client"; // If using App Router (Next.js 13+)
import { useEffect } from "react";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // Import styles

export const GlobalLoadingBar = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  useEffect(() => {
    if (isFetching || isMutating) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [isFetching, isMutating]);

  return null;
};
