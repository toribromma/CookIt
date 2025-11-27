import "./globals.css";
import AppProvider from "../components/providers/AppProvider";

export const metadata = {
  title: "CookIt",
  description: "Your recipe app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
