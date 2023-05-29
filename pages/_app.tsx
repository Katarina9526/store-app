import DataProvider from '@/providers/dataProvider';
import { mainTheme } from '@/styling/themes';
import { ThemeProvider } from '@mui/material';
import { AppProps } from 'next/app';
import 'styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<DataProvider>
			<ThemeProvider theme={mainTheme}>
				<Component {...pageProps} />
			</ThemeProvider>
		</DataProvider>
	);
}
