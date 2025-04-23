import { useEffect, useState } from "react";
import URL from "../../../db/url";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";

interface Variable {
  id: string;
  name: string;
  typeId: string;
  type: {
    id: string;
    name: string;
    schema: {
      type: string;
    };
  };
}

const VariablesTable = () => {
  const [variables, setVariables] = useState<Variable[]>([]);
  const [loading, setLoading] = useState(false);
  const { tenant } = useAppContext();

  const fetchVariables = async () => {
    try {
      setLoading(true);
      const res = await URL.get(`/settings/tenants/${tenant}/variables`);
      setVariables(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch variables", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this variable?")) return;
    try {
      await URL.delete(`/settings/tenants/${tenant}/variables/${id}`);
      setVariables((prev) => prev.filter((v) => v.id !== id));
      toast.success("Variable Deleted")
    } catch (err) {
      console.error("Failed to delete variable", err);
    }
  };

  useEffect(() => {
    fetchVariables();
  }, []);

  return (
    <div className="mt-8 overflow-auto">
      <h2 className=" font-semibold mb-4">Variables</h2>

      {loading ? (
        <p>Loading...</p>
      ) : variables.length === 0 ? (
        <p className="text-gray-500">No variables found.</p>
      ) : (
        <table className="min-w-full table-auto border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3 border-b">Name</th>
              <th className="text-left p-3 border-b">Type</th>
              <th className="text-left p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {variables.map((v) => (
              <tr key={v.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{v.name}</td>
                <td className="p-3">
                  {v.type?.name || v.typeId} ({v.type?.schema?.type || "unknown"})
                </td>
                <td className="p-3 flex gap-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => alert(JSON.stringify(v, null, 2))}
                  >
                    View
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(v.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VariablesTable;
