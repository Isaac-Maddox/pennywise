import { getAllCategories } from "@/actions/category";
import { User } from "@prisma/client";
import Header from "./Header";

export default async function DashboardPage({ user }: DashboardPageProps) {
   const { success, data: categories } = await getAllCategories();

   if (!success) {
      return <h1>Error</h1>;
   }

   return <Header user={user} categories={categories} />;
}

interface DashboardPageProps {
   user: User;
}
