import { useEffect, useState } from "react";
import URL from "../../../db/url";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";

// const CreateVariable = () => {
//   const [name, setName] = useState("");
//   const [typeId, setTypeId] = useState("");
//   const [variableTypes, setVariableTypes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const { tenant } = useAppContext();

//   // Fetch variable types on mount
//   useEffect(() => {
//     const fetchVariableTypes = async () => {
//       try {
//         setLoading(true);
//         const response = await URL.get(`/settings/tenants/${tenant}/types`);
//         setVariableTypes(response.data.data || []);
//       } catch (error) {
//         console.error("Failed to fetch variable types", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVariableTypes();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!name || !typeId) return;

//     try {
//       setSubmitting(true);
//       const payload = { name, typeId };
//       await URL.post("/settings/tenants/tenant/variables", payload);
//       toast.success("Variable created successfully");
//       setName("");
//       setTypeId("");
//     } catch (error) {
//       console.error("Error creating variable", error);
//       toast.error("Failed to create variable");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 max-w-md p-4 bg-white rounded shadow">
//       <h2 className="text-lg font-semibold">Create Variable</h2>

//       <div className="flex flex-col">
//         <label className="text-sm mb-1">Name</label>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="border px-3 py-2 rounded"
//           placeholder="e.g. transaction"
//           required
//         />
//       </div>

//       <div className="flex flex-col">
//         <label className="text-sm mb-1">Variable Type</label>
//         <select
//           value={typeId}
//           onChange={(e) => setTypeId(e.target.value)}
//           className="border px-3 py-2 rounded"
//           required
//         >
//           <option value="">Select a type</option>
//           {loading ? (
//             <option disabled>Loading...</option>
//           ) : (
//             variableTypes.map((type: any) => (
//               <option key={type.id} value={type.id}>
//                 {type.name}
//               </option>
//             ))
//           )}
//         </select>
//       </div>

//       <button
//         type="submit"
//         className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
//         disabled={submitting}
//       >
//         {submitting ? "Creating..." : "Create Variable"}
//       </button>
//     </form>
//   );
// };

// export default CreateVariable;


interface VariableType {
  id: string;
  name: string;
  schema: {
    type: string;
    properties?: Record<string, any>;
    arguments?: any[];
  };
}

const CreateVariable = () => {
  const [name, setName] = useState("");
  const [typeId, setTypeId] = useState("");
  const [variableTypes, setVariableTypes] = useState<VariableType[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { tenant } = useAppContext();


  useEffect(() => {
    const fetchVariableTypes = async () => {
      try {
        setLoading(true);
        const response = await URL.get(`/settings/tenants/${tenant}/types`);
        console.log(response?.data?.data);
        setVariableTypes(response?.data?.data || []);
      } catch (error) {
        console.error("Failed to fetch variable types", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVariableTypes();
  }, [tenant]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !typeId) return;

    try {
      setSubmitting(true);
      const payload = { name, typeId };
      await URL.post(`/settings/tenants/${tenant}/variables`, payload);
      toast.success("Variable created successfully");
      setName("");
      setTypeId("");
    } catch (error) {
      console.error("Error creating variable", error);
      toast.error("Failed to create variable");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md p-4 bg-white rounded shadow">
      <h2 className="text-lg font-semibold">Create Variable</h2>

      <div className="flex flex-col">
        <label className="text-sm mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-3 py-2 rounded"
          placeholder="e.g. transaction"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm mb-1">Variable Type</label>
        <select
          value={typeId}
          onChange={(e) => setTypeId(e.target.value)}
          className="border px-3 py-2 rounded"
          required
        >
          <option value="" className="text-sm">Select Variable Type</option>
          {loading ? (
            <option disabled>Loading...</option>
          ) : (
            variableTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name} ({type.schema?.type || "unknown"})
              </option>
            ))
          )}
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={submitting}
      >
        {submitting ? "Creating..." : "Create Variable"}
      </button>
    </form>
  );
};

export default CreateVariable;

