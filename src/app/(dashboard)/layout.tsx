import { Header } from "@/components/layout/header";
import { GradientBackground } from "@/components/layout/gradientBackground";
import { PageContainer } from "@/components/layout/pageContainer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen relative">
      <GradientBackground />
      <Header />
      <PageContainer>{children}</PageContainer>
    </div>
  );
}
