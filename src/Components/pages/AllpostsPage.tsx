import { useState, useEffect } from "react";
import service from "../../appwrite/config";

import { PostCard, Container } from "../index";

function AllpostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  useEffect(() => {
    //   getting all posts  ::listdocuments from appwrite comes in array
    service.getAllPost([]).then((posts) => {
      if (posts) setPosts(posts.documents);
    });
  }, []);

  return (
    <div className="py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts?.map((post) => (
            <div>
              <PostCard
                key={post.$id}
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

export default AllpostsPage;
