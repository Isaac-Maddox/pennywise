import BudgetChartSkeleton from "@/components/skeletons/BudgetChartSkeleton";
import { User } from "@prisma/client";

export default function HeaderFallback({ user }: HeaderFallbackProps) {
   return (
      <header>
         <div>
            <h1>Welcome Back, {user.firstName}</h1>
            <p className="text-lg">We&apos;re glad to see you back. Give us a second while we crunch the numbers...</p>
            <button className="outline" disabled>
               Budget breakdown
            </button>
         </div>
         <div className="header-charts">
            <BudgetChartSkeleton size="large" />
            <BudgetChartSkeleton />
            <BudgetChartSkeleton />
            <BudgetChartSkeleton />
            <BudgetChartSkeleton />
         </div>
      </header>
   );
}

interface HeaderFallbackProps {
   user: User;
}
