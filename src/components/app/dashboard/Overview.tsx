import Card from "@/components/Card";
import { CategoryWithTransactions } from "@/types";
import { User } from "@prisma/client";
import "@/css/components/overview.css";
import DividedList from "@/components/DividedList";

export default function Overview({ user, categories }: OverviewProps) {
   const headers = ["date", "category", "name", "vendor", "amount"];
   const data = [
      {
         date: "11/24",
         category: "Food",
         name: "Sunday brunch",
         vendor: "First Watch",
         amount: "$46.00",
      },
      {
         date: "11/23",
         category: "Food",
         name: "Saturday Dinner",
         vendor: "Bubba's 33",
         amount: "$52.00",
      },
      {
         date: "11/23",
         category: "Groceries",
         name: "Groceries for the week",
         amount: "$33.72",
      },
      {
         date: "11/21",
         category: "Food",
         name: "Thursday night dinner",
         vendor: "Olive Garden",
         amount: "$60.00",
      },
      {
         date: "11/21",
         category: "Food",
         name: "Thursday night dinner",
         vendor: "Olive Garden",
         amount: "$60.00",
      },
      {
         date: "11/21",
         category: "Food",
         name: "Thursday night dinner",
         vendor: "Olive Garden",
         amount: "$60.00",
      },
      {
         date: "11/21",
         category: "Food",
         name: "Thursday night dinner",
         vendor: "Olive Garden",
         amount: "$60.00",
      },
      {
         date: "11/21",
         category: "Food",
         name: "Thursday night dinner",
         vendor: "Olive Garden",
         amount: "$60.00",
      },
      {
         date: "11/21",
         category: "Food",
         name: "Thursday night dinner",
         vendor: "Olive Garden",
         amount: "$60.00",
      },
      {
         date: "11/21",
         category: "Food",
         name: "Thursday night dinner",
         vendor: "Olive Garden",
         amount: "$60.00",
      },
      {
         date: "11/21",
         category: "Food",
         name: "Thursday night dinner",
         vendor: "Olive Garden",
         amount: "$60.00",
      },
      {
         date: "11/21",
         category: "Food",
         name: "Thursday night dinner",
         vendor: "Olive Garden",
         amount: "$60.00",
      },
      {
         date: "11/21",
         category: "Food",
         name: "Thursday night dinner",
         vendor: "Olive Garden",
         amount: "$60.00",
      },
      {
         date: "11/21",
         category: "Food",
         name: "Thursday night dinner",
         vendor: "Olive Garden",
         amount: "$60.00",
      },
      {
         date: "11/21",
         category: "Food",
         name: "Thursday night dinner",
         vendor: "Olive Garden",
         amount: "$60.00",
      },
      {
         date: "11/21",
         category: "Food",
         name: "Thursday night dinner",
         vendor: "Olive Garden",
         amount: "$60.00",
      },
      {
         date: "11/21",
         category: "Food",
         name: "Thursday night dinner",
         vendor: "Olive Garden",
         amount: "$60.00",
      },
      {
         date: "11/21",
         category: "Food",
         name: "Thursday night dinner",
         vendor: "Olive Garden",
         amount: "$60.00",
      },
      {
         date: "11/21",
         category: "Food",
         name: "Thursday night dinner",
         vendor: "Olive Garden",
         amount: "$60.00",
      },
   ];

   return (
      <div className="overview">
         <Card
            title="My Transactions"
            description="Your most recent transactions"
            link={{ text: "See all for November", href: "/transactions" }}>
            <DividedList headers={headers} data={data} rows={5} total={{ amount: "$1091.72" }} />
         </Card>
         <Card
            title="My Budget"
            description="How you're doing this month"
            link={{ text: "Edit budget", href: "/budget" }}>
            Budget list here
         </Card>
      </div>
   );
}

interface OverviewProps {
   user: User;
   categories: CategoryWithTransactions[];
}
