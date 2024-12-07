import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import React from "react";
import "@/css/components/card.css";

export default function Card({ title, description, link, children }: CardProps) {
   return (
      <div className="card">
         <div className="card-header">
            <h2>{title}</h2>
            {description ? <p className="text-lg description">{description}</p> : ""}
            {link ? <Link href={link.href}>{link.text}</Link> : ""}
         </div>
         <div className="card-body">{children}</div>
      </div>
   );
}

interface CardProps {
   title: string;
   children?: React.ReactNode;
   description?: string;
   link?: {
      text: string;
      href: Url;
   };
}
