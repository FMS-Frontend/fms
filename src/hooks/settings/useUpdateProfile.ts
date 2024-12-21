import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../../services/apiSuperUser";
import toast from "react-hot-toast";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  const { mutate: updateProfileSetting } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success("Setting successfully edited");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateProfileSetting };
}
