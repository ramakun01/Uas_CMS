import './styles/globals.css';

export const metadata = {
  title: 'Next.js Supabase CRUD',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">{children}</body>
    </html>
  );
}
