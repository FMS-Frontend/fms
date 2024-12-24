// import { FC, useState } from "react";
// import toast from "react-hot-toast";
// import { useAppContext } from "../../../../context/AppContext";
// import { createRule } from "../../../../services/managerServices";
// import { useQueryClient } from "@tanstack/react-query";


// interface CreateCaseFormProps {
//   onClose?: () => void; // Optional callback to close the form
// }

// const CreateRuleForm: FC<CreateCaseFormProps> = ({ onClose }) => {
//   const { tenant } = useAppContext(); // Get tenant ID from context
//   const [formData, setFormData] = useState({
//     description: "",
//     priority: "Low", 
//   });
//   const queryClient = useQueryClient();


//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.description.trim()) {
//       toast.error("Description is required.");
//       return;
//     }

//     try {
//       await createRule(tenant, formData);
//       toast.success("Case created successfully!");
//       queryClient.invalidateQueries({
//         queryKey: ["cases", tenant],
//       });
//       onClose?.();
//     } catch (error) {
//       console.error("Failed to create case:", error);
//       toast.error("Failed to create case. Please try again.");
//     }
//   };

//   return (
//     <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
//       <h2 className="text-3xl font-semibold mb-4">Add New Rule</h2>

//       {/* Description */}
//       <div>
//         <label className="block text-gray-700 text-xl font-medium mb-1">
//           Description
//         </label>
//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleInputChange}
//           placeholder="Enter case description"
//           className="w-full text-2xl border border-gray-300 bg-gray-50 rounded-md px-4 py-3 focus:outline-none focus:border-blue-500"
//           rows={4}
//         />
//       </div>

//       {/* Priority */}
//       <div>
//         <label className="block text-gray-700 text-xl font-medium mb-1">
//           Priority
//         </label>
//         <select
//           name="priority"
//           value={formData.priority}
//           onChange={handleInputChange}
//           className="w-full text-xl border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:border-blue-500"
//         >
//           <option value="Low">Low</option>
//           <option value="Medium">Medium</option>
//           <option value="High">High</option>
//         </select>
//       </div>

//       {/* Buttons */}
//       <div className="flex justify-center mt-6">
//         <button
//           type="button"
//           onClick={onClose}
//           className="text-xl px-4 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 mr-4"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className="text-xl px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//         >
//           Create
//         </button>
//       </div>
//     </form>
//   );
// };

// export default CreateRuleForm;
