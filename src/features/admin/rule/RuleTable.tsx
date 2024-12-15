import { FC } from "react";
import Table from "../../../ui/utils/Table";
import { useQuery } from "@tanstack/react-query";
import { getRules } from "../../../services/apiAdmin";
import Spinner from "../../../ui/utils/Spinner";
import Paginate from "../../../ui/utils/Paginate";
import SpinnerMini from "../../../ui/utils/SpinnerMini";
import usePageParam from "../../../hooks/usePageParam";
import RuleRow from "./RuleRow";
import { Rule } from "../../../db/types";
// import useSubdomain from "../../../hooks/useSubdomain";

const RuleTable: FC = () => {
  // const { subdomain } = useSubdomain();
  const subdomain = "ten";
  const { page } = usePageParam();

  const { isLoading, data: { data: rules, pagination } = {} } = useQuery({
    queryFn: () => getRules(subdomain, page),
    queryKey: ["rules"],
  });

  console.log(rules);

  return (
    <div className="mt-8">
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
  );
};

export default RuleTable;