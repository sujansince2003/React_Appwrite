import { useEffect, useState } from "react";
import authservice from "./appwrite/auth";

import "./App.css";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import { Header } from "./Components";

function App() {
  const [isLoading, setisLoading] = useState(true);
  const dispatch = useDispatch();

  // useEffect

  useEffect(() => {
    authservice
      .getCurrentUser()
      .then((userData: any) => {
        console.log(userData);
        if (userData) dispatch(login({ userData }));
        else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setisLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        {isLoading ? "loading" : "data has arrived"}
        Hello world!
      </h1>
      <Header />
    </>
  );
}

export default App;
