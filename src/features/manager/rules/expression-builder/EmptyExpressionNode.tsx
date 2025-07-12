import { useState } from "react";
import { createLiteral, createVariable, createOperation, createEmptyExpression, createFunction} from "../../../utils/expressionHelpers";


type EmptyExpressionNodeProp = {
	onUpdate: (newExp: Expression) => void
}
export function EmptyExpressionNode({ onUpdate }: EmptyExpressionNodeProp) {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const handleSelectType = (type: string) => {
		setIsMenuOpen(false)

		switch (type) {
			case "literal":
				onUpdate(createLiteral(""))
				break
			case "variable":
				onUpdate(createVariable("variable"))
				break
			case "operation":
				onUpdate(
					createOperation("+", [createEmptyExpression() as any, createEmptyExpression() as any])
				)
				break
			case "function":
				onUpdate(createFunction("function", []))
				break
		}
	}

	return (
		<div className="relative">
			<button
				onClick={() => setIsMenuOpen(!isMenuOpen)}
				className="rounded-md border border-dashed border-gray-400 bg-gray-50 px-4 py-2 text-gray-500 hover:bg-gray-100 flex items-center justify-center min-w-32"
			>
				<span className="text-sm">+ Add Expression</span>
			</button>

			{isMenuOpen && (
				<div className="absolute z-10 mt-1 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
					<div className="py-1">
						<button
							onClick={() => handleSelectType("literal")}
							className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
						>
							Literal Value
						</button>
						<button
							onClick={() => handleSelectType("variable")}
							className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
						>
							Variable
						</button>
						<button
							onClick={() => handleSelectType("operation")}
							className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
						>
							Operation
						</button>
						<button
							onClick={() => handleSelectType("function")}
							className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
						>
							Function Call
						</button>
					</div>
				</div>
			)}
		</div>
	)
}