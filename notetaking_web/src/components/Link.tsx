import NextLink from "next/link";
import { ReactNode } from "react";

export const Link: React.FC<{ href: string; children: ReactNode }> = ({
  href,
  children,
}) => {
  return (
    <NextLink href={href} className="text-xs text-[#957139] underline">
      {children}
    </NextLink>
  );
};
