"use client";

import { signup } from "@/actions/auth";
import { Outline } from "@/components/icons";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

const initialFormState: SignupFormState = {
   email: "",
   firstName: "",
   lastName: "",
   password: "",
   confirmPassword: "",
};

export default function SignupPage() {
   const [formState, setFormState] = useState<SignupFormState>(initialFormState);
   const [isProcessing, setIsProcessing] = useState(false);
   const [error, setError] = useState("");

   const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
      setFormState((old) => {
         return {
            ...old,
            [e.target.name]: e.target.value,
         };
      });
   };

   const submitForm = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setIsProcessing(true);

      if (formState.password !== formState.confirmPassword) {
         setError("Passwords do not match");
         setIsProcessing(false);
         return;
      }

      const { success, message } = await signup(formState);

      if (success) {
         redirect("/login");
      } else {
         setError(message);
      }

      setIsProcessing(false);
   };

   return (
      <>
         <aside className="callout-card">
            <Outline />
            <h1>Welcome to Pennywise!</h1>
            <p className="text-lg">
               Pennywise helps you get a grip on your finances with handy tools that make it easy to track and manage
               your monthly spending.
            </p>
         </aside>
         <main>
            <form className="auth-form" action="/signup" method="post" onSubmit={(e) => submitForm(e)}>
               <h1>Sign up</h1>

               <div className="form-control">
                  <label htmlFor="email">Email</label>
                  <input
                     type="email"
                     name="email"
                     id="email"
                     className={error && error.includes("email") ? "error" : ""}
                     value={formState.email}
                     onChange={handleFormChange}
                     required
                     autoFocus
                  />
               </div>

               <div className="form-control">
                  <label htmlFor="firstName">First name</label>
                  <input
                     type="text"
                     name="firstName"
                     id="firstName"
                     value={formState.firstName}
                     onChange={handleFormChange}
                     required
                  />
               </div>

               <div className="form-control">
                  <label htmlFor="lastName">Last name</label>
                  <input
                     type="text"
                     name="lastName"
                     id="lastName"
                     value={formState.lastName}
                     onChange={handleFormChange}
                     required
                  />
               </div>

               <div className="form-control">
                  <label htmlFor="password">Password</label>
                  <input
                     type="password"
                     name="password"
                     id="password"
                     className={error && error.includes("Password") ? "error" : ""}
                     value={formState.password}
                     onChange={handleFormChange}
                     required
                  />
               </div>

               <div className="form-control">
                  <label htmlFor="confirmPassword">Confirm password</label>
                  <input
                     type="password"
                     name="confirmPassword"
                     id="confirmPassword"
                     className={error && error.includes("Password") ? "error" : ""}
                     value={formState.confirmPassword}
                     onChange={handleFormChange}
                     required
                  />
               </div>

               {error && <p className="text-error">{error}</p>}
               <button type="submit" disabled={isProcessing}>
                  {!isProcessing ? "Sign up" : "Processing..."}
               </button>
               <hr />
               <Link href="/login">Have an account?</Link>
            </form>
         </main>
      </>
   );
}

interface SignupFormState {
   email: string;
   firstName: string;
   lastName: string;
   password: string;
   confirmPassword: string;
}
