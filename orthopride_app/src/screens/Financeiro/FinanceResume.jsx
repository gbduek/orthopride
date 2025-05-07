import React from "react";
import {
	ArrowCircleUpOutlined,
	ArrowCircleDownOutlined,
	AttachMoney,
} from "@mui/icons-material";
import { Container, Card, CardContent, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";
import {
	cardHoverAnimation,
	iconEntranceAnimation,
} from "../../components/Animations";

const FinanceResume = ({ income, expense, total }) => {
	return (
		<Container
			maxWidth="lg"
			sx={{
				margin: "0 auto",
				paddingTop: "20px",
				display: "flex",
				justifyContent: "center",
			}}
		>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={4}>
					<motion.div whileHover={cardHoverAnimation}>
						<Card
							sx={{
								bgcolor: "rgba(66, 140, 70, 0.2)",
								borderRadius: "8px",
								boxShadow: 3,
								textAlign: "center",
								p: 2,
								minWidth: 300,
							}}
						>
							<CardContent>
								<Typography
									variant="h6"
									component="div"
									gutterBottom
								>
									Entradas
								</Typography>
								<motion.div animate={iconEntranceAnimation}>
									<ArrowCircleUpOutlined
										color="success"
										sx={{ fontSize: 60 }}
									/>
								</motion.div>
								<Typography
									variant="h5"
									component="div"
									color="textPrimary"
								>
									{income}
								</Typography>
							</CardContent>
						</Card>
					</motion.div>
				</Grid>
				<Grid item xs={12} sm={4}>
					<motion.div whileHover={cardHoverAnimation}>
						<Card
							sx={{
								bgcolor: "#ffebee",
								borderRadius: "8px",
								boxShadow: 3,
								textAlign: "center",
								p: 2,
								minWidth: 300,
							}}
						>
							<CardContent>
								<Typography
									variant="h6"
									component="div"
									gutterBottom
								>
									Saídas
								</Typography>
								<motion.div animate={iconEntranceAnimation}>
									<ArrowCircleDownOutlined
										color="error"
										sx={{ fontSize: 60 }}
									/>
								</motion.div>
								<Typography
									variant="h5"
									component="div"
									color="textPrimary"
								>
									{expense}
								</Typography>
							</CardContent>
						</Card>
					</motion.div>
				</Grid>
				<Grid item xs={12} sm={4}>
					<motion.div whileHover={cardHoverAnimation}>
						<Card
							sx={{
								bgcolor: "rgba(0, 0, 0, 0.1)",
								borderRadius: "8px",
								boxShadow: 3,
								textAlign: "center",
								p: 2,
								minWidth: 300,
							}}
						>
							<CardContent>
								<Typography
									variant="h6"
									component="div"
									gutterBottom
								>
									Total
								</Typography>
								<motion.div animate={iconEntranceAnimation}>
									<AttachMoney
										color="action"
										sx={{ fontSize: 60 }}
									/>
								</motion.div>
								<Typography
									variant="h5"
									component="div"
									color="textPrimary"
								>
									{total}
								</Typography>
							</CardContent>
						</Card>
					</motion.div>
				</Grid>
			</Grid>
		</Container>
	);
};

export default FinanceResume;
