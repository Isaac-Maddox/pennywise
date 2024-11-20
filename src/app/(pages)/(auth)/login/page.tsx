"use client";

import JSend from "@/app/api/JSend";
import { redirect } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

const initialFormState: LoginFormState = {
   email: "",
   password: "",
};

export default function LoginPage() {
   const [formState, setFormState] = useState<LoginFormState>(initialFormState);
   const [error, setError] = useState("");

   const submitForm = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const response = await fetch("/api/login", {
         method: "post",
         body: JSON.stringify(formState),
      });
      const data = await response.json();

      if (data.status === "success") {
         return redirect("/app");
      }

      if (data.status === "fail") {
         setError(data.data.message);
         return;
      }

      setError("We ran into trouble. Try again soon");
   };

   const updateFormState = (e: ChangeEvent<HTMLInputElement>) => {
      setFormState((old) => {
         return {
            ...old,
            [e.target.name]: e.target.value,
         };
      });
   };

   return (
      <form className="auth-form" onSubmit={(e) => submitForm(e)}>
         <h1>Log In</h1>
         <div className="form-control">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" value={formState.email} onChange={updateFormState} required />
         </div>
         <div className="form-control">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" value={formState.password} onChange={updateFormState} />
         </div>
         {error && <p>{error}</p>}
         <button type="submit">Log in</button>
      </form>
   );
}

interface LoginFormState {
   email: string;
   password: string;
}
