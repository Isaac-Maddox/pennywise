// import { logout } from "@/actions/auth";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import BudgetChart from "@/components/app/BudgetChart";

export default async function AppHome() {
   const cookieStore = await cookies();
   const token = cookieStore.get("usrjwt")!.value;
   const user = jwt.decode(token) as User;

   return (
      <>
         <header>
            <div>
               <h1>Welcome Back, {user.firstName}</h1>
               <p className="text-lg">We&apos;re glad to see you back. You&apos;re doing good on your budget this month. There are 3 more days to go and you&apos;ve only used 79% of your budget!</p>
               <button className="outline">Budget breakdown</button>
            </div>
            <div>
               <BudgetChart name="Food" amount={100} budget={1000} />
            </div>
         </header>
      </>
   );
}
