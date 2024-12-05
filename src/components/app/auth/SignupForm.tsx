"use client";

import { signup } from "@/actions/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

const initialFormState: SignupFormState = {
   email: "",
   firstName: "",
   lastName: "",
   password: "",
   confirmPassword: "",
};

export default function SignupForm() {
   const [formState, setFormState] = useState<SignupFormState>(initialFormState);
   const [isProcessing, setIsProcessing] = useState(false);
   const [error, setError] = useState("");
   const router = useRouter();

   const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
      setError("");
      setFormState((old) => {
         return {
            ...old,
            [e.target.name]: e.target.value,
         };
      });
   };

   const submitForm = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError("");

      try {
         setIsProcessing(true);

         if (formState.password !== formState.confirmPassword) {
            setError("Passwords do not match");
            setIsProcessing(false);
            return;
         }

         const { success, message } = await signup(formState);

         if (success) {
            router.push("/login");
         } else {
            setError(message);
         }
      } catch {
         setError("We're having problems... Try again in a bit!");
      } finally {
         setIsProcessing(false);
      }
   };

   return (
      <form className="auth-form" action="/signup" method="post" onSubmit={(e) => submitForm(e)}>
         <h2>Sign up</h2>

         <div className="form-control">
            <label htmlFor="email">
               Email<span>*</span>
            </label>
            <input type="email" name="email" id="email" className={error && error.includes("email") ? "error" : ""} value={formState.email} onChange={handleFormChange} required autoFocus />
         </div>

         <div className="form-group">
            <div className="form-control">
               <label htmlFor="firstName">
                  First name<span>*</span>
               </label>
               <input type="text" name="firstName" id="firstName" value={formState.firstName} onChange={handleFormChange} required />
            </div>
            <div className="form-control">
               <label htmlFor="lastName">
                  Last name<span>*</span>
               </label>
               <input type="text" name="lastName" id="lastName" value={formState.lastName} onChange={handleFormChange} required />
            </div>
         </div>

         <div className="form-group">
            <div className="form-control">
               <label htmlFor="password">
                  Password<span>*</span>
               </label>
               <input type="password" name="password" id="password" className={error && error.includes("Password") ? "error" : ""} value={formState.password} onChange={handleFormChange} required />
            </div>
            <div className="form-control">
               <label htmlFor="confirmPassword">
                  Confirm password<span>*</span>
               </label>
               <input type="password" name="confirmPassword" id="confirmPassword" className={error && error.includes("Password") ? "error" : ""} value={formState.confirmPassword} onChange={handleFormChange} required />
            </div>
         </div>

         {error && <p className="text-error">{error}</p>}
         <button type="submit" disabled={isProcessing}>
            {!isProcessing ? "Sign up" : "Processing..."}
         </button>
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
