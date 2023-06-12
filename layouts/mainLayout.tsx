import { FC, ReactNode } from 'react';
import { AppBar, Toolbar, Link } from '@mui/material';
import NextLink from 'next/link';
import { colors } from '@/styling/colors';

interface Props {
	children: ReactNode;
}

const MainLayout: FC<Props> = ({ children }) => {
	return (
		<>
			<AppBar position="sticky">
				<Toolbar>
					<Link component={NextLink} href="/" underline="none" fontSize="32px" color={colors.white}>
						Store App
					</Link>
				</Toolbar>
			</AppBar>
			{children}
		</>
	);
};

export default MainLayout;
