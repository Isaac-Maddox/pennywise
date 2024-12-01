import { CategoryWithTransactions } from "@/types";
import BudgetChart from "../BudgetChart";
import { Category, User } from "@prisma/client";

export default async function Header({ user, categories }: HeaderProps) {
   let totalSpent = 0;
   let totalBudget = 0;

   const categoryElements = [];

   const now = new Date();
   const currentDate = now.getDate();
   const daysInMonth = new Date(now.getFullYear(), now.getMonth() - 1, 0).getDate();
   const daysLeft = daysInMonth - currentDate - 1;
   const multiplier = daysLeft / currentDate + 1;

   for (const category of categories) {
      let categoryTotal = 0;

      for (const transaction of category.transactions) {
         categoryTotal += transaction.amount;
      }

      totalSpent += categoryTotal;
      totalBudget += category.budget;

      if (categoryElements.length < 4)
         categoryElements.push(
            <BudgetChart
               name={category.name}
               amount={categoryTotal}
               multiplier={multiplier}
               budget={category.budget}
               color={category.color}
            />
         );
   }

   const daily = totalSpent / Math.max(currentDate - 1, 1);
   const onTrack = daysLeft * daily + totalSpent <= totalBudget;

   return (
      <header>
         <div>
            <h1>Welcome Back, {user.firstName}</h1>
            <p className="text-lg">
               We&apos;re glad to see you back.
               {onTrack
                  ? " You're doing good on your budget this month. "
                  : " You're projected to go over budget this month! "}
               There {daysLeft === 1 ? ` is ${daysLeft} more day` : ` are ${daysLeft} more days`} to go and you&apos;ve
               used {Math.round((totalSpent / totalBudget) * 100)}% of your budget!
            </p>
            <button className="outline">Budget breakdown</button>
         </div>
         <div className="header-charts">
            <BudgetChart
               size="large"
               name="Total budget"
               amount={totalSpent}
               multiplier={multiplier}
               budget={totalBudget}
            />
            {/* {categories.map((category) => {
               return (
                  <BudgetChart name={category.name} amount={category.transactions} multiplier={multiplier} budget={totalBudget} />
               );
            })} */}
            {categoryElements}
         </div>
      </header>
   );
}

interface HeaderProps {
   user: User;
   categories: CategoryWithTransactions[];
}
