import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import authservice from "../../appwrite/auth";

function Logoutbtn() {
  const dispatch = useDispatch();
  function handleLogout() {
    authservice.logout().then(() => dispatch(logout()));
    // first delete session with authservice then change status state in redux store
  }
  return (
    <>
      <button
        className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
        onClick={() => handleLogout()}
      >
        Logout
      </button>
    </>
  );
}

export default Logoutbtn;
