import { ReactNode } from "react";

export default function UserCard({
  children,
  name,
  email,
}: {
  children?: ReactNode;
  name: string;
  email: string;
}) {
  return (
    <div className="card card-bordered max-h-48 pl-2 pb-5 shadow-md">
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>Email: {email}</p>
        {children}
      </div>
    </div>
  );
}
