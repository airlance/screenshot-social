import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, LogOut, Plus, Trash2, Shield, Bell } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useAccounts, getInitials } from "@/context/AccountsContext";
import { cn } from "@/lib/utils";

const Accounts = () => {
  const { accounts, activeId, activeAccount, switchAccount, removeAccount } = useAccounts();
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const handleSwitch = (id: string) => {
    if (id !== activeId) {
      switchAccount(id);
    }
  };

  const handleRemove = (id: string) => {
    if (confirmDelete === id) {
      removeAccount(id);
      setConfirmDelete(null);
    } else {
      setConfirmDelete(id);
      setTimeout(() => setConfirmDelete((prev) => (prev === id ? null : prev)), 3000);
    }
  };

  return (
    <AppLayout variant="wide">
      <div className="vk-card p-5">
        <div className="flex items-center gap-3 mb-6">
          <Link
            to="/settings"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" /> Назад
          </Link>
        </div>

        <h1 className="text-2xl font-semibold mb-1">Управление аккаунтами</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Добавляйте, переключайтесь и удаляйте учётные записи
        </p>

        <div className="flex flex-col gap-3">
          {accounts.map((acc) => {
            const isActive = acc.id === activeId;
            const isConfirming = confirmDelete === acc.id;
            return (
              <div
                key={acc.id}
                className={cn(
                  "group relative flex items-center gap-4 rounded-xl border p-4 transition-colors",
                  isActive
                    ? "border-primary/30 bg-primary/[0.03]"
                    : "border-border bg-card hover:bg-secondary/30"
                )}
              >
                <div className="relative">
                  <div
                    className={cn(
                      "flex items-center justify-center rounded-full text-white font-semibold",
                      isActive ? "w-14 h-14 text-lg ring-2 ring-primary" : "w-12 h-12 text-sm"
                    )}
                    style={{ background: acc.avatarColor }}
                  >
                    {getInitials(acc.name)}
                  </div>
                  {acc.hasNotifications && (
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-destructive border-2 border-card" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={cn("font-semibold", isActive ? "text-foreground" : "text-foreground/90")}>
                      {acc.name}
                    </span>
                    {isActive && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                        <CheckCircle2 className="w-3 h-3" /> Активный
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground mt-0.5">{acc.username}</div>
                </div>

                <div className="flex items-center gap-2">
                  {!isActive && (
                    <>
                      <button
                        onClick={() => handleSwitch(acc.id)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                      >
                        <LogOut className="w-4 h-4 rotate-180" />
                        Переключиться
                      </button>
                      <button
                        onClick={() => handleRemove(acc.id)}
                        className={cn(
                          "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                          isConfirming
                            ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            : "bg-secondary text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        )}
                      >
                        {isConfirming ? (
                          <span className="flex items-center gap-1.5">
                            <Trash2 className="w-4 h-4" /> Подтвердить
                          </span>
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <Link
            to="/login"
            className="flex items-center gap-3 rounded-xl border border-dashed border-border p-4 text-muted-foreground hover:border-primary/30 hover:bg-primary/[0.03] hover:text-foreground transition-colors"
          >
            <span className="flex w-10 h-10 items-center justify-center rounded-full bg-secondary">
              <Plus className="w-5 h-5" />
            </span>
            <span className="text-sm font-medium">Добавить аккаунт</span>
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-secondary/40 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold">Безопасность</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Все аккаунты хранятся локально в вашем браузере. Данные не отправляются на сервер.
            </p>
          </div>
          <div className="rounded-xl bg-secondary/40 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Bell className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold">Уведомления</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Уведомления и настройки привязаны к каждому аккаунту отдельно.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Accounts;
