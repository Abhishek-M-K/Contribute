"use client";
import { Button } from "@repo/ui/components/ui/button";
import { login } from "@/actions/auth";
import { Github } from "lucide-react";
import React from "react";

const LoginGithub = () => {
  return (
    <div
      onClick={async () => await login("github")}
      className="w-full gap-4  hover:cursor-pointer mt-6 h-12 bg-black rounded-md p-4 flex justify-center items-center"
    >
      <Github className="text-white" />
      <p className="text-white">Login with Github</p>
    </div>
  );
};

export default LoginGithub;
