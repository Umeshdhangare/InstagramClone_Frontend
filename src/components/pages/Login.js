import React, { useState, useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config";

const Login = () => {
	const navigate = useNavigate();
	const username = useRef();
	const password = useRef();
	const { dispatch } = useContext(AuthContext);

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(config.url + `user/login`, {
				username: username.current.value,
				password: password.current.value,
			});
			const { message, status, ...other } = res.data;
			dispatch({ type: "LOGIN_SUCCESS", payload: other });
		} catch (error) {
			dispatch({ type: "LOGIN_FAILURE", payload: error });
		}
	};

	return (
		<LoginContainer>
			<div className="loginWrapper">
				<div className="loginLeft">
					<div className="frontImgWrapper">
						<img src="images/loginpage1.png" className="frontImg show" alt="" />
					</div>
				</div>
				<div className="loginRight">
					<div className="loginRightWrapper">
						<div className="loginRightTop">
							<div className="loginRightTopTop">
								<span className="loginRightTopLogo">Instagram</span>
							</div>
							<div className="loginRightTopForm">
								<form className="loginBox" onSubmit={handleLogin}>
									<input
										placeholder="Username"
										type="text"
										required
										className="loginInput"
										ref={username}
									/>
									<input
										placeholder="Password"
										type="password"
										required
										minLength="6"
										className="loginInput"
										ref={password}
									/>
									<button className="loginButton">Connect</button>
								</form>
							</div>
						</div>
						<div className="loginRightBottom">
							<center>
								<span></span>
							</center>
							<center>
								<span>Don't have an account?</span>
								<span
									className="SignUptext"
									onClick={() => {
										navigate("/signup");
									}}
								>
									Sign UP
								</span>
							</center>
						</div>
					</div>
				</div>
			</div>
		</LoginContainer>
	);
};

const LoginContainer = styled.div`
	width: 100vw;
	display: flex;
	margin-top: 100px;
	justify-content: center;
	.hide {
		opacity: 0;
		-webkit-transition: opacity 1.5s ease-out;
		transition: opacity 1.5s ease-out;
		visibility: visible;
	}
	.show {
		opacity: 1;
		-webkit-transition: opacity 1.5s ease-in;
		transition: opacity 1.5s ease-in;
		z-index: 2;
	}
	.loginWrapper {
		width: 100%;
		height: 70%;
		display: flex;
	}
	.loginLeft {
		flex: 1;
		display: flex;
		position: relative;
		width: 100%;
		height: 600px;
		background-image: url("/images/loginpage.png");
		min-width: 460px;
		background-repeat: no-repeat;
		background-position: right 2px;
		@media (max-width: 877px) {
			flex: 1;
			display: none;
		}
	}

	.frontImgWrapper {
		display: flex;
	}
	.frontImg {
		position: absolsute;
		top: 28px;
		right: 59px;
	}
	.loginRight {
		flex: 1;
		display: flex;
		height: max-content;
		@media (max-width: 877px) {
			justify-content: center;
		}
	}
	.loginRightWrapper {
		width: 360px;
		border: 1px solid rgb(224, 224, 224);
		border-radius: 3px;
		padding-bottom: 10px;
	}

	.loginRightTop {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.loginRightTopTop {
		display: flex;
		width: 100%;
		justify-content: center;
		margin: 35px 0;
	}

	.loginRightTopLogo {
		font-family: "Dancing Script", cursive;
		font-size: 60px;
		font-weight: bold;
	}

	.loginRightTopForm {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.loginBox {
		display: flex;
		align-items: center;
		flex-direction: column;
		width: 70%;
		padding-bottom: 20px;
	}

	.loginInput {
		height: 30px;
		width: 100%;
		border-radius: 5px;
		border: 1px solid gray;
		font-size: 14px;
		margin-bottom: 10px;
		padding: 0px 5px;
	}

	.loginButton {
		margin-top: 10px;
		width: 100%;
		height: 25px;
		background-color: #0095f6;
		color: white;
		border-radius: 5px;
		border: none;
		font-size: 15px;
		cursor: pointer;
	}

	.SignUptext {
		color: #0095f6;
		font-weight: 500;
		cursor: pointer;
	}
`;

export default Login;
