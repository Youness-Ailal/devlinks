import SpinnerScreen from "@/components/ui/SpinnerScreen";
import { useUser } from "@/features/auth/useUser";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isLoading, isAuthenticated } = useUser();
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/signin");
      queryClient.clear();
    }
  }, [isAuthenticated, isLoading, navigate, queryClient]);

  if (isLoading) {
    return <SpinnerScreen />;
  }

  if (isAuthenticated) return <>{children}</>;
}

export default ProtectedRoute;
