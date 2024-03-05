import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, RealTimeEditor, Select, Input } from "../index";
import service from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
interface postformProps {
  title: string;
  content: string;
  slug: string;
  featuredimage?: string;
  status: boolean;
  userId?: string;
}

function Postform({ post }: any) {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  // userdata
  const userData = useSelector((state: any) => state?.auth.userData);

  // handling post submit
  const submit = async (data: any) => {
    if (post) {
      const file = data.image[0]
        ? await service.uploadFile(data.image[0])
        : null;
      if (file) {
        await service.deleteFile(post?.featuredImage);
      }

      // aba naya xa vaney file upload huni vayo ani file ma kei value aauni vayo
      const dbPost = await service.updatePost(post?.$id, {
        ...data,
        featuredimage: file ? file?.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = data.image[0]
        ? await service.uploadFile(data.image[0])
        : null;

      if (file) {
        const fileId = file?.$id;
        data.featuredImage = fileId;
        const dbPost = await service.createPost({
          ...data,
          userId: userData.$id,
        });
        if (dbPost) navigate(`/post/${dbPost.$id}`);
      }
    }
  };

  return <div>Postform</div>;
}

export default Postform;
