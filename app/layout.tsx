import './globals.css';
import { Provider } from 'react-redux';
import store from '../redux/store';

export const metadata = {
  title: 'My Next.js App',
  description: 'A modern Next.js app with Redux Toolkit',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
