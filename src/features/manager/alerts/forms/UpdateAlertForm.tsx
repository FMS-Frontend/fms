import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateAlert, logAlertAction } from "../../../../services/managerServices";

interface UpdateAlertFormProps {
  onClose?: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  tenantId: string;
  alertId: string;
  alertDetails: {
    description?: string;
    status?: "Open" | "Closed";
    severity?: "Low" | "Medium" | "High";
  };
}

const UpdateAlertForm: FC<UpdateAlertFormProps> = ({
  onClose,
  tenantId,
  alertId,
  alertDetails,
}) => {
  const queryClient = useQueryClient();
  const [actionDescription, setActionDescription] = useState("");


  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: alertDetails.description || "",
      status: alertDetails.status,
      severity: alertDetails.severity,
      reOpenReason: "",
    },
  });

  const status = watch("status");

  useEffect(() => {
    if (alertDetails) {
      setValue("description", alertDetails.description || "");
      setValue("status", alertDetails.status || "Open");
      setValue("severity", alertDetails.severity || "Low");
    }
  }, [alertDetails, setValue]);

  const onSubmit = async (formData: any) => {
    try {
      await updateAlert(tenantId, alertId, {
        description: formData.description,
        status: formData.status,
        severity: formData.severity,
        ...(formData.status === "Open" ? { reOpenReason: formData.reOpenReason } : {}),
      });
      toast.success("Alert updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["alerts", tenantId] });

      if (actionDescription?.trim()) {
        await logAlertAction(tenantId, alertId, { description: actionDescription });
        // toast.success("Action logged successfully.");
      }

      onClose?.();
    } catch (error: any) {
      console.error("Failed to update alert:", error);
      toast.error(error?.message || "Failed to update alert. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold mb-4">Update Alert</h2>
        <h2 className="text-3xl font-semibold">
          <b>Alert</b>-A{alertId.slice(0, 8)}
        </h2>

        {/* Severity */}
        <div>
          <label className="block text-gray-700 text-lg font-medium mb-2">Severity</label>
          <select
            {...register("severity", { required: true })}
            className="w-full px-4 py-2 text-lg border rounded-md bg-gray-50 focus:outline-none focus:border-blue-500"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          {errors.severity && <p className="text-red-500 text-sm mt-1">Severity is required.</p>}
        </div>

        {/* Status */}
        <div>
          <label className="block text-gray-700 text-lg font-medium mb-2">Status</label>
          <select
            {...register("status", { required: true })}
            className="w-full px-4 py-2 text-lg border rounded-md bg-gray-50 focus:outline-none focus:border-blue-500"
          >
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
          {errors.status && <p className="text-red-500 text-sm mt-1">Status is required.</p>}
        </div>

        {/* Re-open Reason (only if status is Open) */}
        {status === "Open" && (
          <div>
            <label className="block text-gray-700 text-lg font-medium mb-2">Re-open Reason</label>
            <input
              {...register("reOpenReason", { required: true })}
              placeholder="Enter reason for reopening"
              className="w-full px-4 py-2 text-lg border rounded-md bg-gray-50 focus:outline-none focus:border-blue-500"
            />
            {errors.reOpenReason && (
              <p className="text-red-500 text-sm mt-1">Re-open reason is required.</p>
            )}
          </div>
        )}

        {/* Description */}
        <div>
          <label className="block text-gray-700 text-lg font-medium mb-2">Description</label>
          <textarea
            {...register("description", { required: true })}
            rows={4}
            className="w-full px-4 py-2 text-lg border rounded-md bg-gray-50 focus:outline-none focus:border-blue-500 h-[80px] min-h-[80px] max-h-[120px] overflow-y-auto"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">Description is required.</p>
          )}
        </div>

        {/* Log Action */}
        <div>
          <label className="block text-gray-700 text-lg font-medium mb-2">
            Log Action (optional)
          </label>
          <textarea
            value={actionDescription}
            onChange={(e) => setActionDescription(e.target.value)}
            rows={2}
            placeholder="Describe the action taken..."
            className="w-full px-4 py-2 text-lg border rounded-md bg-gray-50 h-[60px] min-h-[60px] max-h-[100px] overflow-y-auto"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={onClose}
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

export default UpdateAlertForm;
