import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../../services/apiSuperUser";

export function useProfile() {
  const { data: profile } = useQuery({
    queryFn: getProfile,
    queryKey: ["profile"],
  });

  return { profile };
}

export default useProfile;
