import { useEffect } from "react";
import { useParams } from "react-router-dom";
import AlbumList from "../components/AlbumList";
import Loader from "../components/Loader";
import UserCard from "../components/UserCard";
import useAlbumStore from "../stores/useAlbumStore";
import useUserStore from "../stores/useUserStore";

export default function UserPage() {
  const params = useParams();
  const { selectedUser, userLoad, showUser } = useUserStore((state) => state);
  const {
    albums,
    loading: albumLoad,
    getAlbums,
  } = useAlbumStore((state) => state);

  useEffect(() => {
    showUser(Number(params?.userId ?? 0));
    getAlbums(Number(params?.userId ?? 0));
  }, [getAlbums, params?.userId, showUser]);

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
      <div className="grid grid-cols-2 sm:grid-cols-1 mt-3">
        <AlbumList data={albums} loading={albumLoad} />
      </div>
    </UserCard>
  );
}
