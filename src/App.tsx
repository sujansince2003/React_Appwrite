import { useEffect, useState } from "react";
import authservice from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./Components";
import { Outlet } from "react-router-dom";

function App() {
  const [isLoading, setisLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if the user is logged in
    authservice
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          // User is logged in, dispatch login action

          dispatch(login({ userData }));
          console.log("login");
        } else {
          // User is not logged in, dispatch logout action
          dispatch(logout());
          console.log("logout");
        }
      })
      .catch((error) => {
        console.error("Failed to get current user:", error);
        // Handle error, e.g., by showing an error message or redirecting to a login page
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
      {/* <Header /> */}
      <>
        <h1>hello</h1>
      </>
      <main>{/* <Outlet /> */}</main>
      {/* <Footer /> */}
    </>
  );
}

export default App;
