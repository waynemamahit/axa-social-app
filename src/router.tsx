import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import PhotoPage from "./pages/Photo";
import PostPage from "./pages/Post";
import UserPage from "./pages/User";
import MainLayout from './layouts/MainLayout';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        Component: HomePage,
      },
      {
        path: "/user/:userId",
        Component: UserPage,
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
        Component: PhotoPage,
      },
    ],
  },
]);

export default router;
