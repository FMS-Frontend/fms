import { FC, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCases} from "../../../services/managerServices";
import { useAppContext } from "../../../context/AppContext";
import Spinner from "../../../ui/utils/Spinner";
import CaseMgtTable from "./CaseMgtTable";
import toast from "react-hot-toast";


const CaseManagement: FC = (): JSX.Element => {
  const { tenant } = useAppContext();

  const { data, isLoading, error } = useQuery<CaseData>({
    queryFn: () => getCases(tenant, 1),
    queryKey: ["cases", tenant],
    staleTime: 0,
    retry: 3,
    initialData: {
      data: [],
      pagination: {
        pageSize: 10,
        totalItems: 0,
        totalPages: 1,
        currentPage: 1,
      },
    },
  });
  useEffect(() => {
    if (error) {
      toast.error((error as Error).message);
    }
  }, [error]);

  const headings = [
    "Case ID",
    "Priority",
    "Status",
    "Assigned to",
    "Last Modified",
    "Actions",
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner />
      </div>
    );
  }

  if (error) {
    toast.error("Error fetching cases. Please try again later.")
  }
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-bold text-4xl">Case Management</h1>
      <CaseMgtTable headingData={headings} data={data?.data || []} />
    </div>
  );
};

export default CaseManagement;
