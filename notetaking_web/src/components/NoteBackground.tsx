import clsx from "clsx";
import { CSSProperties, ReactNode, useMemo } from "react";

export const NoteBackground: React.FC<{
  color: string;
  children: ReactNode;
  className: string;
}> = ({ color, children, className }) => {
  const style: CSSProperties = useMemo(() => {
    return {
      backgroundColor: `${color}80`,
      border: `3px solid ${color}`,
    };
  }, [color]);
  return (
    <div style={style} className={clsx("rounded-xl h-full w-full", className)}>
      {children}
    </div>
  );
};
