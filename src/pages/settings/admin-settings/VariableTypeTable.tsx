import { useEffect, useState } from "react";
import URL from "../../../db/url";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";

interface VariableType {
  id: string;
  name: string;
  schema: {
    type: string;
    properties?: Record<string, any>;
    arguments?: { type: string }[];
  };
  createdAt: string;
  updatedAt: string;
}

const VariableTypeTable = () => {
  const [types, setTypes] = useState<VariableType[]>([]);
  const [loading, setLoading] = useState(false);
  const { tenant } = useAppContext();

  const fetchTypes = async () => {
    try {
      setLoading(true);
      const res = await URL.get(`/settings/tenants/${tenant}/types`);
      setTypes(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch variable types", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this type?")) return;
    try {
      await URL.delete(`/settings/tenants/${tenant}/types/${id}`);
      setTypes((prev) => prev.filter((t) => t.id !== id));
      toast.success("Variable type Deleted")
    } catch (err) {
      console.error("Failed to delete variable type", err);
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  const renderSchema = (schema: VariableType["schema"]) => {
    if (schema.type === "object") {
      const keys = Object.keys(schema.properties || {});
      return `Object (${keys.join(", ")})`;
    } else if (schema.type === "function") {
      return `Function(${schema.arguments?.map(arg => arg.type).join(", ")})`;
    } else {
      return schema.type;
    }
  };

  return (
    <div className="mt-10 overflow-auto">
      <h2 className="font-semibold mb-4">Variable Types</h2>

      {loading ? (
        <p>Loading...</p>
      ) : types.length === 0 ? (
        <p className="text-gray-500">No variable types found.</p>
      ) : (
        <table className="min-w-full table-auto border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3 border-b">Name</th>
              <th className="text-left p-3 border-b">Schema</th>
              <th className="text-left p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {types.map((type) => (
              <tr key={type.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{type.name}</td>
                <td className="p-3">{renderSchema(type.schema)}</td>
                <td className="p-3 flex gap-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => alert(JSON.stringify(type, null, 2))}
                  >
                    View
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(type.id)}
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

export default VariableTypeTable;
