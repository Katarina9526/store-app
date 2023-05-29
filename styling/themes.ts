import { createTheme } from '@mui/material';

export const mainTheme = createTheme({
	components: {
		MuiCard: {
			styleOverrides: {
				root: {
					height: '100%',
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
					height: '140px',
				},
			},
		},
	},
});
