import { FC } from "react";
import usePasswordToggle from "../hooks/usePasswordToggle";
import { useFormik, FormikHelpers } from "formik";

import * as Yup from "yup";
import URL from "../db/url";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SpinnerMini from "../ui/SpinnerMini";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

/**
 * LoginPage Component
 *
 * This functional component renders a login page for users to sign in to their accounts.
 * It contains fields for entering an email address and password, a password visibility toggle,
 * and a submission button. It also includes a "Forgot Password?" link for users who need to reset their password.
 *
 * @component
 * @returns {JSX.Element} A JSX element representing the login page.
 *
 * @example
 * <LoginPage />
 *
 * @dependencies
 * - usePasswordToggle: A custom hook used to toggle password visibility.
 *
 */

interface FormValues {
  email: string;
  password: string;
}

const loginUrl = "/auth/login";

const LoginPage: FC = (): JSX.Element => {
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();
  const navigate = useNavigate();
  const { setAccessToken, setRefreshToken } = useAppContext();

  // Validation for input data
  const validate = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
  });

  // Form Submission
  const handleFormSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    try {
      const res = await URL.post(loginUrl, {
        email: values.email,
        password: values.password,
      });

      console.log(res);
      //Set Auth Token
      const accessToken = res.headers["x-access-token"];
      // console.log("accessToken => ", accessToken);

      if (accessToken) {
        setAccessToken(accessToken); //Save to Context
        localStorage.setItem("accessToken", accessToken);
      }

      // Set Refresh Token
      const refreshToken = res.headers["x-refresh-token"];
      // console.log("refreshToken =>", refreshToken);

      if (refreshToken) {
        setRefreshToken(refreshToken); //Save to context
        localStorage.setItem("refreshToken", refreshToken);
      }

      // If it's a first time User Login
      if (res.data.status === 202) {
        const resetToken = res.headers["x-reset-token"];
        localStorage.setItem("resetToken", resetToken);

        navigate("/change-password");
        toast.success("Change your password before proceeding");
        return;
      }

      //
      if (res.data.data.role === "Super User") {
        navigate("/home");
        toast.success("Logged in Successfully");
      }
    } catch (err) {
      toast.error("Wrong credentials, enter correct email and password");
      console.log(err);
    } finally {
      actions.resetForm();
    }
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik<{ email: string; password: string }>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validate,
    onSubmit: handleFormSubmit,
  });

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-blue-500">
      <div
        className={`absolute inset-0 bg-cover bg-center bg-[url("src/assets/Shape.png")]`}
      ></div>
      <div className="z-10 bg-white p-20 rounded-2xl shadow-lg w-full max-w-2xl flex flex-col gap-4">
        <h2 className="text-4xl text-gray-700 font-bold mb-2 text-center">
          Login to Account
        </h2>
        <p className="text-gray-600 text-center text-xl mb-6">
          Please enter your email and password to continue
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium text-2xl mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${
                errors.email && touched.email ? " border-red-400" : ""
              } w-full px-4 py-3 text-2xl rounded-lg bg-gray-50 focus:outline-none  placeholder:text-xl`}
              placeholder="Enter your email"
            />
            {errors.email && touched.email && (
              <span className="text-xl text-red-500">{errors.email}</span>
            )}
          </div>

          {/* Password Input */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium text-2xl mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type={PasswordInputType}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${
                errors.password && touched.password
                  ? "border-red-400 focus:ring-red-400"
                  : ""
              } w-full px-4 py-3 text-2xl  rounded-lg bg-gray-50 focus:outline-none  placeholder:text-xl`}
              placeholder="Enter your password"
            />

            <span
              className={`${
                errors.password && touched.password ? "bottom-[5.4rem]" : ""
              } absolute right-4 bottom-12 flex items-center cursor-pointer text-2xl`}
            >
              {ToggleIcon}
            </span>

            {errors.password && touched.password && (
              <span className="text-xl text-red-500">{errors.password}</span>
            )}

            <div className="flex justify-end mt-1">
              <Link
                to="/forgot-password"
                className="text-xl text-blue-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Login Button */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${
                isSubmitting ? "opacity-70" : ""
              } w-3/4 flex items-center justify-center bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300`}
            >
              {isSubmitting ? <SpinnerMini /> : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
