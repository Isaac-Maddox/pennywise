import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
   return {
      name: "Pennywise Finance",
      short_name: "Pennywise",
      description: "Finance tracking app",
      start_url: "/app",
      display: "standalone",
      background_color: "#fff",
      theme_color: "#2d2d86",
      icons: [
         {
            src: "/app_icon.svg",
            sizes: "any"
         }
      ]
   }
}