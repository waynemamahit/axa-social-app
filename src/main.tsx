import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import AlbumPage from "./pages/Album.tsx";
import HomePage from "./pages/Home.tsx";
import PostPage from "./pages/Post.tsx";
import UserPage from "./pages/User.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/user/:userId",
    Component: UserPage,
  },
  {
    path: "/user/:userId/post/:postId",
    Component: PostPage,
  },
  {
    path: "/user/:userId/album/:albumId",
    Component: AlbumPage,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
