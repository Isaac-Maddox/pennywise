import SignupForm from "@/components/app/auth/SignupForm";
import { Outline } from "@/components/icons";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Sign up | Pennywise",
   description: "Create your Pennywise account today!",
};

export default function SignupPage() {
   return (
      <>
         <aside className="callout-card">
            <Outline />
            <h1>Welcome to Pennywise!</h1>
            <p className="text-lg">Pennywise helps you get a grip on your finances with handy tools that make it easy to track and manage your monthly spending.</p>
         </aside>
         <main>
            <SignupForm />
         </main>
      </>
   );
}
