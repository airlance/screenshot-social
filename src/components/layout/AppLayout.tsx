import { ReactNode } from "react";
import { TopBar } from "./TopBar";
import { Sidebar } from "./Sidebar";

export const AppLayout = ({ children, right }: { children: ReactNode; right?: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <div className="max-w-[1280px] mx-auto px-4 flex gap-4">
        <Sidebar />
        <main className="flex-1 min-w-0 py-3 flex gap-4">
          <div className="flex-1 min-w-0 max-w-[600px] mx-auto w-full flex flex-col gap-3">
            {children}
          </div>
          {right && (
            <aside className="hidden xl:flex flex-col w-[280px] shrink-0 py-0 gap-3 sticky top-[72px] self-start max-h-[calc(100vh-72px)]">
              {right}
            </aside>
          )}
        </main>
      </div>
    </div>
  );
};
