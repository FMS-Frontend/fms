import { useState } from "react"

export function LiteralExpressionNode({
	exp,
	onUpdate,
	onDelete,
	editable = false,
}: ExpressionNodeProp & { exp: Literal }) {
	const [isEditing, setIsEditing] = useState(false)
	const [value, setValue] = useState(String(exp.value))
	const [type, setType] = useState<"string" | "number" | "boolean">(exp.return)

	// Color coding based on type
	const getBgColor = () => {
		switch (exp.return) {
			case "string":
				return "bg-green-50 border-green-300"
			case "number":
				return "bg-purple-50 border-purple-300"
			case "boolean":
				return "bg-yellow-50 border-yellow-300"
			default:
				return "bg-gray-50 border-gray-300"
		}
	}

	const getTextColor = () => {
		switch (exp.return) {
			case "string":
				return "text-green-700"
			case "number":
				return "text-purple-700"
			case "boolean":
				return "text-yellow-700"
			default:
				return "text-gray-700"
		}
	}

	const handleSave = () => {
		if (onUpdate) {
			let typedValue: string | number | boolean = value

			if (type === "number") {
				typedValue = Number(value)
			} else if (type === "boolean") {
				typedValue = value.toLowerCase() === "true"
			}

			onUpdate({
				type: "literal",
				value: typedValue,
				return: type,
			})
		}
		setIsEditing(false)
	}

	if (editable && isEditing) {
		return (
			<div className="rounded-md bg-white border border-gray-300 p-2 shadow-sm">
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-2">
						<label className="text-xs text-gray-500">Type:</label>
						<select
							value={type}
							onChange={(e) => setType(e.target.value as "string" | "number" | "boolean")}
							className="text-sm border rounded px-1 py-0.5"
						>
							<option value="string">String</option>
							<option value="number">Number</option>
							<option value="boolean">Boolean</option>
						</select>
					</div>

					{type === "boolean" ? (
						<select
							value={value}
							onChange={(e) => setValue(e.target.value)}
							className="border rounded px-2 py-1"
						>
							<option value="true">true</option>
							<option value="false">false</option>
						</select>
					) : (
						<input
							type={type === "number" ? "number" : "text"}
							value={value}
							onChange={(e) => setValue(e.target.value)}
							className="border rounded px-2 py-1"
							autoFocus
						/>
					)}

					<div className="flex justify-end gap-2 mt-1">
						<button
							onClick={() => setIsEditing(false)}
							className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded"
						>
							Cancel
						</button>
						<button
							onClick={handleSave}
							className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded"
						>
							Save
						</button>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div
			className={`rounded-md ${getBgColor()} px-3 py-2 font-mono ${getTextColor()} shadow-sm relative`}
			onClick={() => editable && setIsEditing(true)}
		>
			{editable && onDelete && (
				<button
					onClick={(e) => {
						e.stopPropagation()
						onDelete()
					}}
					className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-md hover:bg-red-600 z-10"
					title="Delete literal"
				>
					×
				</button>
			)}
			{exp.return === "string" ? `"${exp.value}"` : String(exp.value)}
		</div>
	)
}