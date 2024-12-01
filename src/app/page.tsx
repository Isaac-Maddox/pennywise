import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
   title: "PennyWise",
   description: "Budgeting app",
};

export default function Home() {
   redirect("/app");

   return (
      <>
         <Link href="/app">Go to App</Link>
      </>
   );
}
