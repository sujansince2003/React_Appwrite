import { useState, useEffect } from "react";
import { PostCard, Container } from "../index";

import service from "../../appwrite/config";
import { useSelector } from "react-redux";

function Home() {
  const authStatus: boolean = useSelector((state: any) => state.auth.status);
  const [posts, setPosts] = useState<any[]>([]);
  useEffect(() => {
    //   getting all posts  ::listdocuments from appwrite comes in array
    if (authStatus) {
      service.getAllPost([]).then((posts) => {
        if (posts) setPosts(posts.documents);
      });
    }
  }, []);
  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts?.map((post) => (
            <div key={post.$id} className="p-2 w-1/2">
              <PostCard
                $id={post.$id}
                title={post.title}
                featuredimage={post.featuredimage}
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
