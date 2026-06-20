import { lazy, Suspense } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import staticConfig from "@/config/config";

const LandingPage = lazy(
  () => import("@/features/invitation/components/landing-page"),
);

function App() {
  const activeConfig = staticConfig.data;

  return (
    <HelmetProvider>
      <Helmet>
        <title>{activeConfig.title}</title>
        <meta name="description" content={activeConfig.description} />
        <link rel="icon" type="image/x-icon" href={activeConfig.favicon} />
      </Helmet>
      <div className="main-screen">
        <Suspense fallback={<div style={{ minHeight: "100dvh" }} />}>
          <LandingPage />
        </Suspense>
      </div>
    </HelmetProvider>
  );
}

export default App;
