import { FC } from "react";
import usePasswordToggle from "../../hooks/usePasswordToggle";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import URL from "../../db/url";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import SpinnerMini from "../../ui/utils/SpinnerMini";
import { useAppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import { BsFillShieldLockFill } from "react-icons/bs";
import bg from "../../images/Shape.png";

interface FormValues {
  email: string;
  password: string;
}

const TenantsLogin: FC = (): JSX.Element => {
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();
  const navigate = useNavigate();
  const { tenant } = useParams<{ tenant: string }>();
  const { setAccessToken, setRefreshToken, setTenant, handleRoleChange } =
    useAppContext();

  const validate = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
  });

  const handleFormSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    if (!tenant) {
      toast.error("Tenant is missing. Please contact support.");
      return;
    }

    const loginUrl = `/auth/tenants/${tenant}/login`;

    try {
      const res = await URL.post(loginUrl, {
        email: values.email,
        password: values.password,
      });

      // Set tokens
      const accessToken = res.headers["x-access-token"];
      const refreshToken = res.headers["x-refresh-token"];
      if (accessToken) {
        setAccessToken(accessToken);
        localStorage.setItem("accessToken", accessToken);
      }
      if (refreshToken) {
        setRefreshToken(refreshToken);
        localStorage.setItem("refreshToken", refreshToken);
      }

      // Save tenant to AppContext and localStorage
      setTenant(tenant);
      localStorage.setItem("tenant", tenant);

      // Handle first-time user login
      if (res.data.status === 202) {
        const resetToken = res.headers["x-reset-token"];
        localStorage.setItem("resetToken", resetToken);

        navigate("/change-password");
        toast.success("Change your password before proceeding");
        return;
      }

      // Extract role and set it globally
      const userRole = res.data.data?.role;
      const subRole = res.data.data.subRole?.name;
      if (userRole === "User" && subRole) {
        handleRoleChange(subRole);
      } else {
        handleRoleChange(userRole);
      }

      // Handle redirection based on role
      const redirectPath =
        userRole === "User" && subRole
          ? `/${subRole.toLowerCase()}/dashboard`
          : `/${userRole.toLowerCase()}/dashboard`;

      navigate(redirectPath);
      toast.success(
        `Welcome back ${userRole === "User" && subRole ? subRole : userRole}`
      );
    } catch (err) {
      toast.error("Wrong credentials, enter correct email and password");
      console.error(err);
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
  } = useFormik<FormValues>({
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
        className="absolute inset-0 bg-no-repeat bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      ></div>
      <div className="z-10 bg-white p-20 rounded-2xl shadow-lg w-full max-w-2xl flex flex-col gap-4">
        <div className="w-full flex justify-center">
          <Link to="/">
            <BsFillShieldLockFill className="text-blue-500 h-16 w-16" />
          </Link>
        </div>
        <h2 className="text-4xl text-gray-700 font-bold mb-2 text-center">
          Tenant Login
        </h2>
        <p className="text-gray-600 text-center text-xl mb-6">
          Please enter your email and password to continue
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
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

export default TenantsLogin;
