export default function PhotoCard({
  thumbnailUrl,
  title,
  url,
}: {
  thumbnailUrl: string;
  title: string;
  url: string;
}) {
  return (
    <div className="card card-side bg-base-100 shadow-xl min-w-20 overflow-auto">
      <img src={thumbnailUrl} alt="Thumbnail" />
      <div className="card-body">
        <h2 className="card-title text-2xl">{title}</h2>
        <p>
          Photo URL: <a className="font-medium text-blue-500" href={url}>{url}</a>
        </p>
      </div>
    </div>
  );
}
