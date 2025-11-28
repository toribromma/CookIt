import "./globals.css";
import AppProvider from "../components/providers/AppProvider";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"] });

export const metadata = {
  title: "Meal Muse",
  description: "Search deterministic recipes, save favorites, and build your shopping list.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={playfair.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
