import { FC, useEffect } from "react";
import Table from "../../../ui/utils/Table";
import { useQuery } from "@tanstack/react-query";
import { getRules } from "../../../services/apiAdmin";
import Spinner from "../../../ui/utils/Spinner";
import Paginate from "../../../ui/utils/Paginate";
import SpinnerMini from "../../../ui/utils/SpinnerMini";
import usePageParam from "../../../hooks/usePageParam";
import RuleRow from "./RuleRow";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";
const RuleTable: FC = () => {
  const { tenant } = useAppContext();
  const { page } = usePageParam();

  const { isLoading, data: { data: rules, pagination, error } = {} } = useQuery({
    queryFn: () => getRules(tenant, page),
    queryKey: ["rules", page],
  });

  useEffect(() => {
    if (error) {
      toast.error((error as Error).message);
    }
  }, [error]);
  // console.log(rules);

  return (
    <div className="mt-8">
      <div className="w-full overflow-x-auto">
      <div className="min-w-[600px]">
      <Table columns="grid-cols-[0.5fr_1fr_0.5fr_1fr_0.5fr]">
        <Table.Header>
          <div className="text-gray-600 font-semibold uppercase text-lg">
            Rule ID
          </div>
          <div className="text-gray-600 font-semibold uppercase text-lg">
            Rule Name
          </div>
          <div className="text-gray-600 font-semibold uppercase text-lg">
            Status
          </div>
          <div className="text-gray-600 font-semibold uppercase text-lg">
            Last Modified
          </div>
          <div className="text-gray-600 font-semibold uppercase text-lg text-center">
            Actions
          </div>
        </Table.Header>

        {isLoading ? (
          <Spinner />
        ) : (
          <Table.Body<Rule>
            data={rules}
            render={(rule, index) => (
              <RuleRow rule={rule} key={rule.id} index={index} />
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

export default RuleTable;
