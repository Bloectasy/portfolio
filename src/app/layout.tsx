import { ThemeProvider } from '@context/ThemeProvider';
import { ThemeBody } from '@components/ThemeBody';
import './globals.css';

const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ThemeProvider>
      <html lang="en" className="md:mx-52">
        <meta charSet="UTF-8" />
        <title>Home | Bloectasy</title>
        <ThemeBody>{children}</ThemeBody>
      </html>
    </ThemeProvider>
  );
}

export default RootLayout;