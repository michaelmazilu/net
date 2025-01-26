"use client";

import { useState } from "react";
import { supabaseClient } from "@/utils/supabase/client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FcGoogle } from "react-icons/fc";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === "signup") {
        const { error } = await supabaseClient.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabaseClient.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabaseClient.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">
        {mode === "signin" ? "Sign In" : "Sign Up"} to Net
      </h2>

      <div className="whitespace-normal mx-4 flex items-center ">
        <Button
          onClick={handleGoogleSignIn}
          className="bg-[#262626] text-white text-lg border border-[#424242] hover:bg-[#2f2f2f] justify-center rounded-xl"
          type="button"
        >
          <FcGoogle className="" />
          Continue with Google
        </Button>
      </div>

      <div className="flex flex-row border-none text-xs font-normal items-center justify-center w-full my-4">
        <div className="flex-grow border-t border-[#424242]"></div>
        <span className="px-4 text-gray-500">OR</span>
        <div className="flex-grow border-t border-[#424242]"></div>
      </div>

      <form onSubmit={handleAuth} className="space-y-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded border bg-[#333333] text-white border-[#424242]"
          required
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded border bg-[#333333] text-white border-[#424242]"
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button
          type="submit"
          className="w-full rounded-2xl bg-[#262626] border border-[#424242] hover:bg-[#2f2f2f]"
          disabled={loading}
        >
          {loading ? "Loading..." : mode === "signin" ? "Sign In" : "Sign Up"}
        </Button>

        <p className="text-center text-white">
          {mode === "signin"
            ? "Don't have an account? "
            : "Already have an account? "}

          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="text-[#4EC4FF] hover:underline"
          >
            {mode === "signin" ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </form>
    </div>
  );
};
