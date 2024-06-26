import { useState } from "react";
import { Input, Button as LoginBtn, Logo } from "./index";
import { Link, useNavigate } from "react-router-dom";
import { login as Authlogin } from "../store/authSlice";
import authservice from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { useForm, FieldValues } from "react-hook-form";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  //   defining function to handle login

  const handlesignUp = async (data: FieldValues) => {
    setError("");
    try {
      const session = await authservice.createAccount(
        data as { name: string; email: string; password: string }
      );
      if (session) {
        const userData = await authservice.getCurrentUser();
        if (userData) dispatch(Authlogin(userData));
        navigate("/");
      } else {
      }
    } catch (error: any) {
      setError(error?.message);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center w-full">
        <div
          className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
        >
          <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
              <Logo width="100%" />
            </span>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight">
            Create your account
          </h2>
          <p className="mt-2 text-center text-base text-black/60">
            Already have an account?
            <Link
              to="/login"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Login
            </Link>
          </p>

          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          <form onSubmit={handleSubmit(handlesignUp)} className="mt-8">
            <div className="space-y-5">
              <Input
                label="Full Name: "
                placeholder="Enter your full name"
                {...register("name", {
                  required: true,
                })}
              />
              <Input
                label="Enter your email"
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              />
              <Input
                label="Enter your password"
                type="password"
                {...register("password", {
                  required: true,
                })}
              />
              <LoginBtn type="submit" className="w-full">
                Sign Up
              </LoginBtn>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
