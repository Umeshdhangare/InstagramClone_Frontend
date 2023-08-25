import {useState, useContext, useEffect} from "react";
import styled from 'styled-components';
import { FiMoreVertical } from "react-icons/fi";
import { AuthContext } from "../contexts/AuthContext";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "./UI/Modal";
import ShowPost from "./ShowPost";
import Backdrop from "./UI/Backdrop";
import {NotificationManager} from 'react-notifications';
import config from '../config';

const Post = (props) => {
    const post = props.post;
    const {user} = useContext(AuthContext);
    const [likes, setLikes] = useState(post.likes?.length);  
    const [isliked, setIsliked] = useState(false);
    const [showPost, setShowPost] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [countComments, setCountComments] = useState(post.comments?.length);
    const axiosJWT = axios.create();

    const deleteHandler = async () => {
      try {
        await axiosJWT.delete(
          config.url + `comment/${post._id}`,
          {headers: {Authorization: "Bearer " + user.accessToken}}
        );
        NotificationManager.success("Success","Post has been deleted", 3000);
        props.onChange(1);
        } catch(error) {
          NotificationManager.warning("Warning", error);
        }
    };

    const likeHandler = async () => {
      try{
        await axiosJWT.get(
          config.url + `post/${post._id}/like`,
          {headers: {Authorization: "Bearer " + user.accessToken}}
        );
      } catch(error){
        NotificationManager.warning("Warning", error);
      }

      setLikes(isliked ? likes-1 : likes+1);
      setIsliked(!isliked);
    }

    const showMenuHandler = async () => {
      setShowMenu(!showMenu);
    }

    const commentHandler = () => {
      setCountComments(countComments+1);
    }

    return(
        <>  
        {showMenu && <Backdrop onClose={showMenuHandler}/>}
        <Modal onClose={() => {
          setShowPost(false);
        }}>
        {showPost && <ShowPost post={post} newComment={commentHandler} />}  
        </Modal>
        <PostContainer>
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={`/profile/${post.user.username}`}>
                      <img 
                        src={post.user.profilePicture}
                        alt=""
                        className="postProfileImg"
                      />
                    </Link>
                    <Link style={{textDecoration:"none", color:"#000000"}}
                      to={`/profile/${post.user.username}`}
                    >
                      <span className="postUsername">{post.user.username}</span>
                    </Link>
                    {/* <span className="postDate">{}</span> */}
                </div>
                <div className="postTopRight">
                  <FiMoreVertical onClick={() => {
                    setShowMenu(!showMenu)
                  }}/>
                  {showMenu && (
                    <div className="topRightPanel" onClick={deleteHandler}>
                      Delete
                    </div>
                  )}
                </div>
            </div>
            <hr className="hrh"/>
            <div className="postcenter">
              <p className="postText">{post.description}</p>
              <div className="postImgWrapper">
                <img
                  src={post.imgurl}
                  alt=""
                  className="postImg"
                />
              </div>
            </div>
            <hr className="hrh" />
            <div className="postBottom">
              <div className="postBottomLeft">
                <AiFillHeart onClick={likeHandler}
                  className="likeIcon"
                  color={isliked ? "red" : "#e0e0e0ed"}
                />
                <span className="postLikeCounter"
                  onClick={() => {
                    setShowPost(true);
                  }}
                >
                  {likes} Likes {countComments} Comments
                </span>
              </div>
            </div>
        </PostContainer>
        </>
    )
    
}

const PostContainer = styled.div`
  width: 99%;
  border-radius: 10px;
  border: 1px solid rgb(211, 211, 211);
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  margin-top: 10px;
  margin-bottom: 50px;
  .postTop {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
  }
  .postTopright {
    position: relative;
  }
  .topRightPanel {
    position: absolute;
    background-color: #eaeaea;
    width: 80px;
    height: 30px;
    right: 5px;
    z-index: 60;
    border-radius: 5px;
    border: 1px solid rgb(211, 211, 211);
    -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
    box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
    padding-top: 10px;
    text-align: center;
    &:hover {
      cursor: pointer;
    }
  }
  .postTopLeft {
    display: flex;
    align-items: center;
  }
  .postProfileImg {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }
  .postUsername {
    font-size: 15px;
    font-weight: 500;
    padding: 0 10px;
  }
  .postDate {
    font-size: 10px;
    font-weight: 500;
  }
  .postImgWrapper {
    padding-right: 3px;
    padding-left: 3px;
  }
  .postImg {
    padding-top: 5px;
    width: 100%;
    object-fit: contain;
  }
  .postCenter {
    display: flex;
    flex-direction: column;
  }
  .postText {
    padding-top: 5px;
    padding-bottom: 3px;
    font-weight: 400;
    font-size: 15px;
    padding-left: 4px;
  }
  .postBottom {
    padding-top: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 4px;
  }
  .postBottomLeft {
    display: flex;
    align-items: center;
    &:hover {
      cursor: pointer;
    }
  }
  .likeIcon {
    font-size: 30px;
    padding-right: 5px;
    cursor: pointer;
  }
  .postLikeCounter {
    font-size: 15px;
  }
  .hrh {
    opacity: 0.4;
  }
`;
export default Post;