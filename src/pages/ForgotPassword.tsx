import { FC } from "react";
import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import SpinnerMini from "../ui/utils/SpinnerMini";
import URL from "../db/url";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

/**
 * ChangePassword Component
 *
 * This functional component renders a password change form for users. It includes inputs for the
 * new password and the confirmation password, each with a toggle for visibility. Upon submission,
 * it handles the form data for updating the password.
 *
 * @component
 * @returns {JSX.Element} A JSX element representing the password change form.
 *
 * @example
 * <ChangePassword />
 *
 * @dependencies
 * - usePasswordToggle: A custom hook that provides the input type (password/text) and toggle icon for password fields.
 *
 * @state
 * - newPasswordInputType (string): The type of the new password input (password or text).
 * - newPasswordToggleIcon (JSX.Element): The icon for toggling new password visibility.
 * - confirmPasswordInputType (string): The type of the confirm password input (password or text).
 * - confirmPasswordToggleIcon (JSX.Element): The icon for toggling confirm password visibility.
 * - newPassword (string): The value of the new password input.
 * - confirmPassword (string): The value of the confirm password input.
 *
 * @event
 * - handleSubmit: Handles form submission, preventing the default behavior and logging the passwords.
 */

interface FormValues {
  email: string;
}

const forgotPasswordUrl = "/auth/forgot-password";

const ForgotPassword: FC = (): JSX.Element => {
  // const [newPasswordInputType, newPasswordToggleIcon] = usePasswordToggle();

  const navigate = useNavigate();

  // Validation of Inputed Details
  const validate = Yup.object({
    email: Yup.string().email().required("Required"),
  });

  // Form Submission
  const handleFormSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    // const accessToken = localStorage.getItem("accessToken");
    // const refreshToken = localStorage.getItem("refreshToken");
    // const resetToken = localStorage.getItem("resetToken");
    // if (!accessToken) {
    //   toast.error("Session expired, please log in again.");
    //   navigate("/login", { replace: true });
    //   return;
    // }
    // const accessToken = localStorage.getItem("authToken");
    // const config = {
    //   headers: {
    //     "x-access-token": accessToken,
    //   },
    // };

    try {
      // const accessToken = localStorage.getItem("authToken")

      const res = await URL.post(
        forgotPasswordUrl,
        {
          email: values.email,
        },
        {
          headers: {
            // "x-access-token": accessToken, // Include token in the header
            // "x-refresh-token": refreshToken, // Include token in the header
            // "x-reset-token": resetToken, // Include token in the header
          },
        }
      );

      console.log(res);
      toast.success("A reset link has been sent to your mail!");
      navigate("/password-confirmation");
    } catch (err) {
      toast.error("Error submitting link, try again!");
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
  } = useFormik<{ email: string }>({
    initialValues: {
      email: "",
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
          Forgot Password?
        </h2>
        <p className="text-gray-600 text-center text-xl mb-6">
          A reset link will be sent to your mail
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <div className="relative">
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
              className=" w-full px-4 py-3 text-2xl rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-xl"
              placeholder="Enter your email"
            />
            {errors.email && touched.email && (
              <span className="text-xl text-red-500">{errors.email}</span>
            )}
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-3/4 flex items-center justify-center bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              {isSubmitting ? <SpinnerMini /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
