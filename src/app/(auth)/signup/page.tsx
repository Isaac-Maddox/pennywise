"use client";

import { signup } from "@/actions/auth";
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

      const { success, message } = await signup(formState);

      if (success) {
         redirect("/login");
      } else {
         setError(message);
      }
   };

   return (
      <form className="auth-form" action="/signup" method="post" onSubmit={(e) => submitForm(e)}>
         <h1>Sign up</h1>

         <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
               type="text"
               name="email"
               id="email"
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
            />
         </div>

         <div className="form-control">
            <label htmlFor="lastName">Last name</label>
            <input type="text" name="lastName" id="lastName" value={formState.lastName} onChange={handleFormChange} />
         </div>

         <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
               type="password"
               name="password"
               id="password"
               value={formState.password}
               onChange={handleFormChange}
            />
         </div>

         <div className="form-control">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
               type="password"
               name="confirmPassword"
               id="confirmPassword"
               value={formState.confirmPassword}
               onChange={handleFormChange}
            />
         </div>

         <button type="submit">Sign up</button>
         {error && <p>{error}</p>}
         <hr />
         <Link href="/login">Have an account?</Link>
      </form>
   );
}

interface SignupFormState {
   email: string;
   firstName: string;
   lastName: string;
   password: string;
   confirmPassword: string;
}
