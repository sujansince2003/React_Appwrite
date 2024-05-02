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
                      onClick={() => {
                        navigate(item.slug);
                      }}
                    >
                      {item.name}
                    </Button>
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

/**
 Key Differences
Navigation Trigger: Link is used for declarative navigation (i.e., when the user clicks a link), while useNavigate is used for programmatic navigation (i.e., when you want to navigate in response to an event or action).
Rendering: Link renders an anchor tag in the DOM, making it visible and clickable by the user. useNavigate does not render anything; it's a hook that provides a function to navigate.
Use Case: Use Link for standard navigation links in your UI. Use useNavigate when you need to navigate in response to events other than link clicks, such as form submissions or button clicks or when user login navigates to home page like that..
 */
