import { getOverviewData } from "@/actions/overview";
import Card from "@/components/Card";
import DividedList from "@/components/DividedList";
import "@/css/components/overview.css";
import { redirect } from "next/navigation";

export default async function Overview() {
   const { success, data } = await getOverviewData();

   if (!success) {
      redirect("/error");
   }

   return (
      <div className="overview">
         <Card title="My Transactions" description="Your transactions this month" link={{ text: "See all for November", href: "/transactions" }}>
            <DividedList data={data.transactions} total={data.totals.transactions} dashes={true} rows={5} fallback={<p className="text-dim">No transactions for this month</p>} />
         </Card>
         <Card title="My Budget" description="How you're doing this month" link={{ text: "Edit budget", href: "/budget" }}>
            <DividedList data={data.budget} total={data.totals.budget} rows={5} />
         </Card>
      </div>
   );
}
