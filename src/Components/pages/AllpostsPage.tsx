import { useEffect } from "react";
import service from "../../appwrite/config";

import { PostCard, Container } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { setreduxPosts } from "../../store/postSlice";

function AllpostsPage() {
  const dispatch = useDispatch();
  // using redux store

  const { reduxposts } = useSelector((state: any) => state.reduxposts);

  // we dont need this because we are using redux store for managing state of posts

  useEffect(() => {
    //   getting all posts  ::listdocuments from appwrite comes in array
    service.getAllPost([]).then((posts) => {
      if (posts) {
        // Dispatch the transformed posts to the Redux store
        dispatch(setreduxPosts(posts.documents));
      }
    });
  }, [dispatch]);

  return (
    <div className="py-8">
      <Container>
        <div className="flex flex-wrap">
          {reduxposts?.map((post: any) => (
            <PostCard
              key={post.$id}
              $id={post.$id}
              title={post.title}
              featuredimage={post.featuredimage}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllpostsPage;
