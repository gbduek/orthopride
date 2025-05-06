import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	typography: {
		fontFamily: "Poppins, sans-serif",
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					backgroundImage:
						"linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
					minHeight: "100vh",
					margin: 0,
					padding: 0,
				},
			},
		},
	},
	custom: {
		gradientMain: "linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)",
	},
});

export default theme;
