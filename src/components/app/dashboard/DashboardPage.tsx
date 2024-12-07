import Header from "./Header";
import Overview from "./Overview";
import "@/css/pages/dashboard.css";
import { SafeUser } from "@/types";
import { getCategoryData } from "@/actions/category";
import { Suspense } from "react";

export default async function DashboardPage({ user }: DashboardPageProps) {
   const now = new Date();
   const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

   const { success, data: categories } = await getCategoryData({ transactions: true, range: { from: startOfMonth } });

   if (!success) {
      return <h1>Error</h1>;
   }

   return (
      <div className="dashboard">
         <Header user={user} categories={categories} />
         <Suspense fallback={<></>}>
            <Overview user={user} categories={categories} />
         </Suspense>
         <div style={{ height: "200vh" }}></div>
      </div>
   );
}

interface DashboardPageProps {
   user: SafeUser;
}
