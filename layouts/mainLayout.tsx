import { FC, ReactNode } from 'react';
import { AppBar, Toolbar, Link, IconButton } from '@mui/material';
import NextLink from 'next/link';
import { colors } from '@/styling/colors';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { alignProperty } from '@mui/material/styles/cssUtils';

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
					<IconButton color="primary" aria-label="add to shopping cart"></IconButton>
					<AddShoppingCartIcon />
				</Toolbar>
			</AppBar>
			{children}
		</>
	);
};

export default MainLayout;
