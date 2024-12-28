// import React, { Suspense } from "react";
import LoginButton from "./login-button";
import LoginForm from "@/components/forms/loginForm";
import LoginGithub from "./loginGithub";

export default async function LoginPage() {
  return (
    <div className="mx-5 border border-stone-200 py-10 dark:border-stone-700 sm:mx-auto sm:w-full sm:max-w-md sm:rounded-lg sm:shadow-md">
      <h1 className="font-title mt-6 text-center text-3xl dark:text-white">
        Login
      </h1>
      <div className="mx-auto mt-4 w-11/12 max-w-xs sm:w-full">
        <LoginForm />
        {/* <LoginGithub /> */}
        <LoginButton />
      </div>
    </div>
  );
}
