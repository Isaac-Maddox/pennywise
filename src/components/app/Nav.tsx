"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Hamburger, Logo_Lettermark, X } from "../icons";

import "@/css/components/nav.css";
import { logout } from "@/actions/auth";
import { useEffect, useState } from "react";

export default function Nav() {
   const path = usePathname();
   const [isOpen, setIsOpen] = useState(false);
   const pathname = usePathname();

   const year = new Date().getFullYear();

   useEffect(() => {
      setIsOpen(false);
   }, [pathname]);

   return (
      <nav className={`app-nav${isOpen ? " drawer-open" : ""}`}>
         <Link href="/app" className="logo-link">
            <Logo_Lettermark />
         </Link>
         <div className="app-nav-drawer-wrapper">
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
         </div>
         <button className="app-nav-drawer-toggle icon" onClick={() => setIsOpen(!isOpen)}>
            <span className="visually-hidden">Toggle Nav Drawer</span>
            {isOpen ? <X /> : <Hamburger />}
         </button>
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
