'use client';

import { useTheme } from '@context/ThemeProvider';

export function ThemeBody({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <body className={`${theme} transition-colors duration-300`}>
      {children}
    </body>
  );
}
