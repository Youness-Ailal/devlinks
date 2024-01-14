import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

//pages
import Dashboard from "./pages/Dashboard";
import Preview from "./pages/Preview";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProfileProvider from "./context/ProfileContext";
import SocialLinksProvider from "./context/LinksContext";

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
            position="bottom-center"
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
          <Routes>
            <Route
              element={
                <SocialLinksProvider>
                  <ProfileProvider>
                    <AppLayout />
                  </ProfileProvider>
                </SocialLinksProvider>
              }>
              <Route index element={<Navigate replace to="/dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="account" element={<Account />} />
            </Route>
            <Route path="preview" element={<Preview />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
