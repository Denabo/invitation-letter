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
      <div
        style={{
          maxWidth: 390,
          width: "100%",
          margin: "0 auto",
          padding: "0 0 60px",
          background: "var(--white)",
          boxShadow: "0 0 80px rgba(0,0,0,0.1)",
          minHeight: "100vh",
          position: "relative",
        }}
      >
        <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
          <LandingPage />
        </Suspense>
      </div>
    </HelmetProvider>
  );
}

export default App;
