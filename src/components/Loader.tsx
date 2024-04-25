export default function Loader({
  sizeClass = "loading-lg",
}: {
  sizeClass?: string;
}) {
  return (
    <div className="text-center my-8">
      <span className={"loading loading-spinner " + sizeClass}></span>
    </div>
  );
}
