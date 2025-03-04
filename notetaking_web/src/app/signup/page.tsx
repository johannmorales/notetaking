"use client";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Link } from "@/components/Link";
import { useAuth } from "@/context/auth";
import api from "@/utils/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/signup/", {
        email,
        password,
      });
      login(response.data.access);
      toast.error("User created");

      router.push("/login");
    } catch (error) {
      toast.error("An error occurred");
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex w-full justify-center  items-center h-full container mx-auto text-center">
      <form
        className="flex flex-col gap-10 items-center justify-normal w-1/3"
        onSubmit={handleSubmit}
      >
        <div className="h-28">
          <Image height={134} width={188} src="/cat.png" alt="cat" />
        </div>
        <h1 className="text-5xl text-[#88642A] font-serif font-bold">
          Yay, New Friend!
        </h1>
        <div className="flex flex-col gap-3 w-full">
          <Input
            placeholder="Email address"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <Input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
        </div>
        <div className="w-full flex flex-col gap-4">
          <Button onClick={() => {}} className="w-full">
            Sign Up
          </Button>
          <Link href="/login">We’re already friends!</Link>
        </div>
      </form>
    </div>
  );
}
