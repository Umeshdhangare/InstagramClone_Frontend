import { useContext, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";

const EditProfile = (props) => {
	const naviagte = useNavigate();
	const { user, dispatch } = useContext(AuthContext);
	const [file, setFile] = useState();
	const [picture, setPicture] = useState(user.data.profilePicture);
	const [description, setDesciption] = useState(user.data.description);
	const [email, setEmail] = useState(user.data.email);
	const [username, setUsername] = useState(user.data.username);

	const axiosJWT = axios.create();
	const EditHandler = async (e) => {
		e.preventDefault();
		e.currentTarget.disabled = true;
		const updateData = { username, description, email };
		try {
			const formDataFile = new FormData();
			if (file) {
				formDataFile.append("file", file);
				formDataFile.append("upload_preset", "instagram_clone");
				formDataFile.append("cloud_name", "dudlzl6xx");
				const img = await axios.post(
					"https://api.cloudinary.com/v1_1/dudlzl6xx/image/upload",
					formDataFile
				);
				console.log(img);
				updateData.profilePicture = img.data.secure_url;
			}
			const res = axiosJWT.put(
				config.url + `user/${user.data._id}`,
				updateData,
				{
					headers: { Authorization: "Bearer " + user.accessToken },
				}
			);
			console.log(res);
			dispatch({ type: "UPDATE_DATE", payload: res.data });
			props.onClose();
			naviagte(`/profile/${username}`);
		} catch (error) {
			console.log(error);
			props.onClose();
		}
	};

	return (
		<>
			<EditProfileContainer>
				<div className="editProfileWrapper">
					<div className="editProfileLeft">
						<label className="fileUpload">
							<img
								src={picture ? picture : "../../images/defaultavatar.png"}
								alt=""
								className="editProfileLeftImg"
							/>
							<span className="shareOptionText">Choose Picture</span>
							<input
								style={{ display: "none" }}
								type="file"
								id="file"
								accept=".png,.jpg,.jpeg"
								onChange={(e) => {
									setFile(e.target.files[0]);
									// setPicture(URL.createObjectURL(e.target.files[0]));
								}}
							/>
						</label>
					</div>
					<div className="editProfileRight">
						<form className="editProfileBox">
							<div className="editProfileBoxInput">
								<input
									type="text"
									className="BoxInput"
									value={username}
									placeholder="Username"
									onChange={(e) => setUsername(e.target.value)}
								/>
							</div>
							<div className="editProfileBoxInput">
								<input
									type="textarea"
									className="BoxInput"
									value={description}
									placeholder="Bio"
									onChange={(e) => setDesciption(e.target.value)}
								/>
							</div>
							<div className="editProfileBoxInput">
								<input
									type="email"
									className="BoxInput"
									value={email}
									placeholder="Email"
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="editProfileBoxInput">
								<button className="editProfileButton" onClick={EditHandler}>
									Save
								</button>
							</div>
						</form>
					</div>
				</div>
			</EditProfileContainer>
		</>
	);
};

const EditProfileContainer = styled.div`
	padding: 9px;

	.editProfileLeftImg {
		width: 150px;
		display: block;
	}
	.editProfileWrapper {
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		flex-direction: column;
	}
	.editProfileBox {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		background-color: white;
		padding: 20px;
	}
	.editProfileBoxInput {
		padding-bottom: 10px;
	}
	.BoxInput {
		height: 30px;
		border-radius: 5px;
		border: 1px solid gray;
		font-size: 18px;
		padding-left: 10px;
	}
	.editProfileButton {
		height: 30px;
		border-radius: 10px;
		border: none;
		background-color: black;
		color: white;
		font-size: 16px;
		padding: 0 20px;
		cursor: pointer;
	}
	.shareOptionText {
		height: 20px;
		border-radius: 10px;
		border: none;
		background-color: #3b3b3b;
		color: white;
		font-size: 16px;
		padding: 0 20px;
		cursor: pointer;
	}
	.fileupload {
		cursor: pointer;
		display: flex;
		flex-direction: column;
		width: 150px;
		height: 150px;
	}
`;

export default EditProfile;
