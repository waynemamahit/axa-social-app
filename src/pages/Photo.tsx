import { Link, useParams } from "react-router-dom";
import useUserStore from "../stores/useUserStore";
import useAlbumStore from "../stores/useAlbumStore";
import Loader from "../components/Loader";
import { useEffect } from "react";
import usePhotoStore from "../stores/usePhotoStore";
import PhotoCard from "../components/PhotoCard";

export default function PhotoPage() {
  const params = useParams();
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
          Album by:{" "}
          <Link to={"user/" + selectedUser?.id} className="text-blue-500 font-medium">
            {selectedUser?.name}
          </Link>
        </p>
        <div className="divider"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          {photos.map((photo) => (
            <PhotoCard
              key={photo.id}
              thumbnailUrl={photo.thumbnailUrl}
              title={photo.title}
              url={photo.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
