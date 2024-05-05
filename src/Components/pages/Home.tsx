import { useEffect } from "react";
import { PostCard, Container } from "../index";

import service from "../../appwrite/config";
import { useSelector, useDispatch } from "react-redux";
import { setreduxPosts } from "../../store/postSlice";

function Home() {
  const authStatus: boolean = useSelector((state: any) => state.auth.status);
  const { reduxposts } = useSelector((state: any) => state.reduxposts);
  const dispatch = useDispatch();

  // const [posts, setPosts] = useState<any[]>([]);
  useEffect(() => {
    //   getting all posts  ::listdocuments from appwrite comes in array
    if (authStatus) {
      service.getAllPost([]).then((posts) => {
        if (posts) dispatch(setreduxPosts(posts.documents));
      });
    }
  }, []);
  if (reduxposts.length === 0) {
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
          {reduxposts?.map((post: any) => (
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

/**Based on our discussion and the code snippets you've shared, here's a summary for your notes:

### Summary of Using Redux for State Management in React Applications

#### Overview
- Redux is a state management library for React applications, providing a centralized store for managing application state.
- It enforces a strict unidirectional data flow, making state updates predictable and easier to debug.

#### Benefits of Using Redux
- **Centralized State Management:** Simplifies state management by providing a single source of truth for the application's state.
- **Predictability:** Ensures that state changes are predictable and easier to track, reducing bugs related to state management.
- **Scalability:** Well-suited for large applications with complex state interactions, as it scales with the application's needs.
- **DevTools Integration:** Offers powerful debugging capabilities through integration with Redux DevTools.
- **Flexibility and Ecosystem:** Supports a wide range of use cases and integrates well with other libraries and frameworks.

#### Considerations
- **Complexity:** Setting up and using Redux adds complexity to the application, which might be unnecessary for very simple applications.
- **Learning Curve:** There's a learning curve associated with understanding Redux, actions, reducers, and how to structure an application with Redux.

#### Comparison with Local State Management
- **Simplicity vs. Scalability:** Local state management with `useState` is simpler and more straightforward, suitable for smaller applications or beginners. Redux offers more robust state management features but comes with added complexity.
- **Direct Control vs. Centralized Control:** Local state management offers direct control over state, while Redux centralizes state management, making it easier to manage and debug state changes across the application.

#### Conclusion
- **For Simple Applications or Learning:** Use local state management with `useState` for simplicity and ease of learning.
- **For Complex Applications or Production:** Use Redux for its robust state management capabilities, scalability, and predictability.

This summary encapsulates the key points discussed regarding the use of Redux for state management in React applications, highlighting its benefits, considerations, and comparison with local state management. */
