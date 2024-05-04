import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, RealTimeEditor, Select, Input } from "../index";
import service from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Postform({ post }: any) {
  // console.log(post);
  const navigate = useNavigate();
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
        featuredimage: post?.featuredimage || null,
        image: null,
      },
    });

  // userdata
  // const userData = useSelector((state: any) => state?.auth.userData);
  const { userData } = useSelector((state: any) => state.auth);
  // console.log(userData);
  // console.log(status);

  // handling post submit
  const submit = async (data: any) => {
    // console.log(data);
    if (post) {
      let newFile;

      /**
 if we get post as props then we are updating post,
 we already have given default values to our 


 */

      if (data.image) {
        //  if i dont  upload a image the data.image will be null
        newFile = data.image[0]
          ? await service.uploadFile(data.image[0])
          : null;
      }
      // console.log(newFile);
      if (newFile) {
        await service.deleteFile(post?.featuredimage);
      }

      // aba naya xa vaney file upload huni vayo ani file ma values  haru aauxa like $id
      const updatedPost = await service.updatePost(post?.$id, {
        ...data,
        featuredimage: newFile ? newFile?.$id : post?.featuredimage,
      });

      if (updatedPost) {
        navigate(`/post/${updatedPost.$id}`);
      }

      // for creating new
    } else {
      const file = await service.uploadFile(data.image[0]);

      if (file) {
        const fileId = file?.$id;
        data.featuredimage = fileId;
        const dbPost = await service.createPost({
          ...data,
          userId: userData.$id,
        });
        if (dbPost) navigate(`/post/${dbPost.$id}`);
      }
    }
  };

  // functionality to transform slug
  const slugTransform = useCallback((value: unknown) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s+/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title));

        //  slug is field name .input field jasko naam slug xa. aba    setValue("slug", slugTransform(value.title)); yo fucnstion le slug vitra slugTransform(value.title) yesko value set handinxa
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        {/*  we need to pass ref to Input component but when we use the register function from react-hook-form with the spread operator (...) in your Input component, it automatically passes a ref to the component. This is because react-hook-form uses the ref to register the input with the form, enabling it to track the input's value and handle form submission. */}
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e: any) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        {/* the onInput event handler is used to attach a function that will be called whenever the onInput event is fired on the element. This is particularly useful for implementing features like live search, real-time validation, or dynamically updating related fields based on user input. */}
        <RealTimeEditor
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={service.getFilePreview(post.featuredimage).toString()}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
          textClr={"text-black"}
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default Postform;

/**
 code note
 watch: continous monitor some field




 The deletion of the old featured image is based on the ID of the old image, which is stored in post?.featuredImage. This ID is used to identify and delete the specific file associated with the old featured image from the storage.

Here's a step-by-step breakdown to clarify:

Check if there's a new image to upload: The code checks if the form submission includes a new image (data.image[0]). If there is, it proceeds to upload this new image.

Upload the new image: If a new image is provided, it is uploaded using service.uploadFile(data.image[0]). This operation returns a file object (file) if the upload is successful.

Delete the old featured image: After successfully uploading the new image, the code then proceeds to delete the old featured image. This is done by calling service.deleteFile(post?.featuredImage). The post?.featuredImage is the ID of the old featured image that needs to be removed. This step is crucial for managing storage efficiently, as it ensures that the old image is no longer stored when it's replaced by a new one.

Update the post with the new file: Finally, the code updates the post to reference the new featured image. This is done by calling service.updatePost(post?.$id, {...data, featuredimage: file ? file?.$id : undefined}). The new featured image's ID (file?.$id) is used to update the post's record.

So, the deletion of the old featured image is not related to the newly uploaded image. Instead, it's a cleanup operation that removes the old image from storage after it has been replaced by a new one. This ensures that the storage is efficiently managed and that unused images are not taking up unnecessary space.





slug transformation process
we have two field slug and title. we watch title field and need to generate value in slug.in the title field if user gives space turn it onto dash i.e - 

 */
