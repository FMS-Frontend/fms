// import React, { createContext, useState, useContext } from "react";

// type LeafNodeData = {
//   isLeaf: true;
//   operator: string;
//   left: string;
//   right: string;
// };

// type NonLeafNodeData = {
//   isLeaf: false;
//   children: number[];
//   condition: "And" | "Or";
// };

// type NodeData = LeafNodeData | NonLeafNodeData;

// export type RuleContextType = {
//   getNode: (id: number) => NodeData;
//   updateNode: (id: number, data: Partial<NodeData>) => void;
//   createRule: (parent: number) => void;
//   createRuleSet: (parent: number) => void;
//   deleteNode: (id: number, parentId: number) => void;
//   getData: () => Map<number, NodeData>;
//   root: () => number;
// };

// const RuleContext = createContext<RuleContextType>({} as RuleContextType);

// function randomId() {
//   return Math.floor(Math.random() * (9999999 - 1000000 + 1) + 1000000);
// }

// export const RuleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const rootId = 1111111;
//   const [nodes, setNodes] = useState(
//     new Map<number, NodeData>([
//       [
//         rootId,
//         {
//           isLeaf: false,
//           children: [],
//           condition: "And",
//         },
//       ],
//     ])
//   );

//   const getNode = (id: number) => nodes.get(id)!;

//   const updateNode = (id: number, data: Partial<NodeData>) => {
//     setNodes((prev) => {
//       const copy = new Map(prev);
//       const existingNode = copy.get(id);
  
//       if (!existingNode) {
//         throw new Error(`Node with id ${id} does not exist`);
//       }
  
//       // Merge data with existing node and preserve discriminated union
//       if (existingNode.isLeaf) {
//         copy.set(id, {
//           ...existingNode,
//           ...data,
//           isLeaf: true, 
//         } as LeafNodeData);
//       } else {
//         copy.set(id, {
//           ...existingNode,
//           ...data,
//           isLeaf: false,
//         } as NonLeafNodeData);
//       }
  
//       return copy;
//     });
//   };
  
//   const createRule = (parent: number) => {
//     const id = randomId();
//     setNodes((prev) => {
//       const copy = new Map(prev);
//       copy.set(id, { isLeaf: true, operator: "", left: "", right: "" });

//       const parentData = copy.get(parent) as NonLeafNodeData;
//       copy.set(parent, { ...parentData, children: [...parentData.children, id] });

//       return copy;
//     });
//   };

//   const createRuleSet = (parent: number) => {
//     const id = randomId();
//     setNodes((prev) => {
//       const copy = new Map(prev);
//       copy.set(id, { isLeaf: false, children: [], condition: "And" });

//       const parentData = copy.get(parent) as NonLeafNodeData;
//       copy.set(parent, { ...parentData, children: [...parentData.children, id] });

//       return copy;
//     });
//   };

//   const deleteNode = (id: number, parentId: number) => {
//     setNodes((prev) => {
//       const copy = new Map(prev);
  
//       // Remove the node itself
//       copy.delete(id);
  
//       // Update parent's children list
//       const parentNode = copy.get(parentId) as NonLeafNodeData;
//       if (parentNode && parentNode.children) {
//         copy.set(parentId, {
//           ...parentNode,
//           children: parentNode.children.filter((childId) => childId !== id),
//         });
//       }
  
//       return copy;
//     });
//   };
  

//   const getData = () => nodes;

//   const root = () => rootId;

//   return (
//     <RuleContext.Provider
//       value={{
//         getNode,
//         updateNode,
//         createRule,
//         createRuleSet,
//         deleteNode,
//         getData,
//         root,
//       }}
//     >
//       {children}
//     </RuleContext.Provider>
//   );
// };

// export const useRule = () => useContext(RuleContext);


import React, { createContext, useState, useContext } from "react";

type LeafNodeData = {
  isLeaf: true;
  operator: string;
  left: string;
  right: string;
};

type NonLeafNodeData = {
  isLeaf: false;
  children: number[];
  condition: "And" | "Or";
};

export type NodeData = LeafNodeData | NonLeafNodeData;

export type RuleConditions = {
  condition: "And" | "Or";
  rules: Array<
    | {
        field: string;
        operator: string;
        value: string;
      }
    | RuleConditions
  >;
};

export type RuleContextType = {
  getNode: (id: number) => NodeData;
  updateNode: (id: number, data: Partial<NodeData>) => void;
  createRule: (parent: number) => void;
  createRuleSet: (parent: number) => void;
  deleteNode: (id: number, parentId: number) => void;
  getData: () => Map<number, NodeData>;
  root: () => number;
  initialize: (conditions: RuleConditions) => void;
};

const RuleContext = createContext<RuleContextType>({} as RuleContextType);

function randomId() {
  return Math.floor(Math.random() * (9999999 - 1000000 + 1) + 1000000);
}

export const RuleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const rootId = 1111111;
  const [nodes, setNodes] = useState(
    new Map<number, NodeData>([
      [
        rootId,
        {
          isLeaf: false,
          children: [],
          condition: "And",
        },
      ],
    ])
  );

  const getNode = (id: number): NodeData => {
    const node = nodes.get(id);
    if (!node) {
      throw new Error(`Node with ID ${id} not found`);
    }
    return node;
  };

  const updateNode = (id: number, data: Partial<NodeData>) => {
    setNodes((prev) => {
      const copy = new Map(prev);
      const existingNode = copy.get(id);

      if (!existingNode) {
        throw new Error(`Node with id ${id} does not exist`);
      }

      // Merge data with existing node and preserve discriminated union
      if (existingNode.isLeaf) {
        copy.set(id, {
          ...existingNode,
          ...data,
          isLeaf: true,
        } as LeafNodeData);
      } else {
        copy.set(id, {
          ...existingNode,
          ...data,
          isLeaf: false,
        } as NonLeafNodeData);
      }

      return copy;
    });
  };

  const createRule = (parent: number) => {
    const id = randomId();
    setNodes((prev) => {
      const copy = new Map(prev);
      copy.set(id, { isLeaf: true, operator: "", left: "", right: "" });

      const parentData = copy.get(parent) as NonLeafNodeData;
      copy.set(parent, { ...parentData, children: [...parentData.children, id] });

      return copy;
    });
  };

  const createRuleSet = (parent: number) => {
    const id = randomId();
    setNodes((prev) => {
      const copy = new Map(prev);
      copy.set(id, { isLeaf: false, children: [], condition: "And" });

      const parentData = copy.get(parent) as NonLeafNodeData;
      copy.set(parent, { ...parentData, children: [...parentData.children, id] });

      return copy;
    });
  };

  const deleteNode = (id: number, parentId: number) => {
    setNodes((prev) => {
      const copy = new Map(prev);

      // Remove the node itself
      copy.delete(id);

      // Update parent's children list
      const parentNode = copy.get(parentId) as NonLeafNodeData;
      if (parentNode && parentNode.children) {
        copy.set(parentId, {
          ...parentNode,
          children: parentNode.children.filter((childId) => childId !== id),
        });
      }

      return copy;
    });
  };

  const getData = () => nodes;

  const root = () => rootId;

  const initialize = (conditions: RuleConditions) => {
    const newNodes = new Map<number, NodeData>();
    let nodeId = rootId;

    const buildTree = (condition: RuleConditions): number => {
      const currentId = nodeId++;
      if ("rules" in condition) {
        // Non-leaf node
        newNodes.set(currentId, {
          isLeaf: false,
          condition: condition.condition,
          children: condition.rules.map((rule) => buildTree(rule as RuleConditions)),
        });
      } else {
        // Leaf node
        const { field, operator, value } = condition as { field: string; operator: string; value: string };
        newNodes.set(currentId, {
          isLeaf: true,
          left: field,
          operator,
          right: value,
        });
      }
      return currentId;
    };

    buildTree(conditions);
    setNodes(newNodes);
  };

  return (
    <RuleContext.Provider
      value={{
        getNode,
        updateNode,
        createRule,
        createRuleSet,
        deleteNode,
        getData,
        root,
        initialize,
      }}
    >
      {children}
    </RuleContext.Provider>
  );
};

export const useRule = () => useContext(RuleContext);
