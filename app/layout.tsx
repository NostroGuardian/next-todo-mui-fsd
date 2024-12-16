import type { Metadata } from 'next';

import { ReduxProvider } from '@/src/app/reduxProvider';
import theme from '@/src/shared/config/theme';
import { Header } from '@/src/widgets/Header';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

import './globals.css';

import { ThemeProvider } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-roboto',
});

export const metadata: Metadata = {
	title: 'ToDo App',
	description:
		'Simple ToDo App - NextJs / Redux Toolkit / MUI / React Hook Form / FSD / Axios',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={roboto.variable}>
				<ReduxProvider>
					<AppRouterCacheProvider>
						<ThemeProvider theme={theme}>
							<Header />
							{children}
						</ThemeProvider>
					</AppRouterCacheProvider>
				</ReduxProvider>
			</body>
		</html>
	);
}
