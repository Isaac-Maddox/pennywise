"use client";

import { login } from "@/actions/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Outline } from "@/components/logos";

const initialFormState: LoginFormState = {
   email: "",
   password: "",
   remember: true,
};

export default function LoginPage() {
   const [formState, setFormState] = useState<LoginFormState>(initialFormState);
   const [error, setError] = useState("");

   const submitForm = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const { success, message } = await login(formState);

      if (success) {
         redirect("/app");
      } else {
         setError(message);
      }
   };

   const updateFormState = (e: ChangeEvent<HTMLInputElement>) => {
      setFormState((old) => {
         return {
            ...old,
            [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
         };
      });
   };

   return (
      <>
         <aside className="callout-card">
            <Outline />
            <h1>Welcome back to Pennywise!</h1>
            <p className="text-lg">
               We&apos;re glad to see you again! Log in and we&apos;ll get you back to where you left off last time.
            </p>
         </aside>
         <main>
            <form className="auth-form" action="/api/login" method="post" onSubmit={(e) => submitForm(e)}>
               <h2>Log In</h2>
               <div className="form-control">
                  <label htmlFor="email">Email</label>
                  <input
                     type="email"
                     name="email"
                     id="email"
                     value={formState.email}
                     onChange={updateFormState}
                     required
                  />
               </div>
               <div className="form-control">
                  <label htmlFor="password">Password</label>
                  <input
                     type="password"
                     name="password"
                     id="password"
                     value={formState.password}
                     onChange={updateFormState}
                     required
                  />
               </div>
               <div className="form-control">
                  <input
                     type="checkbox"
                     name="remember"
                     id="remember"
                     checked={formState.remember}
                     onChange={updateFormState}
                  />
                  <label htmlFor="remember">Remember me</label>
               </div>
               {error && <p>{error}</p>}
               <button type="submit">Log in</button>
               <hr />
               <Link href="/signup">Don't have an account?</Link>
            </form>
         </main>
      </>
   );
}

interface LoginFormState {
   email: string;
   password: string;
   remember: boolean;
}
