import { Link, useParams } from "react-router-dom";
import { IAlbum } from "../interfaces/Photo";
import Loader from "./Loader";

export default function AlbumList({
  data,
  loading,
}: {
  data: IAlbum[];
  loading: boolean;
}) {
  const { userId } = useParams();

  if (loading) {
    return <Loader />;
  }
  
  return (
    <div className="card card-bordered shadow-md">
      <div className="card-body">
        <h3 className="text-4xl font-medium">Albums</h3>
        {data.map((item) => (
          <Link to={`/user/${userId}/album/${item.id}`}>
            <h3 className="card-title text-blue-500 mt-4">{item.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
