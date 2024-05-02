import { useEffect, useState } from "react";
import authservice from "./appwrite/auth";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./Components";
import { Outlet } from "react-router-dom";

function App() {
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();
  const authStatus: boolean = useSelector((state: any) => state.auth.status);

  useEffect(() => {
    // Check if the user is logged in
    if (authStatus) {
      authservice
        .getCurrentUser()
        .then((userData) => {
          if (userData) {
            // User is logged in, dispatch login action

            dispatch(login({ userData }));
          } else {
            // User is not logged in, dispatch logout action
            dispatch(logout());
          }
        })

        .finally(() => {
          setisLoading(false);
        });
    }
  }, []);

  return !isLoading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
