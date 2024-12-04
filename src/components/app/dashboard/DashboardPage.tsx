import { getAllCategories } from "@/actions/category";
import { User } from "@prisma/client";
import Header from "./Header";
import Overview from "./Overview";
import "@/css/pages/dashboard.css";

export default async function DashboardPage({ user }: DashboardPageProps) {
   const { success, data: categories } = await getAllCategories();

   if (!success) {
      return <h1>Error</h1>;
   }

   return (
      <div className="dashboard">
         <Header user={user} categories={categories} />
         <Overview user={user} categories={categories} />
      </div>
   );
}

interface DashboardPageProps {
   user: User;
}
