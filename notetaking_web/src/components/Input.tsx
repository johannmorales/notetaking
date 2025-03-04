import { InputHTMLAttributes } from "react";

export const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
  ...props
}) => {
  return (
    <input
      className="w-full bg-transparent placeholder:text-black text-xs p-3 border border-[#957139] rounded-lg"
      {...props}
    ></input>
  );
};
