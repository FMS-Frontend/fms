import { FC, useEffect } from "react";
import Table from "../../../ui/utils/Table";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../../services/apiAdmin";
import Spinner from "../../../ui/utils/Spinner";
import Paginate from "../../../ui/utils/Paginate";
import SpinnerMini from "../../../ui/utils/SpinnerMini";
import usePageParam from "../../../hooks/usePageParam";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";
import AdminDashRow from "./AdminDashRow";
const AdminDashboardTable: FC = () => {
  const { tenant } = useAppContext();
  const { page } = usePageParam();

  const { isLoading, data: { data: users, pagination, error } = {} } = useQuery({
    queryFn: () => getUsers(tenant, page),
    queryKey: ["users", page],
  });


  useEffect(() => {
    if (error) {
      toast.error((error as Error).message);
    }
  }, [error]);

  return (
    <div className="mt-8">
      <div className="w-full overflow-x-auto">
      <div className="min-w-[600px]">
      <Table columns="grid-cols-[1fr_1.5fr_1.5fr_1fr_0.5fr_0.5fr]">
        <Table.Header>
          <div className="text-gray-600 font-semibold uppercase text-lg">
            Name
          </div>
          <div className="text-gray-600 font-semibold uppercase text-lg">
            Role
          </div>
          <div className="text-gray-600 font-semibold uppercase text-lg">
            Email
          </div>
          <div className="text-gray-600 font-semibold uppercase text-lg">
            Phone Number
          </div>
          <div className="text-gray-600 font-semibold uppercase text-lg">
            Status
          </div>
        </Table.Header>

        {isLoading ? (
          <Spinner />
        ) : (
          <Table.Body<User>
            data={users}
            render={(user, index) => (
              <AdminDashRow user={user} key={user.id} index={index} />
            )}
          />
        )}

        <Table.Footer>
          {isLoading ? (
            <SpinnerMini />
          ) : (
            <Paginate
              pageSize={pagination?.pageSize}
              totalItems={pagination?.totalItems}
              totalPages={pagination?.totalPages}
            />
          )}
        </Table.Footer>
      </Table>
        </div>
        </div>
     
    </div>
  );
};

export default AdminDashboardTable;



// import { useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import usePageParam from "../../../hooks/usePageParam";
// import { getUsers } from "../../../services/apiAdmin";
// import { useAppContext } from "../../../context/AppContext";
// import toast from "react-hot-toast";
// import { maskEmailDomain, maskNumber } from "../../../ui/utils/helpers";
// import { capitalizeWords, getStatusStyles } from "../../../db/helperFunctions";


// function AdminDashboardTable() {
//   const { tenant } = useAppContext();
//   const { page } = usePageParam();

//   const {
//     isLoading,
//     data: { data: users = [], pagination } = {},
//     error,
//   } = useQuery({
//     queryFn: () => getUsers(tenant, page),
//     queryKey: ["users", page],
//   });

//   useEffect(() => {
//     if (error) toast.error((error as Error).message);
//   }, [error]);

//   return (
//     <div className="mt-8 overflow-auto">
//       <h2 className="font-semibold mb-4 text-lg">Users</h2>

//       {isLoading ? (
//         <p className="text-gray-600">Loading...</p>
//       ) : users.length === 0 ? (
//         <p className="text-gray-500">No users found.</p>
//       ) : (
//         <table className="min-w-full table-auto border border-gray-200 rounded-md">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="text-left p-3 border-b  font-medium text-gray-600">Name</th>
//               <th className="text-left p-3 border-b  font-medium text-gray-600">Role</th>
//               <th className="text-left p-3 border-b  font-medium text-gray-600">Email</th>
//               <th className="text-left p-3 border-b  font-medium text-gray-600">Phone</th>
//               <th className="text-left p-3 border-b  font-medium text-gray-600">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users?.map((user: any) => (
//               <tr key={user.id} className="border-b hover:bg-gray-50">
//                 <td className="p-3">{capitalizeWords(user.name)}</td>
//                 <td className="p-3">{user.subRole?.name || user.role}</td>
//                 <td className="p-3 text-blue-700 underline">{maskEmailDomain(user.email)}</td>
//                 <td className="p-3">{maskNumber(user.mobile)}</td>
//                 <td className="p-3">
//                 <div>
//         <span
//           className={`flex justify-center items-center px-4 py-1 rounded-full text-xl font-medium ${getStatusStyles(
//             user.status
//           )}`}
//         >
//           {user.status}
//         </span>
//       </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default AdminDashboardTable;
