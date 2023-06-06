import { createTheme } from '@mui/material';

export const mainTheme = createTheme({
	components: {
		MuiCard: {
			styleOverrides: {
				root: {
					height: '100%',
					borderRadius: '12px',
				},
			},
		},
		MuiCardActionArea: {
			styleOverrides: {
				root: {
					height: '100%',
				},
			},
		},
		MuiCardMedia: {
			styleOverrides: {
				root: {
					height: '240px',
					backgroundSize: 'contain',
					margin: '8px',
				},
			},
		},
	},
});
