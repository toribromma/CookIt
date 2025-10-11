import "./globals.css";

export const metadata = {
  title: "CookIt",
  description: "Your recipe app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
