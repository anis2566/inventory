import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { client } from "@/lib/client";

type ResponseType = InferResponseType<typeof client.api.auth.login.$post>;
type RequestType = InferRequestType<typeof client.api.auth.login.$post>["json"];

interface UseLoginProps {
  callbackUrl: string;
}

export function useLogin({ callbackUrl }: UseLoginProps) {
  const router = useRouter();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.auth.login.$post({ json });
      return await response.json();
    },
    onError: () => {
      toast.error("Invalid email or password");
    },
    onSuccess: () => {
      router.push(callbackUrl);
    },
  });

  return mutation;
}
