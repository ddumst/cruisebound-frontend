import { MainService } from "@/services/main.service";
import { useQuery } from "@tanstack/react-query";

export const useSailing = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['sailings'],
    queryFn: MainService.getSailings,
  })

  return {
    data,
    isLoading,
    refetch,
  };
};