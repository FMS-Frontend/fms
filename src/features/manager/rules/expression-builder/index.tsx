import { useState } from "react"
import ExpressionNode from "./ExpressionNode";
import { createLiteral, createVariable, createOperation, createEmptyExpression, createFunction } from "../../../utils/expressionHelpers";


type ExpressionBuilderProps = {
	rootExpression: ExtendedExpression;
	onExpressionChange: (exp: ExtendedExpression) => void;
};



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


export function ExpressionBuilder({ rootExpression, onExpressionChange }: ExpressionBuilderProps) {
	const [jsonView, setJsonView] = useState(false);

	const handleExpressionUpdate = (newExp: Expression) => {
		onExpressionChange(newExp);
	};

	const handleExpressionDelete = () => {
		onExpressionChange({ type: "empty" });
	};

	return (
		<div className="p-2 bg-white rounded-lg shadow">
			<div className="flex justify-between items-center mb-4">
				<button
					onClick={() => setJsonView(!jsonView)}
					className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm"
				>
					{jsonView ? "View Expression" : "View JSON"}
				</button>
			</div>

			<div>
				<ExpressionNode
					exp={rootExpression}
					onUpdate={handleExpressionUpdate}
					editable={true}
					onDelete={handleExpressionDelete}
				/>
			</div>
		</div>
	);
}


export default function ExpressionTreeDemo() {
	const exampleExpression = createOperation("*", [
		createLiteral(86000),
		createFunction("avg", [
			createOperation("+", [createVariable("price"), createLiteral(10)]),
			createOperation("!", [createLiteral(false)]),
			createLiteral("product"),
		]),
	])

	return (
		<div className="p-4 max-w-2xl mx-auto">
			<h1 className="text-2xl font-bold mb-6 text-gray-800">Expression Tree System</h1>

			{/* Viewer Section */}
			<div className="mb-8">
				<h2 className="text-xl font-bold mb-4 text-gray-700">Example Viewer</h2>
				<div className="p-4 bg-white rounded-lg shadow">
					<ExpressionNode exp={exampleExpression} onDelete={() => { }} />
				</div>
			</div>

			{/* Builder Section */}
			<ExpressionBuilder
				rootExpression={exampleExpression}
				onExpressionChange={(newExp) => console.log("Updated expression:", newExp)}
			/>
		</div>
	)
}
