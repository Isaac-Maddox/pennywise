import { Metadata } from "next";

export const metadata: Metadata = {
   title: "PennyWise",
   description: "Budgeting app",
};

export default function Home() {
   return (
      <>
         <h1>Hello, World</h1>
         <p>This is PennyWise</p>
      </>
   );
}
