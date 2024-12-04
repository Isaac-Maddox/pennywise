import Card from "@/components/Card";
import { CategoryWithTransactions } from "@/types";
import { User } from "@prisma/client";
import "@/css/components/overview.css";
import DividedList from "@/components/DividedList";

export default function Overview({ user, categories }: OverviewProps) {
   const headers = ["date", "category", "name", "where", "amount"];
   const data = [
      {
         date: "11/24",
         category: "Food",
         name: "Sunday brunch",
         where: "First Watch",
         amount: "$46.00",
      },
      {
         date: "11/23",
         category: "Food",
         name: "Saturday Dinner",
         where: "Bubba's 33",
         amount: "$52.00",
      },
      {
         date: "11/23",
         category: "Groceries",
         name: "Groceries for the week",
         amount: "$33.72",
      },
   ];
   const total = {
      amount: "$150.00",
      name: "Name",
   };

   return (
      <div className="overview">
         <Card
            title="My Transactions"
            description="Your most recent transactions"
            // link={{ text: "See all for November", href: "/transactions" }}>
         >
            <DividedList data={data} total={total} />
         </Card>
         <Card title="My Budget" description="How you're doing this month" link={{ text: "Edit budget", href: "/budget" }}>
            Budget list here
         </Card>
      </div>
   );
}

interface OverviewProps {
   user: User;
   categories: CategoryWithTransactions[];
}
