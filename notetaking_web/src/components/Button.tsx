import clsx from "clsx";
import { MouseEventHandler } from "react";

export const Button: React.FC<{
  children: React.ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}> = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "font-bold border-[#957139] text-[#957139] border p-2 px-4 rounded-full",
        className
      )}
    >
      {children}
    </button>
  );
};
