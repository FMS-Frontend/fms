/* eslint-disable react-refresh/only-export-components */
// import { createContext, FC, useContext, useState } from "react";

// const SuperUserContext = createContext();

// const SuperUserProvider: FC = ({ children }) => {
//   const [admins, setAdmins] = useState([]);

//   return (
//     <SuperUserContext value={{ setAdmins, admins }}>
//       {children}
//     </SuperUserContext>
//   );
// };

// const useSuperuserContext = () => {
//   const context = useContext(SuperUserContext);

//   if (context === undefined) {
//     throw new Error(
//       "You're trying to access variable outside of Context Provider"
//     );
//   }

//   return context;
// };

// export { SuperUserProvider, useSuperuserContext };

// import { Dispatch, FC, createContext, useContext, useState } from "react";

// // Define the shape of the tenant data
// interface TenantData {
//   tenantName: string;
//   address: string;
//   admin: string;
//   email: string;
//   phoneNumber: string;
//   options: {
//     createSchema: boolean;
//     syncAdmin: boolean;
//     sendLoginMail: boolean;
//     createRuleFolder: boolean;
//   };
// }

// // Define the context and its methods
// interface TenantContextType {
//   tenantData: TenantData;
//   setTenantData: Dispatch<React.SetStateAction<TenantData>>;
// }

// const TenantContext = createContext<TenantContextType | undefined>(undefined);

// // Context provider component
// export const TenantProvider: FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [tenantData, setTenantData] = useState<TenantData>({
//     tenantName: "",
//     address: "",
//     admin: "",
//     email: "",
//     phoneNumber: "",
//     options: {
//       createSchema: true,
//       syncAdmin: true,
//       sendLoginMail: false,
//       createRuleFolder: false,
//     },
//   });

//   return (
//     <TenantContext.Provider value={{ tenantData, setTenantData }}>
//       {children}
//     </TenantContext.Provider>
//   );
// };

// // Custom hook for accessing the context
// export const useTenant = (): TenantContextType => {
//   const context = useContext(TenantContext);
//   if (!context) {
//     throw new Error("useTenant must be used within a TenantProvider");
//   }
//   return context;
// };
