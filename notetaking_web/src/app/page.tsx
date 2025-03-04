"use client";

import { Button } from "@/components/Button";
import { Category } from "@/components/Category";
import { NotePreview } from "@/components/NotePreview";
import api from "@/utils/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PlusIcon } from "@/icons/Plus";
import { useState } from "react";
import clsx from "clsx";

export default function Home() {
  const router = useRouter();

  const [categoryId, setCategoryId] = useState(null);

  const mutation = useMutation({
    mutationFn: () => {
      return api.post("/notes/create/");
    },
    onSuccess: (response) => {
      router.push(`/${response.data.id}`);
    },
  });

  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: () => api.get("/categories/"),
  });

  const notes = useQuery({
    queryKey: ["notes", categoryId],
    queryFn: () =>
      api.get("/notes/", {
        params: {
          categoryId,
        },
      }),
  });

  return (
    <div className="flex flex-col gap-4 h-full py-8">
      <div className="flex justify-end">
        <Button
          onClick={() => mutation.mutate()}
          className="flex gap-1 items-center"
        >
          <PlusIcon /> New Note
        </Button>
      </div>
      <div className="flex flex-grow gap-8 max-h-full overflow-y-scroll">
        <aside className="w-64 flex-none">
          <h2
            className="p-2 text-sm font-bold cursor-pointer"
            onClick={() => setCategoryId(null)}
          >
            All Categories
          </h2>
          <ul className="text-sm">
            {categories.data?.data?.map((item) => (
              <li
                key={item.id}
                className={clsx(
                  "flex justify-between p-2 cursor-pointer transition-all",
                  categoryId === item.id && "font-semibold"
                )}
                onClick={() => setCategoryId(item.id)}
              >
                <Category name={item.name} color={item.color} />
                {item.note_count}
              </li>
            ))}
          </ul>
        </aside>
        <main className="grid grid-cols-3 flex-grow gap-4 overflow-scroll h-full">
          {notes.data?.data.map((item) => (
            <Link href={`/${item.id}`} key={item.id} className="aspect-[4/3]">
              <NotePreview
                title={item.title}
                content={item.content}
                categoryName={item.category?.name}
                categoryColor={item.category?.color}
                createdAt={item.lastUpdatedAt}
              />
            </Link>
          ))}
        </main>
      </div>
    </div>
  );
}
