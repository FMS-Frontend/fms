import { useState } from "react"
import ExpressionNode from "./ExpressionNode"
export function FunctionExpressionNode({
	exp,
	onUpdate,
	onDelete,
	path = [],
	editable = false,
}: ExpressionNodeProp & { exp: FunctionCall }) {
	const [isCollapsed, setIsCollapsed] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const [functionName, setFunctionName] = useState(exp.name)

	const handleNameSave = () => {
		if (onUpdate) {
			onUpdate({
				...exp,
				name: functionName,
			})
		}
		setIsEditing(false)
	}

	const handleArgUpdate = (index: number, newArg: Expression) => {
		if (onUpdate) {
			const newArgs = [...exp.args]
			newArgs[index] = newArg
			onUpdate({
				...exp,
				args: newArgs,
			})
		}
	}

	const handleArgDelete = (index: number) => {
		if (onUpdate) {
			const newArgs = exp.args.filter((_, i) => i !== index)
			onUpdate({
				...exp,
				args: newArgs,
			})
		}
	}

	const addArgument = () => {
		if (onUpdate) {
			onUpdate({
				...exp,
				args: [...exp.args, { type: "empty" } as any],
			})
		}
	}

	return (
		<div className="rounded-lg shadow-md bg-blue-50 border border-blue-300 relative">
			{editable && onDelete && (
				<button
					onClick={onDelete}
					className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-md hover:bg-red-600 z-10"
					title="Delete function"
				>
					×
				</button>
			)}
			<div className="bg-blue-500 text-white px-3 py-2 flex justify-between items-center rounded-t-lg">
				{editable && isEditing ? (
					<div className="flex items-center">
						<input
							type="text"
							value={functionName}
							onChange={(e) => setFunctionName(e.target.value)}
							className="bg-blue-600 text-white px-2 py-1 rounded outline-none"
							autoFocus
							onBlur={handleNameSave}
							onKeyDown={(e) => e.key === "Enter" && handleNameSave()}
						/>
						<span className="ml-1 font-bold">()</span>
					</div>
				) : (
					<div className="font-bold" onClick={() => editable && setIsEditing(true)}>
						{exp.name}()
					</div>
				)}
				<div className="flex items-center">
					{editable && (
						<button
							onClick={addArgument}
							className="text-xs text-blue-200 hover:text-white mr-2 px-1"
							title="Add argument"
						>
							+ Arg
						</button>
					)}
					<button
						onClick={() => setIsCollapsed(!isCollapsed)}
						className="text-blue-100 hover:text-white"
						title={isCollapsed ? "Expand" : "Collapse"}
					>
						{isCollapsed ? "▼" : "▲"}
					</button>
				</div>
			</div>
			{!isCollapsed && (
				<div className="p-3">
					{exp.args.length === 0 ? (
						<div className="flex justify-between items-center">
							<div className="text-gray-500 italic text-sm">No arguments</div>
							{editable && (
								<button
									onClick={addArgument}
									className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded"
								>
									Add Argument
								</button>
							)}
						</div>
					) : (
						<div className="flex flex-col gap-2">
							{exp.args.map((arg, i) => (
								<div key={i} className="flex items-center gap-2">
									<div className="text-xs font-medium text-gray-500 w-6 text-right">{i + 1}:</div>
									<div className="flex-1">
										<ExpressionNode
											exp={arg}
											onUpdate={(newExp) => handleArgUpdate(i, newExp)}
											onDelete={() => handleArgDelete(i)}
											path={[...path, i]}
											editable={editable}
										/>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	)
}