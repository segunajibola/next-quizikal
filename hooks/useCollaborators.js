import { useQuery } from "@tanstack/react-query";
import { fetchCollaborators } from "@/lib/utils";

export const useCollaborators = () => {
  return useQuery({
    queryKey: ["quizikal-collaborators"],
    queryFn: fetchCollaborators,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: undefined,
    retry: false,
  });
};

// export const useUser = () => {
//   const user = useQuery({
//     queryKey: ["authUser"],
//     queryFn: () => Http.get < AuthRes > "/users/user",
//     refetchOnMount: false,
//     refetchOnWindowFocus: false,
//     refetchOnReconnect: false,
//     initialData: undefined,
//     retry: false,
//     onError: () => {
//       // handleError(error) removed from line 2 - ts error
//     },
//   });
//   return {
//     user,
//   };
// };

// const {
//     user: { data, isLoading },
//   } = useUser();
