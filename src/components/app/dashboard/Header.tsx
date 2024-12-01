import { getQuickSummary } from "@/actions/transactions";
import BudgetChart from "../BudgetChart";
import { User } from "@prisma/client";

export default async function Header({ user }: HeaderProps) {
   const data = await getQuickSummary();

   if (!data.success) {
      // TODO: something
      return <h1>Error</h1>;
   }

   const { totalSpent, totalBudget } = data.data;

   const now = new Date();
   const currentDate = now.getDate() + 15;
   const daysInMonth = new Date(now.getFullYear(), now.getMonth() - 1, 0).getDate();
   const daysLeft = daysInMonth - currentDate - 1;

   const daily = totalSpent / Math.max(currentDate - 1, 1);
   const onTrack = daysLeft * daily + totalSpent <= totalBudget;
   const multiplier = daysLeft / currentDate + 1;

   return (
      <header>
         <div>
            <h1>Welcome Back, {user.firstName}</h1>
            <p className="text-lg">
               We&apos;re glad to see you back.
               {onTrack ? " You're doing good on your budget this month. " : " You're projected to go over budget this month! "}
               There {daysLeft === 1 ? ` is ${daysLeft} more day` : ` are ${daysLeft} more days`} to go and you&apos;ve used {Math.round((totalSpent / totalBudget) * 100)}% of your budget!
            </p>
            <button className="outline">Budget breakdown</button>
         </div>
         <div className="header-charts">
            <BudgetChart size="large" name="Total budget" amount={totalSpent} multiplier={multiplier} budget={totalBudget} />
            <BudgetChart name="Food" amount={520} multiplier={multiplier} budget={1000} />
            <BudgetChart name="Groceries" amount={760} multiplier={multiplier} budget={1000} />
            <BudgetChart name="Transportation" amount={810} multiplier={multiplier} budget={1000} />
            <BudgetChart name="Shopping" amount={660} multiplier={multiplier} budget={1000} />
         </div>
      </header>
   );
}

interface HeaderProps {
   user: User;
}
