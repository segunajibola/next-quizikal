import { getQuiz } from "@/app/api/firebase";

export const useQuizData = (lang) => {
  return useQuery({
    queryKey: ["quizikal-data"],
    queryFn: () => getQuiz(lang),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: undefined,
    retry: false,
  });
};
