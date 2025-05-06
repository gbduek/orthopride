import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import "../css/login.css";
import "../css/zenn-colors.css";

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [remember, setRemember] = useState(false);
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const { user, login, setIsAuth } = useAuth();

	useEffect(() => {
		const savedUser = localStorage.getItem("user");
		if (savedUser) {
			setUsername(savedUser);
			setRemember(true);
		}
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		setError("");

		if (!username || !password) {
			setError("Por favor, preencha todos os campos.");
			return;
		}

		setLoading(true);

		setTimeout(() => {
			if (username === "ortho" && password === "123456") {
				if (remember) {
					localStorage.setItem("user", username);
				} else {
					localStorage.removeItem("user");
				}
			}
			setIsAuth(true);
			login({ username, password });
		}, 1500);
	};

	return (
		<div className="login-page">
			<div className="login-container">
				<div className="login-content">
					<div className="login-left">
						<div className="login-header">
							<img
								src="../src/assets/img/logo_horizontal.png"
								alt="Smart Zenn Digital"
								className="login-logo"
							/>
						</div>
						<div className="login-form-container">
							<h2>Bem-vindo!</h2>
							<p className="login-subtitle">
								Digite seus dados de acesso para entrar no
								sistema
							</p>

							<form
								className="login-form"
								onSubmit={handleSubmit}
							>
								<div className="form-group">
									<label htmlFor="username">Usuário</label>
									<div className="input-with-icon">
										<i className="fas fa-user"></i>
										<input
											type="text"
											id="username"
											name="username"
											placeholder="Login, E-mail, CPF ou Celular"
											value={username}
											onChange={(e) =>
												setUsername(e.target.value)
											}
											required
										/>
									</div>
								</div>

								<div className="form-group">
									<label htmlFor="password">Senha</label>
									<div className="input-with-icon">
										<i className="fas fa-lock"></i>
										<input
											type={
												showPassword
													? "text"
													: "password"
											}
											id="password"
											name="password"
											placeholder="Digite sua senha"
											value={password}
											onChange={(e) =>
												setPassword(e.target.value)
											}
											required
										/>
										<i
											className={`fas ${
												showPassword
													? "fa-eye-slash"
													: "fa-eye"
											} toggle-password`}
											onClick={() =>
												setShowPassword(!showPassword)
											}
											style={{ cursor: "pointer" }}
										></i>
									</div>
								</div>

								<div className="form-options">
									<div className="remember-me">
										<input
											type="checkbox"
											id="remember"
											name="remember"
											checked={remember}
											onChange={(e) =>
												setRemember(e.target.checked)
											}
										/>
										<label htmlFor="remember">
											Lembrar-me
										</label>
									</div>
									<a href="#" className="forgot-password">
										Esqueci minha senha
									</a>
								</div>

								{error && (
									<div className="login-error shake">
										{error}
									</div>
								)}

								<button
									type="submit"
									className="btn-login"
									disabled={loading}
								>
									{loading ? (
										<i className="fas fa-spinner fa-spin"></i>
									) : (
										"Entrar"
									)}
								</button>
							</form>

							<div className="login-footer">
								<p>
									Não tem uma conta?{" "}
									<a href="#" className="register-link">
										Solicitar acesso
									</a>
								</p>
							</div>
						</div>
					</div>

					<div className="login-right">
						<div className="features-container">
							<h2>
								Consultório Odontológico com Secretaria 100%
								Inteligência Artificial
							</h2>

							{[
								{
									icon: "fa-calendar-check",
									title: "Agendamento Automático",
									text: "Disponibilidade 24h para marcação e remarcação de consultas através de chatbot inteligente, sem intervenção humana.",
								},
								{
									icon: "fa-comments",
									title: "Comunicação Digital",
									text: "Lembretes automáticos via WhatsApp e SMS para confirmação de consultas, reduzindo faltas em até 85%.",
								},
								{
									icon: "fa-headset",
									title: "Atendimento Instantâneo",
									text: "Resposta imediata a dúvidas dos pacientes sobre procedimentos, valores e preparos pré-consulta.",
								},
								{
									icon: "fa-chart-line",
									title: "Gestão Completa",
									text: "Prontuários digitais, relatórios de produtividade e controle financeiro em tempo real com economia operacional de até 60%.",
								},
							].map((feature, index) => (
								<div className="feature-item" key={index}>
									<div className="feature-icon">
										<i
											className={`fas ${feature.icon}`}
										></i>
									</div>
									<div className="feature-text">
										<h3>{feature.title}</h3>
										<p>{feature.text}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
