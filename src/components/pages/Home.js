import styled from "styled-components";
import Feed from "../Feed";
import Rightbar from "../Rightbar";
import Topbar from "../Topbar";

import "react-notifications/lib/notifications.css";

function Home(props) {
	return (
		<>
			<Topbar rerenderFeed={props.rerenderFeed} onChange={props.onChange} />
			<HomeContainer>
				<Feed rerenderFeed={props.rerenderFeed} onChange={props.onChange} />
				<Rightbar />
			</HomeContainer>
		</>
	);
}

const HomeContainer = styled.div`
	display: flex;
	width: 100%;
	justify-content: center;
`;

export default Home;
