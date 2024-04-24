import { useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import UserCard from "../components/UserCard";
import { IUser } from "../interfaces/User";
import useUserStore from "../stores/useUserStore";

export default function HomePage() {
  const { users, loading, getUsers } = useUserStore((state) => state);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className="card w-full">
      <div className="card-body">
        <h2 className="card-title">Users</h2>
        <div className="divider"></div>
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-2">
            {users.map(({ id, name, email }: IUser) => (
              <Link key={id} to={"/user/" + id}>
                <UserCard name={name} email={email} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
