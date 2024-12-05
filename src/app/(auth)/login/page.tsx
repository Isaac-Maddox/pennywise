import LoginForm from "@/components/app/auth/LoginForm";
import { Outline } from "@/components/icons";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Log in | Pennywise",
   description: "Log in to your Pennywise account to get back where you left off",
};

export default function LoginPage() {
   return (
      <>
         <aside className="callout-card">
            <Outline />
            <h1>Welcome back to Pennywise!</h1>
            <p className="text-lg">We&apos;re glad to see you again! Log in and we&apos;ll get you back to where you left off last time.</p>
         </aside>
         <main>
            <LoginForm />
         </main>
      </>
   );
}
