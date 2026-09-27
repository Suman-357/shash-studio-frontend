import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitRegistration, submitInquiry } from "../services/api";

/**
 * Mutation hook for workshop registrations
 */
export const useRegisterMutation = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (registrationPayload) => submitRegistration(registrationPayload),
    onSuccess: (data, variables, context) => {
      // Invalidate workshops to update available spot counters
      queryClient.invalidateQueries({ queryKey: ["workshops"] });
      if (options.onSuccess) options.onSuccess(data, variables, context);
    },
    onError: (error, variables, context) => {
      if (options.onError) options.onError(error, variables, context);
    },
  });
};

/**
 * Mutation hook for contact messages & scholarships
 */
export const useInquiryMutation = (options = {}) => {
  return useMutation({
    mutationFn: (inquiryPayload) => submitInquiry(inquiryPayload),
    onSuccess: (data, variables, context) => {
      if (options.onSuccess) options.onSuccess(data, variables, context);
    },
    onError: (error, variables, context) => {
      if (options.onError) options.onError(error, variables, context);
    },
  });
};
