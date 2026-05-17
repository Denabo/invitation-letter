import { lazy, Suspense } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useInvitation } from "@/features/invitation";
import staticConfig from "@/config/config";

const MainContent = lazy(
  () => import("@/features/invitation/components/main-content"),
);

function App() {
  const { config, isLoading, error } = useInvitation();
  const activeConfig = config || staticConfig.data;

  if (isLoading) return <div style={{ minHeight: "100vh" }} />;
  if (error)
    return (
      <div
        style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}
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
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 24px 80px" }}>
        <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
          <MainContent />
        </Suspense>
      </div>
    </HelmetProvider>
  );
}

export default App;
