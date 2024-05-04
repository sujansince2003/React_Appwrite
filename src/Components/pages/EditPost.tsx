import { useEffect, useState } from "react";
import { Container, Postform } from "../index";
import service from "../../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPost] = useState<any>();
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post: any) => {
        if (post) setPost(post);
      });
    } else {
      navigate("/");
    }
  }, []);

  return post ? (
    <div className="py-8">
      <Container>
        <Postform post={post} slug={slug} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
