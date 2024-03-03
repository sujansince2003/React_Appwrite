import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Authlayout({
  authentication = true,
  children,
}: {
  authentication: boolean;
  children: any;
}) {
  const [isloading, setisLoading] = useState(true);
  const navigate = useNavigate();
  const authStatus: boolean = useSelector((state: any) => state.auth.status);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setisLoading(false);
  }, [authStatus, navigate, authentication]);

  return <>{isloading ? <h2>Loading....</h2> : <div>{children}</div>}</>;
}

export default Authlayout;
