import Header from "./Header";
import Overview from "./Overview";
import "@/css/pages/dashboard.css";
import { SafeUser } from "@/types";
import { getCategoryData } from "@/actions/category";
import { Suspense } from "react";
import { getStartOfMonth } from "@/utils/date";
import { redirect } from "next/navigation";

export default async function DashboardPage({ user }: DashboardPageProps) {
   const startOfMonth = getStartOfMonth();

   const { success, data: categories } = await getCategoryData({ transactions: true, range: { from: startOfMonth } });

   if (!success) {
      redirect("/error");
   }

   return (
      <div className="dashboard">
         <Header user={user} categories={categories} />
         <Suspense fallback={<></>}>
            <Overview />
         </Suspense>
      </div>
   );
}

interface DashboardPageProps {
   user: SafeUser;
}
