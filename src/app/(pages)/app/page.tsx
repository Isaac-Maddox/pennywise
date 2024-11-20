import Link from "next/link";

export default async function AppHome() {
   return (
      <>
         <h1>You are logged in</h1>
         <Link href="/logout">Log out</Link>
      </>
   );
}
