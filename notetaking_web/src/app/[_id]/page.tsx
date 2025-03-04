"use client";

import { NoteBackground } from "@/components/NoteBackground";
import { Select } from "@/components/Select";
import { TimesIcon } from "@/icons/Times";
import api from "@/utils/api";
import debounce from "@/utils/debounce";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { Category } from "@/components/Category";

const Categories = [{ color: "#EF9C66", name: "Random Thoughts" }];

const formatDate = (isoDateString: string): string => {
  const date = new Date(isoDateString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };

  return date.toLocaleString("en-US", options);
};

const updateNoteAPI = async (noteId: string, body: any) => {
  return api.post(`/notes/update/${noteId}/`, { ...body });
};

const getNoteAPI = async (id: string) => {
  const response = await api.get(`/notes/find/${id}/`);
  return response.data;
};

export default function () {
  const { _id: noteId } = useParams<{ _id: string }>();

  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: () => api.get("/categories/"),
  });

  const note = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => getNoteAPI(noteId),
  });

  const mutation = useMutation({
    mutationFn: (body: any) => {
      return updateNoteAPI(noteId, body);
    },
    onSuccess: () => {
      note.refetch();
    },
  });

  const onFieldChange = useCallback(
    debounce((field: string, value: string) => {
      mutation.mutate({
        title: note.data?.title,
        content: note.data?.content,
        cateogory: note.data?.category?.id,
        [field]: value,
      });
    }, 500),
    [mutation, note]
  );

  const onTitleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      onFieldChange("title", e.target.value);
    },
    [onFieldChange]
  );

  const onContentChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      onFieldChange("content", e.target.value);
    },
    [onFieldChange]
  );

  const onCategoryChange = useCallback(
    (value: any) => {
      onFieldChange("category", value);
    },
    [onFieldChange]
  );

  if (categories.isLoading) {
    return null;
  }

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Listbox
          defaultValue={note.data?.category?.id}
          onChange={onCategoryChange}
        >
          <div className="relative mt-2">
            <ListboxButton className="border p-2 rounded-md w-60 border-[#957139] border-1 text-sm">
              <Category
                name={note.data?.category?.name}
                color={note.data?.category?.color}
              />
            </ListboxButton>

            <ListboxOptions
              transition
              className=" absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-[#FAF1E3] py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
            >
              {categories.data?.data?.map((category) => (
                <ListboxOption
                  key={category.id}
                  value={category.id}
                  className=" cursor-pointer group relative select-none py-2 pl-3 pr-9 text-gray-900"
                >
                  <Category name={category?.name} color={category?.color} />
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>
        <Link href="/">
          <TimesIcon />
        </Link>
      </div>
      <NoteBackground
        color={note.data?.category?.color}
        className="p-12 px-20 overflow-scroll flex flex-col gap-6 flex-grow"
      >
        <div className="text-right text-xs">
          Last Edited: {note.data && formatDate(note.data?.lastUpdatedAt)}
        </div>
        <textarea
          defaultValue={note.data?.title}
          onChange={onTitleChange}
          className="bg-transparent focus:outline-none ring-offset-0 ring-0 font-serif font-bold text-2xl"
        ></textarea>
        <textarea
          defaultValue={note.data?.content}
          onChange={onContentChange}
          className="bg-transparent focus:outline-none text-base flex-grow overflow-y-scroll"
        ></textarea>
      </NoteBackground>
    </div>
  );
}
