import Nav from "@/components/app/Nav";

import "@/css/pages/app.css";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Dashboard | Pennywise",
};

export default async function AppLayout({ children }: { children: React.ReactNode[] }) {
   return (
      <>
         <Nav />
         <div className="app-page">{children}</div>
      </>
   );
}
