import "@/css/global.css";

export default function RootLayout({ children }: { children: React.ReactNode[] }) {
   return (
      <html>
         <head>
            <link rel="preconnect" href="https://fonts.googleapis.com/" />
            <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin="" />
            <link
               href="https://fonts.googleapis.com/css2?family=Onest:wght@100..900&family=Sora:wght@100..800&display=swap"
               rel="stylesheet"
            />
         </head>
         <body>{children}</body>
      </html>
   );
}
