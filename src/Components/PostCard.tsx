import { Link } from "react-router-dom";
import service from "../appwrite/config";

interface PostCardProps {
  $id: string;
  title: string;
  featuredimage: string;
}

function PostCard({ $id, title, featuredimage }: PostCardProps) {
  return (
    <>
      <Link to={`/post/${$id}`}>
        <div className="w-full bg-gray-100 rounded-xl">
          <div className="w-full flex justify-center mb-4">
            <img
              src={service.getFilePreview(featuredimage).toString()}
              alt=""
            />
          </div>
          <h2>{title}</h2>
        </div>
      </Link>
    </>
  );
}

export default PostCard;
