// import { FC } from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
// import URL from "../../../db/url";
// import toast from "react-hot-toast";
// import { useQueryClient } from "@tanstack/react-query";
// import { capitalizeWords } from "../../../db/helperFunctions";

// /**
//  * CreateAdminModal component that provides a form to create a new admin.
//  * It includes fields for the admin's name, address, email, phone number, and a description.
//  * There are also buttons to close the modal and submit the form.
//  *
//  * @component
//  * @example
//  * <CreateAdminModal onClose={handleClose} />
//  *
//  * @param {Object} props - The props for the component.
//  * @param {Function} props.onClose - The function to call when the modal should be closed.
//  *
//  * @returns {JSX.Element} The rendered CreateAdminModal component containing the form and action buttons.
//  */

// interface AdminProps {
//   onClose: () => void;
// }

// interface FormData {
//   name: string;
//   email: string;
//   mobile: string;
//   address: string;
// }

// const createUrl = "/users";

// const CreateAdminModal: FC<AdminProps> = ({ onClose }) => {
//   const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
//   const queryClient = useQueryClient();

//   const onFormSubmit: SubmitHandler<FormData> = async (data) => {
//     try {
//       await URL.post(createUrl, {
//         name: capitalizeWords(data.name),
//         email: data.email,
//         mobile: data.mobile,
//         address: data.address,
//       });

//       toast.success("Admin Created");
//       onClose();
//       queryClient.invalidateQueries({
//         queryKey: ["admins"],
//       });
//     } catch (error) {
//       console.log(error);
//       toast.error("Error creating Admin, try again!");
//     }
//   };

//   return (
//     <>
//       <div className="flex justify-between items-center mb-8">
//         <h2 className="text-3xl font-semibold">Create New Contact</h2>
//       </div>

//       <form
//         onSubmit={handleSubmit(onFormSubmit)}
//         className="flex flex-col gap-3"
//       >
//         <div className="mb-4">
//           <label className="block text-gray-700 text-xl font-medium mb-1">
//             Contact Name
//           </label>
//           <input
//             type="text"
//             placeholder="Enter name"
//             className="w-full text-2xl border border-gray-300 bg-gray-50 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
//             {...register("name", {
//               required: "Contact Name is required",
//               pattern: {
//                 value: /^[A-ZA-z\s]+$/,
//                 message: "Contact name must only contain letters and spaces",
//               },
//             })}
//           />
//           {errors.name && (
//             <span className="text-red-500 text-lg">{errors.name.message}</span>
//           )}
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-xl font-medium mb-1">
//             Address
//           </label>
//           <input
//             type="text"
//             placeholder="Enter address"
//             className="w-full text-2xl border border-gray-300 bg-gray-50 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
//             {...register("address")}
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-xl font-medium mb-1">
//             Email
//           </label>
//           <input
//             type="email"
//             placeholder="Enter email"
//             className="w-full text-2xl border bg-gray-50 border-gray-300 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
//             {...register("email", {
//               required: "Email is required",
//               pattern: {
//                 value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                 message: "Enter a valid email address",
//               },
//             })}
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-xl font-medium mb-1">
//             Phone Number
//           </label>
//           <input
//             type="text"
//             placeholder="Enter Phone Number"
//             className="w-full text-2xl border bg-gray-50 border-gray-300 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
//             {...register("mobile", {
//               required: "Phone number is required",
//               pattern: {
//                 value: /^[+]?[0-9]{1,4}[-\s]?[0-9]{1,14}(?:x.+)?$/,
//                 message: "Please enter a valid phone number",
//               },
//             })}
//           />
//           {errors.mobile && (
//             <span className="text-red-500 text-lg">{errors.mobile.message}</span>
//           )}
//         </div>

//         <div className="flex justify-around mt-6">
//           <button
//             type="button"
//             onClick={onClose}
//             className="w-44 text-xl px-4 py-3 bg-gray-600  text-white rounded-md hover:bg-gray-700"
//           >
//             Close
//           </button>

//           <button
//             type="submit"
//             className="w-44 text-xl px-4 py-3 bg-blue-600  text-white rounded-md hover:bg-blue-700"
//           >
//             Create Contact
//           </button>
//         </div>
//       </form>
//     </>
//   );
// };

// export default CreateAdminModal;
