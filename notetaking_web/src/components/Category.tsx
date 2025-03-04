import { FC } from "react";

export const Category: FC<{
  name: string;
  color: string;
}> = ({ color, name }) => {
  return (
    <div className="flex gap-2 items-center">
      <svg
        width="11"
        height="12"
        viewBox="0 0 11 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 6C11 9.03757 8.53757 11.5 5.5 11.5C2.46243 11.5 0 9.03757 0 6C0 2.96243 2.46243 0.5 5.5 0.5C8.53757 0.5 11 2.96243 11 6Z"
          fill={color}
        />
      </svg>
      {name}
    </div>
  );
};
