import { Link, useNavigate } from "react-router-dom";
import { Container, Logo, Logoutbtn } from "../index";
import { useSelector } from "react-redux";
import Button from "../Button";

function Header() {
  const authStatus: boolean = useSelector((state: any) => state.auth.status);
  const navigate = useNavigate();

  const navitems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <>
      <header className="py-3 shadow bg-gray-500">
        <Container>
          <nav className="flex">
            <div className="mr-4">
              <Link to={"/"}>
                <Logo width="100px" />
              </Link>
            </div>
            <ul className="flex ml-auto">
              {navitems?.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <Button
                      btnText={item.name}
                      onClick={() => {
                        navigate(item.slug);
                      }}
                    />
                  </li>
                ) : null
              )}
              {authStatus && (
                <li>
                  <Logoutbtn />
                </li>
              )}
            </ul>
          </nav>
        </Container>
      </header>
    </>
  );
}

export default Header;
