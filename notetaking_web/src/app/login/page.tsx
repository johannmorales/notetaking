"use client";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Link } from "@/components/Link";
import Image from "next/image";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";
import api from "@/utils/api";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/login/", {
        email,
        password,
      });
      login(response.data.access);
      router.push("/");
    } catch (error) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="container mx-auto text-center flex items-center justify-center h-full w-full">
      <form
        className="flex flex-col gap-10 items-center justify-normal w-1/3"
        onSubmit={handleSubmit}
      >
        <div className="h-28">
          <Image height={113} width={95} src="/cactus.png" alt="cactus" />
        </div>

        <h1 className="text-5xl text-[#88642A] font-serif font-bold   ">
          Yay, You're Back!
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
            Login
          </Button>
          <Link href="/signup">Oops! I’ve never been here before</Link>
        </div>
      </form>
    </div>
  );
}
