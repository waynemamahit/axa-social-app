import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import FormModal from "../components/FormModal";
import Loader from "../components/Loader";
import Textarea from "../components/Textarea";
import TextInput from "../components/TextInput";
import { FormMode, ModalType } from "../interfaces/Base";
import { CommentForm } from "../models/Comment";
import useCommentStore from "../stores/useCommentStore";
import usePostStore from "../stores/usePostStore";
import useUserStore from "../stores/useUserStore";
import { confirmMessage } from "../utils/message";

export default function PostPage() {
  const navigate = useNavigate();
  const params = useParams();
  const postId = Number(params?.postId ?? 0);
  const { selectedPost, postLoad, showPost } = usePostStore((state) => state);
  const { selectedUser, userLoad, showUser } = useUserStore((state) => state);
  const {
    comments,
    loading,
    getComments,
    deleteComment,
    addComment,
    updateComment,
    formLoad,
    formMode,
    setFormMode,
  } = useCommentStore((state) => state);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CommentForm>({
    defaultValues: new CommentForm(),
  });

  const onOpenForm = (mode: FormMode = "add", newForm = new CommentForm()) => {
    setValue("id", newForm.id);
    setValue("postId", newForm.postId);
    setValue("name", newForm.name);
    setValue("email", newForm.email);
    setValue("body", newForm.body);
    setFormMode(mode);
    (document.getElementById("commentForm") as ModalType)?.showModal();
  };

  const onSubmit = async (data: CommentForm) => {
    if (formMode === "add") {
      await addComment(Number(params?.postId ?? 0), data);
    } else {
      await updateComment(data.id, data);
    }
  };

  useEffect(() => {
    showPost(postId);
    showUser(Number(params?.userId ?? 0));
    getComments(postId);
  }, [getComments, params.postId, params?.userId, postId, showPost, showUser]);

  if (postLoad || userLoad) {
    return <Loader />;
  }

  return (
    <div className="card w-full">
      <div className="card-body">
        <h2 className="card-title text-4xl">{selectedPost?.title}</h2>
        <p>
          Album by:{" "}
          <button
            onClick={() => navigate(-1)}
            className="text-blue-500 font-medium cursor-pointer inline-block"
          >
            {selectedUser?.name}
          </button>
        </p>
        <p>{selectedPost?.body}</p>
        <div className="divider"></div>
        <div className="card card-bordered shadow-sm">
          <div className="card-body">
            <h3 className="text-4xl font-medium">
              Comments{" "}
              <button
                className="btn btn-circle bg-primary font-bold text-xl inline-block"
                onClick={() => onOpenForm()}
              >
                +
              </button>
            </h3>
            <FormModal
              id="commentForm"
              title={formMode + " Comment"}
              formLoad={formLoad}
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextInput<CommentForm>
                placeholder="Name"
                name="name"
                errors={errors.name}
                register={register}
              />
              <TextInput<CommentForm>
                placeholder="Email"
                type="email"
                name="email"
                errors={errors.email}
                register={register}
              />
              <Textarea<CommentForm>
                placeholder="Body"
                register={register}
                name="body"
                errors={errors?.body}
              />
            </FormModal>
            {loading ? (
              <Loader />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="card card-bordered bg-base-100 shadow-sm"
                  >
                    <div className="card-body">
                      <span className="card-title">{comment.name}</span>
                      <p>Comment by: {comment.email}</p>
                      <p>{comment.body}</p>
                      <div className="card-actions justify-end">
                        <button
                          className="btn btn-accent"
                          onClick={() => onOpenForm("edit", comment)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() =>
                            confirmMessage(deleteComment, comment.id)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
