import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import config from "../../config";

const SignUp = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState();
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();

	const registerHandler = async (e) => {
		e.preventDefault();
		const data = { email, username, password };
		try {
			await axios.post(config.url + `user/signup`, data);
			navigate("/login");
		} catch (e) {
			console.log(e.message);
		}
	};

	return (
		<SignupContainer>
			<div className="signupWrapper">
				<div className="signupRight">
					<div className="signupRightTop">
						<div className="signupRightTopTop">
							<span className="signupRightTopLogo">Instagram</span>
						</div>
						<div className="signupRightTopForm">
							<form action="" className="signupBox" onSubmit={registerHandler}>
								<input
									onChange={(e) => setEmail(e.target.value)}
									placeholder="Email"
									type="email"
									required
									className="signupInput"
								/>

								<input
									onChange={(e) => setUsername(e.target.value)}
									placeholder="Username"
									type="text"
									required
									className="signupInput"
								/>

								<input
									onChange={(e) => setPassword(e.target.value)}
									placeholder="Password"
									type="password"
									required
									minLength="6"
									className="signupInput"
								/>

								<button className="signupButton">Sign UP</button>
							</form>
						</div>
					</div>
					<div className="signupRightBottom">
						<span>Already have an accounnt?</span>

						<Link to="/login" style={{ textDecoration: "none" }}>
							<span
								className="signUpText"
								onClick={() => {
									navigate("/login");
								}}
							>
								Log In
							</span>
						</Link>
					</div>
				</div>
			</div>
		</SignupContainer>
	);
};

const SignupContainer = styled.div`
    width: 100vw;
    display: flex;
    margin-top: 100px;
    justify-content: center;
    .signupRight {
        flex:1;
        display:flex;
        height: max-content;
        justify-content: center;
        flex-direction: column;
        max-width: 360px;
        border: 1px solid #d6d6d6
        padding: 10px;
        align-items: center;
        @media (max-width: 877px){
            justify-content: center
        }
    }
    .signupWrapper {
        width: 100%;
        height: 70%;
        display: flex;
        justify-content: center;
    }
    .signupRightWrapper {
        width: 360px;
        border: 1px solid rgb(224, 224, 224);
        border-radius: 3px;
        padding-bottom: 10px;
    }
    .signupRightTop {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .signupRightTopTop {
        display: flex;
        width: 100%;
        justify-content: center;
        margin: 35px 0;
    }

    .signupRightTopLogo {
        font-family: "Dancing Script", cursive;
        font-size: 60px;
        font-weight: bold;
    }

    .signupRightTopForm {
        display: flex;
        justify-cotent: center;
        width: 100%;
    }

    .signupRightBottom {
        display: flex;
        width: 70%;
        justify-content: space-between;
    }

    .signupBox {
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 100%;
        padding-bottom: 20px;
    }

    .signupInput {
        height: 30px;
        width: 100%;
        border-radius: 5px;
        border: 1px solid gray;
        font-size: 14px;
        margin-bottom: 10px;
        padding-left: 5px;
        padding-right: 5px;
    }

    .signupButton {
        margin-top: 10px;
        width: 100%;
        height: 25px;
        background-color: #0095fc;
        color: white;
        border-radius: 5px;
        border: none;
        font-size: 15px;
        cursor: pointer;
    }

    .signUpText {
        color: #0095f6;
        font-weight: 500;
    }
`;

export default SignUp;
