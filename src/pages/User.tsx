import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import AlbumList from "../components/AlbumList";
import FormModal from "../components/FormModal";
import Loader from "../components/Loader";
import Textarea from "../components/Textarea";
import TextInput from "../components/TextInput";
import UserCard from "../components/UserCard";
import { FormMode, ModalType } from "../interfaces/Base";
import { PostForm } from "../models/Post";
import useAlbumStore from "../stores/useAlbumStore";
import usePostStore from "../stores/usePostStore";
import useUserStore from "../stores/useUserStore";
import { confirmMessage } from "../utils/message";

export default function UserPage() {
  const params = useParams();
  const userId = Number(params?.userId ?? 0);
  const { selectedUser, userLoad, showUser } = useUserStore((state) => state);
  const {
    posts,
    loading,
    getPosts,
    formMode,
    formLoad,
    setFormMode,
    addPost,
    updatePost,
    deletePost,
  } = usePostStore((state) => state);
  const {
    albums,
    loading: albumLoad,
    getAlbums,
  } = useAlbumStore((state) => state);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PostForm>({
    defaultValues: new PostForm(),
  });

  const onOpenForm = (mode: FormMode = "add", newForm = new PostForm()) => {
    setValue("id", newForm.id);
    setValue("userId", newForm.userId);
    setValue("title", newForm.title);
    setValue("body", newForm.body);
    setFormMode(mode);
    (document.getElementById("postForm") as ModalType)?.showModal();
  };

  const onSubmit = async (data: PostForm) => {
    if (formMode === "add") {
      await addPost(userId, data);
    } else {
      await updatePost(data.id, data);
    }
  };

  useEffect(() => {
    showUser(userId);
    getAlbums(userId);
    getPosts(userId);
  }, [getAlbums, getPosts, params.userId, showUser, userId]);

  if (userLoad) {
    return <Loader />;
  }

  return (
    <UserCard
      name={selectedUser?.name as string}
      email={selectedUser?.email as string}
    >
      <p>Username: {selectedUser?.username}</p>
      <p>Phone: {selectedUser?.phone}</p>
      <p>Website: {selectedUser?.website}</p>
      <span className="divider"></span>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <AlbumList data={albums} loading={albumLoad} />
        <div className="col-span-2">
          <div className="card card-bordered shadow-sm">
            <div className="card-body">
              <h3 className="text-4xl font-medium">
                Post{" "}
                <button
                  className="btn btn-circle bg-primary font-bold text-xl inline-block"
                  onClick={() => onOpenForm()}
                >
                  +
                </button>
              </h3>
              <FormModal
                id="postForm"
                title={formMode + " Post"}
                formLoad={formLoad}
                onSubmit={handleSubmit(onSubmit)}
              >
                <TextInput<PostForm>
                  placeholder="Title"
                  name="title"
                  errors={errors.title}
                  register={register}
                />
                <Textarea<PostForm>
                  placeholder="Body"
                  register={register}
                  name="body"
                  errors={errors?.body}
                />
              </FormModal>
              {loading ? (
                <Loader />
              ) : (
                posts.map((post) => (
                  <div
                    key={post.id}
                    className="card card-bordered bg-base-100 shadow-sm"
                  >
                    <div className="card-body">
                      <Link
                        to={"/user/" + params?.userId + "/post/" + post.id}
                        className="card-title text-blue-500"
                      >
                        {post.title}
                      </Link>
                      <p>{post.body}</p>
                      <div className="card-actions justify-end">
                        <button
                          className="btn btn-accent"
                          onClick={() => onOpenForm("edit", post)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => confirmMessage(deletePost, post.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </UserCard>
  );
}
