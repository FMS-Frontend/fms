import { useState } from "react"
import { isUnaryOperator } from "../../../utils/expressionHelpers"
import ExpressionNode from "./ExpressionNode"


type ExpressionNodeProp = {
	exp: ExtendedExpression
	onUpdate?: (newExp: Expression) => void
	onDelete: () => void
	path?: number[]
	editable?: boolean
}
export function OperationExpressionNode({
	exp,
	onUpdate,
	onDelete,
	path = [],
	editable = false,
}: ExpressionNodeProp & { exp: Operation }) {
	const [isEditing, setIsEditing] = useState(false)
	const [operator, setOperator] = useState(exp.operator)
	const isUnary = isUnaryOperator(exp.operator)

	const commonOperators = ["+", "-", "*", "/", "==", "!=", ">", ">=", "<", "<=", "and", "or", "!"]

	const handleSave = () => {
		if (onUpdate) {
			// If changing between unary and binary operators, adjust operands
			const newIsUnary = isUnaryOperator(operator)
			let newOperands = [...exp.operands]

			if (isUnary && !newIsUnary) {
				// Going from unary to binary, add a placeholder
				newOperands.push({ type: "empty" } as any)
			} else if (!isUnary && newIsUnary) {
				// Going from binary to unary, remove second operand
				newOperands = [newOperands[0]]
			}

			onUpdate({
				...exp,
				operator,
				operands: newOperands,
			})
		}
		setIsEditing(false)
	}

	const handleOperandUpdate = (index: number, newOperand: Expression) => {
		if (onUpdate) {
			const newOperands = [...exp.operands]
			newOperands[index] = newOperand
			onUpdate({
				...exp,
				operands: newOperands,
			})
		}
	}

	const handleOperandDelete = (index: number) => {
		if (onUpdate) {
			const newOperands = exp.operands.splice(index)
			onUpdate({
				...exp,
				operands: newOperands,
			})
		}
	}

	if (editable && isEditing) {
		return (
			<div className="rounded-md bg-white border border-amber-300 p-3 shadow-sm">
				<div className="flex flex-col gap-2">
					<label className="text-xs text-gray-500">Operator:</label>
					<div className="flex gap-2 flex-wrap">
						{commonOperators.map((op) => (
							<button
								key={op}
								onClick={() => setOperator(op)}
								className={`px-2 py-1 rounded text-sm ${operator === op
										? "bg-blue-400 text-white"
										: "bg-amber-100 text-amber-800 hover:bg-amber-200"
									}`}
							>
								{op}
							</button>
						))}
						<input
							type="text"
							value={operator}
							onChange={(e) => setOperator(e.target.value)}
							className="border rounded px-2 py-1 text-sm flex-grow"
							placeholder="Custom operator"
						/>
					</div>

					<div className="flex justify-end gap-2 mt-2">
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
		<div className="rounded-lg shadow-md bg-amber-50 border border-amber-300 p-3.5 relative">
			{editable && onDelete && (
				<button
					onClick={onDelete}
					className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-md hover:bg-red-600 z-10"
					title="Delete operation"
				>
					×
				</button>
			)}
			<div className="flex items-center gap-2">
				{isUnary ? (
					<>
						<div
							className="bg-amber-200 rounded-md px-2 py-1 font-mono text-amber-800"
							onClick={() => editable && setIsEditing(true)}
						>
							{exp.operator}
						</div>
						<div className="flex-1">
							<ExpressionNode
								exp={exp.operands[0]}
								onUpdate={(newExp) => handleOperandUpdate(0, newExp)}
								path={[...path, 0]}
								onDelete={() => handleOperandDelete(0)}
								editable={editable}
							/>
						</div>
					</>
				) : (
					<div className="flex flex-col md:flex-row items-center gap-2 w-full">
						<div className="md:flex-1 w-full">
							<ExpressionNode
								exp={exp.operands[0]}
								onUpdate={(newExp) => handleOperandUpdate(0, newExp)}
								onDelete={() => handleOperandDelete(0)}
								path={[...path, 0]}
								editable={editable}
							/>
						</div>
						<div
							className="bg-blue-400 rounded-md px-2 py-1 font-mono text-blue-800 my-1"
							onClick={() => editable && setIsEditing(true)}
						>
							{exp.operator}
						</div>
						<div className="md:flex-1 w-full">
							<ExpressionNode
								exp={exp.operands[1]}
								onUpdate={(newExp) => handleOperandUpdate(1, newExp)}
								onDelete={() => handleOperandDelete(1)}
								path={[...path, 1]}
								editable={editable}
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
