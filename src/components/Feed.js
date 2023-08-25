import { useState, useEffect, useRef, useContext } from "react";
 import styled from 'styled-components';
 import Post from "./Post";
 import axios from "axios";
 import { AuthContext } from "../contexts/AuthContext";

 const Feed = (props) => {
    const {user} = useContext(AuthContext);
    const [loadingNewPosts, setLoadingNewPosts] = useState(true);
    const [currPage, setCurrPage] = useState(1);
    const [prevPage, setPrevPage] = useState(0);
    const [posts, setPosts] = useState([]);
    const listInnerRef = useRef();
    const [wasLastList, setWasLastList] = useState(false);

    const axiosJWT = axios.create();

    useEffect(() => {
        if(props.rerenderFeed === 1){
            setCurrPage(1);
            setPrevPage(0);
            setPosts([]);
            setWasLastList(false);
        }
        props.onChange(0);
        const fetchPosts = async () => {
          const res = await axiosJWT.get(
            `http://localhost:8000/api/post/timeline`,
            {headers: {Authorization: "Bearer " + user.accessToken}}
          );

          if(res.data.posts.length === 1){
            setWasLastList(true);
            setLoadingNewPosts(false);
          }

          if(!res.data.posts.length){
            setWasLastList(true);
            setLoadingNewPosts(false);
            return;
          }
          setPrevPage(currPage);
          
          const sortedPosts = [...posts, ...res.data.posts].sort((p1,p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          });
          setPosts(sortedPosts);          
        };
        
          fetchPosts();        
    },[
      currPage,
      // wasLastList,
      prevPage,
      // posts,
      // loadingNewPosts,
      // axiosJWT,
      // user.accessToken,
      props
    ]);

    const onScroll = () => {
      if(listInnerRef.current){
        const {scrollTop, scrollHeight, clientHeight} = listInnerRef.current;
        
        if(scrollTop + clientHeight === scrollHeight){
          setCurrPage(currPage+1);
        }
      }
    };

    useEffect(() => {
      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
    }, [loadingNewPosts]);

    // posts.forEach((p) => {
    //   console.log(p);
    // })

    return(
        <>
            <FeedContainer>
                <div ref={listInnerRef} className="FeedWrapper">
                    {posts.map((p) => (
                            <Post 
                                key={p._id}
                                post={p}
                                rerenderFeed = {props.rerenderFeed}
                                onChange = {props.onChange}
                            />
                        )
                    )}
                </div>
            </FeedContainer>
        </>
    )
 }

 const FeedContainer = styled.div`
  width: 500px;
  .FeedWrapper {
    height: calc(100vh - 63px);
    overflow-y: auto;
    padding: 5px;
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background-color: #f1f1f1;
    }
    ::-webkit-scrollbar-thumb {
      background-color: rgb(192, 192, 192);
    }
  }
`;

export default Feed;