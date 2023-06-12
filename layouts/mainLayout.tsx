import { FC, ReactNode } from 'react';
import { AppBar, Toolbar, Link } from '@mui/material';
import NextLink from 'next/link';

interface Props {
	children: ReactNode;
}

const MainLayout: FC<Props> = ({ children }) => {
	return (
		<>
			<AppBar position="sticky">
				<Toolbar>
					<Link component={NextLink} href="/" color="#FFFFFF">
						Store App
					</Link>
				</Toolbar>
			</AppBar>
			{children}
		</>
	);
};

export default MainLayout;
