import { FC, useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import URL from "../../../db/url";

const SCHEMA_TYPES = ["float", "string", "object", "function"];

const CreateVariableType: FC = () => {
  const { tenant } = useAppContext();

  const [name, setName] = useState("");
  const [schemaType, setSchemaType] = useState("float");

  const [objectProps, setObjectProps] = useState<{ key: string; type: string }[]>([]);
  const [functionArgs, setFunctionArgs] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const addObjectProp = () => setObjectProps([...objectProps, { key: "", type: "string" }]);
  const updateObjectProp = (index: number, field: "key" | "type", value: string) => {
    const updated = [...objectProps];
    updated[index][field] = value;
    setObjectProps(updated);
  };

  const addFunctionArg = () => setFunctionArgs([...functionArgs, "string"]);
  const updateFunctionArg = (index: number, value: string) => {
    const updated = [...functionArgs];
    updated[index] = value;
    setFunctionArgs(updated);
  };

  const buildPayload = () => {
    let schema: any = { type: schemaType };

    if (schemaType === "object") {
      schema.properties = {};
      objectProps.forEach(({ key, type }) => {
        if (key) schema.properties[key] = { type };
      });
    }

    if (schemaType === "function") {
      schema.arguments = functionArgs.map((argType) => ({ type: argType }));
    }

    return {
      name,
      schema,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    const payload = buildPayload();
    setLoading(true);
    try {
      const res = await URL.post(`/settings/tenants/${tenant}/types`, payload);
      setSuccessMsg("Variable type created successfully.");
      setName("");
      setSchemaType("float");
      setObjectProps([]);
      setFunctionArgs([]);
      console.log(res.data);
      
    } catch (err: any) {
      console.error("Error:", err);
      setErrorMsg(err?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl p-4 space-y-4 border rounded-md shadow-md bg-white"
    >
      <h2 className="text-xl font-bold">Create Variable Type</h2>

      {successMsg && <div className="text-green-600">{successMsg}</div>}
      {errorMsg && <div className="text-red-500">{errorMsg}</div>}

      <div>
        <label className="block font-medium">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="e.g., Transaction"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Schema Type</label>
        <select
          value={schemaType}
          onChange={(e) => {
            setSchemaType(e.target.value);
            setObjectProps([]);
            setFunctionArgs([]);
          }}
          className="w-full px-3 py-2 border rounded-md"
        >
          {SCHEMA_TYPES.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </div>

      {schemaType === "object" && (
        <div>
          <label className="block font-medium">Object Properties</label>
          {objectProps.map((prop, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                value={prop.key}
                onChange={(e) => updateObjectProp(i, "key", e.target.value)}
                placeholder="Key"
                className="w-1/2 px-2 py-1 border rounded"
              />
              <select
                value={prop.type}
                onChange={(e) => updateObjectProp(i, "type", e.target.value)}
                className="w-1/2 px-2 py-1 border rounded"
              >
                <option value="string">string</option>
                <option value="float">float</option>
              </select>
            </div>
          ))}
          <button type="button" onClick={addObjectProp} className="text-sm text-blue-600">
            + Add Property
          </button>
        </div>
      )}

      {schemaType === "function" && (
        <div>
          <label className="block font-medium">Function Arguments</label>
          {functionArgs.map((argType, i) => (
            <div key={i} className="mb-2">
              <select
                value={argType}
                onChange={(e) => updateFunctionArg(i, e.target.value)}
                className="w-full px-2 py-1 border rounded"
              >
                <option value="string">string</option>
                <option value="float">float</option>
              </select>
            </div>
          ))}
          <button type="button" onClick={addFunctionArg} className="text-sm text-blue-600">
            + Add Argument
          </button>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        {loading ? "Creating..." : "Create Variable Type"}
      </button>
    </form>
  );
};

export default CreateVariableType;
