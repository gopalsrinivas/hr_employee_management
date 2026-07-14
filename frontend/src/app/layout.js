import Providers from "./providers";
import "./globals.css";

export const metadata = {
  title: {
    default: "HR Employee Management System",
    template: "%s | HRMS"
  },
  description: "Enterprise HR employee management dashboard",
  icons: {
    icon: "/icon.svg"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
