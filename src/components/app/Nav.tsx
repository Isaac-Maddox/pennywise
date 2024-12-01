"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo_Lettermark } from "../icons";

import "@/css/components/nav.css";
import { logout } from "@/actions/auth";

export default function Nav() {
   const path = usePathname();

   const year = new Date().getFullYear();

   return (
      <nav className="app-nav">
         <div className="app-nav-left">
            <Logo_Lettermark />
            <ul className="app-nav-links" role="list">
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
            </ul>
         </div>
         <ul className="app-nav-actions" role="list">
            <li>
               <button onClick={logout} className="outline">
                  Log out
               </button>
            </li>
            <li>
               <Link href="/" className="btn">
                  Transaction
               </Link>
            </li>
         </ul>
      </nav>
   );
}

function NavLink({ href, path, children }: NavLinkProps) {
   return (
      <li>
         <Link href={href} className={path === href ? "active" : ""}>
            {children}
         </Link>
      </li>
   );
}

interface NavLinkProps {
   href: string;
   path: string;
   children: React.ReactNode;
}
