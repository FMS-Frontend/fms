import { useState } from "react"
export function VariableExpressionNode({
	exp,
	onUpdate,
	onDelete,
	editable = false,
}: ExpressionNodeProp & { exp: Variable }) {
	const [isEditing, setIsEditing] = useState(false)
	const [variableName, setVariableName] = useState(exp.name)

	const handleSave = () => {
		if (onUpdate) {
			onUpdate({
				type: "variable",
				name: variableName,
				return: exp.return,
			})
		}
		setIsEditing(false)
	}

	if (editable && isEditing) {
		return (
			<div className="rounded-md bg-white border border-indigo-300 p-2 shadow-sm">
				<div className="flex flex-col gap-2">
					<input
						type="text"
						value={variableName}
						onChange={(e) => setVariableName(e.target.value)}
						className="border rounded px-2 py-1"
						autoFocus
						placeholder="Variable name"
					/>

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
			className="rounded-md bg-indigo-50 border border-indigo-300 px-3 py-2 font-semibold text-indigo-700 shadow-sm relative"
			onClick={() => editable && setIsEditing(true)}
		>
			{editable && onDelete && (
				<button
					onClick={(e) => {
						e.stopPropagation()
						onDelete()
					}}
					className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-md hover:bg-red-600 z-10"
					title="Delete variable"
				>
					×
				</button>
			)}
			{exp.name}
		</div>
	)
}