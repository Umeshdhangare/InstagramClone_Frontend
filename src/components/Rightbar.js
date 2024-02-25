import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import config from "../config";

function Rightbar() {
	const { user, dispatch } = useContext(AuthContext);
	const [Followings, setFollowings] = useState([]);
	const username = user.data.username;

	const axiosJWT = axios.create();

	useEffect(() => {
		const getFollowings = async () => {
			try {
				const followingList = await axios.get(
					config.url + `user/followings/${username}`
				);
				setFollowings(followingList.data.followings);
			} catch (e) {
				console.log(e);
			}
		};
		getFollowings();
	}, [username]);

	return (
		<RightbarContainer>
			<div className="rightbarWrapper">
				<span className="rightbarFollowingTitle">Followings</span>
				<div className="rightbarFollowings">
					{Followings.map((f) => {
						return (
							<div key={f._id} className="rightbarFollowing">
								<div className="rightbarFollowingLeft">
									<Link
										style={{ textDecoration: "none", color: "#000000" }}
										to={`/profile/${f.username}`}
									>
										<img
											src={f.profilePicture}
											alt=""
											className="rightbarFollowingImg"
										/>
										<span className="rightbarFollowingName">{f.username}</span>
									</Link>
								</div>
								<div className="rightbarFollowingRight">
									<span
										className="rightbarFollowingAction"
										onClick={async () => {
											await axiosJWT.put(
												config.url + `user/${f.username}/unfollow`,
												{},
												{
													headers: {
														Authorization: "Bearer " + user.accessToken,
													},
												}
											);
											dispatch({ type: "UNFOLLOW", payload: f._id });
										}}
									>
										UNFOLLOW
									</span>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</RightbarContainer>
	);
}

const RightbarContainer = styled.div`
	width: 300px;
	height: calc(100vh - 63px);
	// position: sticky;
	top: 51px;
	padding-left: 10px;
	::-webkit-scrollbar {
		width: 3px;
	}
	::-webkit-scrollbar-track {
		background-color: #f1f1f1;
	}
	::-webkit-scrollbar-thumb {
		background-color: rgb(192, 192, 192);
	}
	.rightbarWrapper {
		padding: 10px 10px;
	}
	.rightbarFollowingTitle {
		padding-left: 10px;
		font-size: 18px;
		font-weight: bold;
	}
	.rightbarFollowings {
		display: flex;
		padding-top: 5px;
		flex-direction: column;
	}
	.rightbarFollowing {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 5px;
	}
	.rightbarfollowingLeft {
		display: flex;
		align-items: center;
	}
	.rightbarFollowingImg {
		padding-left: 5px;
		width: 60px;
		height: 60px;
		border-radius: 50%;
		object-fit: cover;
		cursor: pointer;
	}
	.rightbarFollowingName {
		padding-left: 10px;
		font-size: 15px;
		font-weight: bold;
	}
	.rightbarfollowingRight {
		display: flex;
	}
	.rightbarFollowingAction {
		font-size: 15px;
		color: rgb(0, 149, 246);
		cursor: pointer;
	}
	.rightbarFollowingAction:hover {
		font-size: 16px;
		font-weight: 500;
		color: rgb(0, 149, 246);
		cursor: pointer;
	}
	@media (max-width: 780px) {
		display: none;
	}
`;

export default Rightbar;
