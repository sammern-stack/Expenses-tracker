import { queryClientConfig } from "@/config/queryClient.config";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient(queryClientConfig);

export default queryClient;
