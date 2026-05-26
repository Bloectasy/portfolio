'use client';

import { useTheme } from '@context/ThemeProvider';

export function ThemeBody({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <body className={`${theme} transition-colors duration-300`}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </body>
  );
}
