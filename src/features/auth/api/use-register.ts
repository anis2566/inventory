import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { client } from "@/lib/client";

type ResponseType = InferResponseType<typeof client.api.auth.register.$post>;
type RequestType = InferRequestType<
  typeof client.api.auth.register.$post
>["json"];

interface UseRegisterProps {
  callbackUrl: string;
}

export function useRegister({ callbackUrl }: UseRegisterProps) {
  const router = useRouter();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.auth.register.$post({ json });
      return await response.json();
    },
    onError: () => {
      toast.error("Email already exists");
    },
    onSuccess: () => {
      router.push(callbackUrl);
    },
  });

  return mutation;
}
