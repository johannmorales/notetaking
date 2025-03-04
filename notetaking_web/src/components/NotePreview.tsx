import { CSSProperties, useMemo } from "react";

function formatDate(dateString: string): string {
  const today = new Date();
  const date = new Date(dateString); // Convert the ISO string back to a Date object for comparison

  const isToday = date.toDateString() === today.toDateString();
  if (isToday) {
    return "today";
  }

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();
  if (isYesterday) {
    return "yesterday";
  }

  const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

export const NotePreview: React.FC<{
  title: string;
  content: string;
  categoryName: string;
  categoryColor: string;
  createdAt: string;
}> = ({ title, content, categoryColor, categoryName, createdAt }) => {
  const style: CSSProperties = useMemo(() => {
    return {
      backgroundColor: `${categoryColor}80`,
      border: `3px solid ${categoryColor}`,
    };
  }, [categoryColor]);
  return (
    <div
      style={style}
      className="rounded-xl p-8 flex flex-col gap-2 h-full w-full shadow-lg overflow-hidden"
    >
      <div className="flex gap-6">
        <span className="text-xs font-bold">{formatDate(createdAt)}</span>{" "}
        <span className="text-xs ">{categoryName}</span>
      </div>
      <h1 className="text-2xl font-serif font-bold">{title}</h1>
      <p className="text-xs">{content}</p>
    </div>
  );
};
