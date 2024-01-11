import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";

//pages
import Dashboard from "./pages/Dashboard";
import Preview from "./pages/Preview";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import { Toaster } from "react-hot-toast";

//

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            fontSize: "1rem",
            padding: "0.8rem 1.2rem",
            color: "var(--color-grey-50)",
            backgroundColor: "var(--color-grey-600)",
            maxWidth: "max-content",
          },
          iconTheme: {
            primary: "var(--color-brand-500)",
            secondary: "#FFFAEE",
          },
        }}
      />
      <Provider store={store}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="/dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="account" element={<Account />} />
          </Route>
          <Route path="preview" element={<Preview />} />
          <Route path="login" element={<Login />} />
          <Route path="dignup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
