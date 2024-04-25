import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import useAlbumStore from "../stores/useAlbumStore";
import usePhotoStore from "../stores/usePhotoStore";
import useUserStore from "../stores/useUserStore";

export default function PhotoPage() {
  const params = useParams();
  const navigate = useNavigate();
  const { selectedUser, userLoad, showUser } = useUserStore((state) => state);
  const { selectedAlbum, albumLoad, showAlbum } = useAlbumStore(
    (state) => state
  );
  const { photos, getPhotos } = usePhotoStore((state) => state);

  useEffect(() => {
    showUser(Number(params?.userId ?? 0));
    showAlbum(Number(params?.albumId ?? 0));
    getPhotos(Number(params?.albumId ?? 0));
  }, [getPhotos, params?.albumId, params?.userId, showAlbum, showUser]);

  if (albumLoad || userLoad) {
    return <Loader />;
  }

  return (
    <div className="card w-full">
      <div className="card-body">
        <h2 className="card-title text-4xl">{selectedAlbum?.title}</h2>
        <p>
          Posted by:{" "}
          <button
            onClick={() => navigate(-1)}
            className="text-blue-500 font-medium cursor-pointer"
          >
            {selectedUser?.name}
          </button>
        </p>
        <div className="divider"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="card card-side bg-base-100 shadow-xl min-w-20 overflow-auto"
            >
              <img src={photo.thumbnailUrl} alt="Thumbnail" />
              <div className="card-body">
                <h2 className="card-title text-2xl">{photo.title}</h2>
                <p>
                  Photo URL:{" "}
                  <a className="font-medium text-blue-500" href={photo.url}>
                    {photo.url}
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
