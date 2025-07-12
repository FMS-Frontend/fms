import { EmptyExpressionNode } from "./EmptyExpressionNode"
import { OperationExpressionNode } from "./OperationExpressionNode"
import { LiteralExpressionNode } from "./LiteralExpressionNode"
import { FunctionExpressionNode } from "./FunctionExpressionNode"
import { VariableExpressionNode } from "./VariableExpressionNode"

function ExpressionNode({
	exp,
	onUpdate,
	onDelete,
	path = [],
	editable = false,
}: ExpressionNodeProp) {
	if (!exp) return null
	if (exp.type === "empty") {
		return <EmptyExpressionNode onUpdate={onUpdate!} />
	}

	const updateExpression = (newExp: Expression) => {
		if (onUpdate) onUpdate(newExp)
	}

	const props = { exp, onUpdate: updateExpression, onDelete, path, editable }

	switch (exp.type) {
		case "function": {
			return <FunctionExpressionNode {...props} exp={exp} />
		}
		case "operation": {
			return <OperationExpressionNode {...props} exp={exp} />
		}
		case "literal": {
			return <LiteralExpressionNode {...props} exp={exp} />
		}
		case "variable": {
			return <VariableExpressionNode {...props} exp={exp} />
		}
	}
}

export default ExpressionNode