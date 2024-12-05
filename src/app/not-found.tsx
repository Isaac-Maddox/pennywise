import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BackLink from "./BackLink";

export const metadata: Metadata = {
   title: "404 | Pennywise",
};

export default function NotFound() {
   return (
      <>
         <Image height={0} width={0} className="not_found" src="/404_illustration.svg" alt="" />
         <div className="not_found_content">
            <h1>Page not found</h1>
            <p className="text-lg">We couldn&apos;t find what you were looking for.</p>
            <p>
               You can <BackLink>go back</BackLink> or <Link href="/app">go to your dashboard</Link>.
            </p>
         </div>
      </>
   );
}
