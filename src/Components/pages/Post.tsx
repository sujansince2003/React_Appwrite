import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../../appwrite/config";
import { Button, Container } from "../index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState<any>(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state: any) => state.auth.userData);

  const isAuthor = post && userData ? post?.userId === userData?.$id : false;

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    service.deletePost(post.$id).then((deletedStatus) => {
      if (deletedStatus) {
        service.deleteFile(post.featuredimage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={service.getFilePreview(post.featuredimage).toString()}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}

/**
 When you use a real-time editor package in your application, the content you create and save using that editor is typically stored in the form of HTML, not plain text. This is because real-time editors often allow users to apply various formatting options to their text, such as making text bold, italic, changing font sizes, adding links, and more. These formatting options are represented using HTML tags and attributes.


 html-react-parser is a library used in React applications to parse HTML strings into React components. This is particularly useful in scenarios where you need to render HTML content that is stored as a string, such as content fetched from a database or an API, and you want to ensure that this content is rendered safely and correctly as part of your React application.



 
 */
