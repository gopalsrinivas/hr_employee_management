import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../contexts/AuthContext";
import "./globals.css";

export const metadata = {
  title: "HR Employee Management",
  description: "Part 1 authentication setup"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
