import Card from "@/components/Card";
import { CategoryWithTransactions, SafeUser } from "@/types";
import "@/css/components/overview.css";
import DividedList from "@/components/DividedList";
import { getTransactions } from "@/actions/transactions";

export default async function Overview({ user, categories }: OverviewProps) {
   const now = new Date();
   const { success, data: recentTransactions } = await getTransactions({
      category: true,
      range: { from: new Date(now.getFullYear(), now.getMonth(), 1) },
   });

   if (!success) {
      return <h1>UR NUR</h1>;
   }

   const data = recentTransactions.map((transaction) => {
      return {
         date: transaction.purchasedAt.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
         }),
         category: transaction.category.name,
         name: transaction.title,
         vendor: transaction.vendor,
         amount: `$${transaction.amount}`,
      };
   });

   const total = {
      amount: `$${recentTransactions
         .reduce((previous, current) => {
            return previous + current.amount;
         }, 0)
         .toFixed(2)}`,
   };

   return (
      <div className="overview">
         <Card
            title="My Transactions"
            description="Your transactions this month"
            link={{ text: "See all for November", href: "/transactions" }}>
            <DividedList
               fallback={<p className="text-dim">No transactions to display!</p>}
               data={data}
               total={total}
               rows={5}
               dashes={true}
            />
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
   user: SafeUser;
   categories: CategoryWithTransactions[];
}
