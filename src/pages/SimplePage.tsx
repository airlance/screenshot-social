import { AppLayout } from "@/components/layout/AppLayout";

const SimplePage = ({ title }: { title: string }) => (
  <AppLayout>
    <div className="vk-card p-8 text-center">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-muted-foreground">Раздел в разработке</p>
    </div>
  </AppLayout>
);

export default SimplePage;
