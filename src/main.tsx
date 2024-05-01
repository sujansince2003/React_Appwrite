import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Home,
  AllpostsPage,
  LoginPage,
  AddPost,
  EditPost,
  Post,
  SignupPage,
} from "./Components/pages/index";
import { Authlayout } from "./Components/index";
Authlayout;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: (
          <Authlayout authentication={false}>
            <LoginPage />
          </Authlayout>
        ),
      },
      {
        path: "signup",
        element: (
          <Authlayout authentication={false}>
            <SignupPage />
          </Authlayout>
        ),
      },
      {
        path: "allposts",
        element: (
          <Authlayout authentication={true}>
            <AllpostsPage />
          </Authlayout>
        ),
      },
      {
        path: "addpost",
        element: (
          <Authlayout authentication={true}>
            <AddPost />
          </Authlayout>
        ),
      },
      {
        path: "editpost/:slug",
        element: (
          <Authlayout authentication={true}>
            <EditPost />
          </Authlayout>
        ),
      },
      {
        path: "post/:slug",
        element: <Post />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
