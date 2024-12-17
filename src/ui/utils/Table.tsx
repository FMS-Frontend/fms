import { createContext, useContext, ReactNode } from "react";

// Define the types for the props
interface TableProps {
  columns: string; // CSS grid-template-columns value
  children: ReactNode;
}

interface RowProps {
  children: ReactNode;
  bgColor?: string | null;
}

interface BodyProps<T> {
  data: T[];
  render: (item: T, index: number) => ReactNode;
}

interface FooterProps {
  children: ReactNode;
}

/**
 * Table component that allows you to create a flexible table structure with Header, Row, Body, and Footer.
 * The table layout uses CSS grid for its structure, and the `columns` prop determines the grid layout.
 *
 *
 * @param {Object} props - The props for the Table component.
 * @param {string} props.columns - A CSS value for `grid-template-columns` to define the column layout.
 * @param {ReactNode} props.children - Child elements that will be passed to the Table components (Header, Body, Footer).
 *
 * @returns {JSX.Element} The rendered Table component with a dynamic layout based on columns.
 */

// Table context to pass columns
const TableContext = createContext<{ columns: string }>({ columns: "" });

const Table: React.FC<TableProps> & {
  Header: React.FC<RowProps>;
  Row: React.FC<RowProps>;
  Body: <T>(props: BodyProps<T>) => JSX.Element;
  Footer: React.FC<FooterProps>;
} = ({ columns, children }) => {
  return (
    <TableContext.Provider value={{ columns }}>
      <div
        role="table"
        className="border border-gray-200 rounded-lg w-full mx-auto"
      >
        {children}
      </div>
    </TableContext.Provider>
  );
};

/**
 * Header component renders the header row in the table with the specified grid layout.
 *
 * @param {RowProps} props - The props passed to the Header component.
 * @returns {JSX.Element} The rendered header row.
 */

// Header component
const Header: React.FC<RowProps> = ({ children, bgColor }) => {
  const { columns } = useContext(TableContext);
  return (
    <header
      role="row"
      className={`grid ${columns} ${bgColor} gap-6 items-center  border-b border-gray-300 p-4 text-sm font-semibold uppercase tracking-wide text-gray-600  `}
    >
      {children}
    </header>
  );
};

/**
 * Row component renders each row of the table with the specified grid layout.
 *
 * @param {RowProps} props - The props passed to the Row component.
 * @returns {JSX.Element} The rendered row.
 */

// Row component
const Row: React.FC<RowProps> = ({ children }) => {
  const { columns } = useContext(TableContext);
  return (
    <div
      role="row"
      className={`grid ${columns} gap-6 items-center p-4 text-sm`}
    >
      {children}
    </div>
  );
};

/**
 * Body component renders the body content of the table, mapping over the `data` prop to generate rows.
 *
 * @param {BodyProps} props - The props passed to the Body component.
 * @template T - The type of data items in the `data` array.
 * @returns {JSX.Element} The rendered table body with rows for each data item.
 */

// Body component
const Body = <T,>({ data, render }: BodyProps<T>): JSX.Element => {
  if (!data)
    return (
      <p className="text-center text-lg font-medium py-4">
        No data to show at the moment
      </p>
    );

  return (
    <div role="row" className="py-2 px-3">
      {data.map(render)}
    </div>
  );
};

/**
 * Footer component renders the footer content of the table.
 *
 * @param {FooterProps} props - The props passed to the Footer component.
 * @returns {JSX.Element} The rendered footer.
 */

// Footer component
const Footer: React.FC<FooterProps> = ({ children }) => {
  return (
    <footer className="bg-gray-100 p-4 flex justify-center">
      {children || null}
    </footer>
  );
};

// Compose components within Table
Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
