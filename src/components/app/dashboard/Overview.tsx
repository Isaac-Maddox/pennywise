import Card from "@/components/Card";
import "@/css/components/overview.css";
import DividedList from "@/components/DividedList";
import { getTransactions } from "@/actions/transactions";
import { getStartOfMonth } from "@/utils/date";
import { CategoryWithTransactions, TransactionWithCategoryName } from "@/types";

export default async function Overview({ categories }: OverviewProps) {
   const { success, data: recentTransactions } = await getTransactions({
      category: true,
      range: { from: getStartOfMonth() },
   });

   if (!success) {
      return <h1>UR NUR</h1>;
   }

   const transactionData = generateTransactionsTable(recentTransactions);
   const categoryData = generateCategoryTable(categories);

   return (
      <div className="overview">
         <Card title="My Transactions" description="Your transactions this month" link={{ text: "See all for November", href: "/transactions" }}>
            <DividedList data={transactionData.data} total={transactionData.totals} rows={5} dashes={true} />
         </Card>
         <Card title="My Budget" description="How you're doing this month" link={{ text: "Edit budget", href: "/budget" }}>
            <DividedList data={categoryData.data} total={categoryData.totals} rows={5} dashes={true} />
         </Card>
      </div>
   );
}

function generateTransactionsTable(transactions: TransactionWithCategoryName[]) {
   const amount_sum = transactions.reduce((sum, transaction) => sum + transaction.amount, 0).toFixed(2);

   const data = transactions.map((transaction) => {
      return {
         date: transaction.purchasedAt.toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
         }),
         category: transaction.category.name,
         name: transaction.title,
         vendor: transaction.vendor,
         amount: transaction.amount.toFixed(2),
      };
   });

   return {
      totals: {
         amount: amount_sum,
      },
      data,
   };
}

function generateCategoryTable(categories: CategoryWithTransactions[]) {
   const budgeted_array = categories.map((category) => category.budget);
   const spent_array = categories.map((category) => category.transactions.reduce((sum, transaction) => sum + transaction.amount, 0));
   const remaining_array = budgeted_array.map((value, i) => value - spent_array[i]);

   const data = categories.map((category, i) => {
      return {
         category: category.name,
         "budgeted-amount": `$${budgeted_array[i].toFixed(2)}`,
         "spent-this-month": `$${spent_array[i].toFixed(2)}`,
         remaining: `$${remaining_array[i].toFixed(2)}`,
      };
   });

   return {
      totals: {
         "budgeted-amount": `$${budgeted_array.reduce((sum, amount) => sum + amount, 0).toFixed(2)}`,
         "spent-this-month": `$${spent_array.reduce((sum, amount) => sum + amount, 0).toFixed(2)}`,
         remaining: `$${remaining_array.reduce((sum, amount) => sum + amount, 0).toFixed(2)}`,
      },
      data,
   };
}

interface OverviewProps {
   categories: CategoryWithTransactions[];
}
