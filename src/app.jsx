import { lazy, Suspense } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useInvitation } from "@/features/invitation";
import staticConfig from "@/config/config";

const LandingPage = lazy(
  () => import("@/features/invitation/components/landing-page"),
);

function App() {
  const { config, isLoading, error } = useInvitation();
  const activeConfig = config || staticConfig.data;

  if (isLoading) return <div style={{ minHeight: "100dvh" }} />;
  if (error)
    return (
      <div
        style={{ minHeight: "100dvh", display: "grid", placeItems: "center" }}
      >
        {error}
      </div>
    );

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
