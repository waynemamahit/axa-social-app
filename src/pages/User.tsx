import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import UserCard from "../components/UserCard";
import useUserStore from "../stores/useUserStore";

export default function UserPage() {
  const params = useParams();
  const { selectedUser, userLoad, showUser } = useUserStore((state) => state);

  useEffect(() => {
    showUser(Number(params?.userId ?? 0) as number);
  }, [params?.userId, showUser]);

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
    </UserCard>
  );
}
