import "@/css/global.css";

export default function RootLayout({ children }: { children: React.ReactNode[] }) {
   return (
      <html>
         <link rel="icon" href="/logo_icon__dark.svg" sizes="any" media="(prefers-color-scheme: dark)" />
         <link rel="icon" href="/logo_icon__light.svg" sizes="any" media="(prefers-color-scheme: light)" />
         <body>{children}</body>
      </html>
   );
}
