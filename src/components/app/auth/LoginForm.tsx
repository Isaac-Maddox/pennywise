"use client";

import { login } from "@/actions/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

const initialFormState: LoginFormState = {
   email: "",
   password: "",
   remember: true,
};

export default function LoginForm() {
   const [formState, setFormState] = useState<LoginFormState>(initialFormState);
   const [isProcessing, setIsProcessing] = useState(false);
   const [error, setError] = useState("");
   const router = useRouter();

   const submitForm = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setIsProcessing(true);

      const { success, message } = await login(formState);

      if (success) {
         router.push("/app");
      } else {
         setError(message);
      }

      setIsProcessing(false);
   };

   const updateFormState = (e: ChangeEvent<HTMLInputElement>) => {
      setError("");

      setFormState((old) => {
         return {
            ...old,
            [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
         };
      });
   };

   return (
      <form className="auth-form" action="/api/login" method="post" onSubmit={(e) => submitForm(e)}>
         <h2>Log In</h2>
         <div className="form-control">
            <label htmlFor="email">
               Email<span>*</span>
            </label>
            <input type="email" name="email" id="email" className={error ? "error" : ""} value={formState.email} onChange={updateFormState} required />
         </div>
         <div className="form-control">
            <label htmlFor="password">
               Password<span>*</span>
            </label>
            <input type="password" name="password" id="password" className={error ? "error" : ""} value={formState.password} onChange={updateFormState} required />
         </div>
         <div className="form-control">
            <label htmlFor="remember">
               <input type="checkbox" name="remember" id="remember" checked={formState.remember} onChange={updateFormState} /> Remember me
            </label>
         </div>
         {error && <p className="text-error">{error}</p>}
         <button type="submit" disabled={isProcessing}>
            {!isProcessing ? "Log in" : "Processing..."}
         </button>
         <hr />
         <Link href="/signup">Don&apos;t have an account?</Link>
      </form>
   );
}

interface LoginFormState {
   email: string;
   password: string;
   remember: boolean;
}
