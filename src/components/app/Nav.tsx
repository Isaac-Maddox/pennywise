"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
   const path = usePathname();

   const year = new Date().getFullYear();

   return (
      <nav>
         <NavLink href="/app" path={path}>
            Dashboard
         </NavLink>
         <NavLink href="/app/transactions" path={path}>
            Transactions
         </NavLink>
         <NavLink href="/app/budget" path={path}>
            My Budget
         </NavLink>
         <NavLink href="/app/recap" path={path}>
            My {year} Recap
         </NavLink>
      </nav>
   );
}

function NavLink({ href, path, children }: NavLinkProps) {
   return (
      <Link href={href} className={path === href ? "active" : ""}>
         {children}
      </Link>
   );
}

interface NavLinkProps {
   href: string;
   path: string;
   children: React.ReactNode;
}
