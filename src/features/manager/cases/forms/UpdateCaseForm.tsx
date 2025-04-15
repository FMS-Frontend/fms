import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { updateCase } from "../../../../services/managerServices";
import toast from "react-hot-toast";

interface UpdateCaseFormProps {
  onClose?: () => void;
  onPrevious?: () => void;
  tenantId: string;
  caseId: string;
  caseDetails: CaseDetails;
}

const UpdateCaseForm: FC<UpdateCaseFormProps> = ({
  onClose,
  onPrevious,
  tenantId,
  caseId,
  caseDetails,
}) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      priority: caseDetails.priority,
      status: caseDetails.status,
      description: caseDetails.description,
    },
  });

  useEffect(() => {
    if (caseDetails) {
      setValue("priority", caseDetails.priority);
      setValue("status", caseDetails.status);
      setValue("description", caseDetails.description);
    }
  }, [caseDetails, setValue]);

  const onSubmit = async (formData: any) => {
    try {
      await updateCase(tenantId, caseId, formData);
      toast.success("Case updated successfully.");
      queryClient.invalidateQueries({
        queryKey: ["cases", tenantId],
      });
      onClose?.();
    } catch (error: any) {
      console.error("Failed to update case:", error);
      toast.error(error?.message || "Failed to update case. Please try again.");
    }
  };

  return (
    <div className="">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold mb-4">Update Case</h2>

      {/* Priority */}
      <div>
        <label className="block text-gray-700 text-lg font-medium mb-2">
          Priority
        </label>
        <select
          {...register("priority", { required: true })}
          className="w-full px-4 py-2 text-lg border rounded-md bg-gray-50 focus:outline-none focus:border-blue-500"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        {errors.priority && (
          <p className="text-red-500 text-sm mt-1">Priority is required.</p>
        )}
      </div>

      {/* Status */}
      <div>
        <label className="block text-gray-700 text-lg font-medium mb-2">
          Status
        </label>
        <select
          {...register("status", { required: true })}
          className="w-full px-4 py-2 text-lg border rounded-md bg-gray-50 focus:outline-none focus:border-blue-500"
        >
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
        </select>
        {errors.status && (
          <p className="text-red-500 text-sm mt-1">Status is required.</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-gray-700 text-lg font-medium mb-2">
          Description
        </label>
        <textarea
          {...register("description", { required: true })}
          rows={4}
          className="w-full px-4 py-2 text-lg border rounded-md bg-gray-50 focus:outline-none focus:border-blue-500"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">Description is required.</p>
        )}
      </div>


      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={onPrevious}
          className="w-40 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Previous
        </button>
        <button
          type="submit"
          className="w-40 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Update
        </button>
      </div>
    </form>
    </div>
  );
};

export default UpdateCaseForm;
