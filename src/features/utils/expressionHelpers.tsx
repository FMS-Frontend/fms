export const operationOptions = [
    { label: "Equals", value: "==" },
    { label: "Greater Than", value: ">" },
    { label: "Less Than", value: "<" },
    { label: "And", value: "and" },
    { label: "Or", value: "or" },
  ];
  
  export const functionOptions = [
    { label: "Function 1", value: "function" },
  ];
  

export const isUnaryOperator = (op: string) => ["!"].includes(op)

export const createEmptyExpression = (): EmptyExpression => ({ type: "empty" })

export const createLiteral = (value: string | number | boolean): Literal => {
	const type = typeof value
	return {
		type: "literal",
		value,
		return: type as "string" | "number" | "boolean",
	}
}

export const createVariable = (name: string, returnType: Return = "number"): Variable => ({
	type: "variable",
	name,
	return: returnType,
})

export const createOperation = (operator: string, operands: Expression[]): Operation => ({
	type: "operation",
	operator,
	operands,
})


export const createFunction = (
	name: string,
	args: Expression[] = [],
	returnType: Return = "number"
): FunctionCall => ({
	type: "function",
	name,
	args,
	return: returnType,
})