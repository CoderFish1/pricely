import "./globals.css";

export const metadata = {
  title: "Pricely",
  description: "Don't miss the deals !!!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
