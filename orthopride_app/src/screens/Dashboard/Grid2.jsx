import { Grid, Typography, Box, Divider, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { motion } from "framer-motion";
import { cardHoverAnimation } from "../../components/Animations";

const Item = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(2),
	color: theme.palette.text.primary,
	borderRadius: 12,
	boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
	fontFamily: "Poppins",
}));

const Grid2 = ({ th }) => (
	<Grid
		container
		item
		xs={12}
		md={6}
		direction="row"
		spacing={2}
		justifyContent={"center"}
	>
		<motion.div whileHover={cardHoverAnimation}>
			<Grid item xs={12} md={6}>
				<Item
					sx={{
						borderTop: "8px solid",
						borderImage: `${th.custom.gradientMain} 1`,
						height: 240,
						width: 700,
					}}
				>
					<Typography variant="h5" fontWeight="bold" gutterBottom>
						Desempenho
					</Typography>
					<Box sx={{ height: "100%", backgroundColor: "#f5f5f5" }} />
				</Item>
			</Grid>
		</motion.div>

		<Grid item xs={12} md={6}>
			<motion.div whileHover={cardHoverAnimation}>
				<Item
					sx={{
						borderTop: "8px solid",
						borderImage: `${th.custom.gradientMain} 1`,
						width: 700,
					}}
				>
					<Typography variant="h5" fontWeight="bold" gutterBottom>
						Próximas Consultas
					</Typography>
					<Divider />
					<Grid
						container
						direction={"row"}
						justifyContent={"space-around"}
					>
						<Typography fontWeight="bold">Paciente</Typography>
						<Typography fontWeight="bold">Data</Typography>
						<Typography fontWeight="bold">Hora</Typography>
						<Typography fontWeight="bold">Status</Typography>
					</Grid>
					<Divider />
					{[
						["Maria Santos", "17/04/2025", "08:00", "Confirmado"],
						["João Oliveira", "17/04/2025", "10:30", "Pendente"],
						["Ana Pereira", "17/04/2025", "11:45", "Confirmado"],
						["Carlos Souza", "17/04/2025", "14:15", "Confirmado"],
						["Pedro Alves", "18/04/2025", "09:00", "Confirmado"],
					].map(([paciente, data, hora, status], idx) => (
						<Box
							key={idx}
							display="flex"
							justifyContent="space-around"
							alignItems="center"
							py={1}
						>
							<Typography variant="body2">{paciente}</Typography>
							<Typography variant="body2">{data}</Typography>
							<Typography variant="body2">{hora}</Typography>
							<Chip
								size="small"
								label={status}
								color={
									status === "Pendente"
										? "warning"
										: "success"
								}
							/>
						</Box>
					))}
				</Item>
			</motion.div>
		</Grid>
	</Grid>
);

export default Grid2;
