"use client";

import Link from "next/link";

export default function BackLink({ children }: { children: React.ReactNode }) {
   return (
      <Link
         href="#"
         onClick={(e) => {
            e.preventDefault();
            history.back();
         }}>
         {children}
      </Link>
   );
}
