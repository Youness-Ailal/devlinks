import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./layouts/ProtectedRoute";
import ProfileProvider from "./context/ProfileContext";
import SocialLinksProvider from "./context/LinksContext";
import("./layouts/AppLayout");

//pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
import Preview from "./pages/Preview";
import Account from "./pages/Account";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import UpdatePassword from "./pages/UpdatePassword";
import ResetPassword from "./pages/ResetPassword";
import DevLink from "./pages/DevLink";
import SpinnerScreen from "./components/SpinnerScreen";

//
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <BrowserRouter>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 2000,
              style: {
                fontSize: "1rem",
                padding: "0.8rem 1.2rem",
                color: "var(--color-grey-50)",
                backgroundColor: "var(--color-grey-700)",
                maxWidth: "max-content",
              },
              iconTheme: {
                primary: "var(--color-brand-500)",
                secondary: "#FFFAEE",
              },
            }}
          />
          <Suspense fallback={<SpinnerScreen />}>
            <Routes>
              <Route path="/:id" element={<DevLink />} />
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }>
                <Route index element={<Navigate replace to="/dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="account" element={<Account />} />
              </Route>
              <Route
                path="preview"
                element={
                  <ProtectedRoute>
                    <SocialLinksProvider>
                      <ProfileProvider>
                        <Preview />
                      </ProfileProvider>
                    </SocialLinksProvider>
                  </ProtectedRoute>
                }
              />
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="update-password" element={<UpdatePassword />} />
              <Route path="reset-password" element={<ResetPassword />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
