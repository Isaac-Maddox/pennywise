import { redirect } from "next/navigation";

export default async function LogoutPage() {
   await fetch("/api/logout");
   redirect("/login");
}
