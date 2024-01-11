import { getCurrentUser } from "@/services/authApi";

async function useUser() {
  const user = getCurrentUser();
  return user;
}

export default useUser;
