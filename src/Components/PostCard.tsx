import { Link } from "react-router-dom";
import service from "../appwrite/config";

export interface PostCardProps {
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

/**
 * NOTES
 The $id is a convention used by Appwrite to represent the unique identifier (ID) of a document. When you create a document in Appwrite, it automatically assigns a unique ID to that document. This ID is what you're referring to as $id in your component.

Appwrite uses the $ prefix to denote system-generated fields or properties. In the context of documents, $id is the system-generated unique identifier for each document. This convention helps distinguish between user-defined fields and system-generated fields in the document's data structure.

When you fetch documents from Appwrite, each document object returned by the API will include this $id among its properties. You can then use this $id to create unique URLs for each document, allowing users to navigate to specific pages based on the document's ID.

When you fetch posts from Appwrite, each post object returned by the API will include this unique ID. You then pass this ID as a prop to your PostCard component to create a unique URL for each post. This allows users to navigate to a specific post's page by clicking on the post card.

Here's a simplified example of how you might fetch posts from Appwrite and render them using the PostCard component:

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import service from '../appwrite/config';

function PostsList() {
 const [posts, setPosts] = useState([]);

 useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await service.listDocuments('posts');
        setPosts(response.documents);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
 }, []);
 return (
    <div>
      {posts.map(post => (
        <PostCard
          key={post.$id}
          $id={post.$id}
          title={post.title}
          featuredimage={post.featuredimage}
        />
      ))}
    </div>
 );
}

export default PostsList;
 */
