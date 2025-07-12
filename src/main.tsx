import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AppProvider } from "./context/AppContext.tsx";
import { BrowserRouter } from "react-router-dom";
import { RuleProvider } from "./features/manager/rules/RuleContext.tsx";
import CustomLoader from "./ui/utils/CustomLoader.tsx";
import ErrorBoundary from "./ui/utils/ErrorBoundary.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<CustomLoader />}>
        <BrowserRouter>
          <AppProvider>
            <RuleProvider>
              <App />
            </RuleProvider>
          </AppProvider>
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  </StrictMode>
);
