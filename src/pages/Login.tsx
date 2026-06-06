import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAccounts } from "@/context/AccountsContext";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { addAccount, accounts, switchAccount } = useAccounts();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedUser = username.trim();
    const trimmedName = name.trim() || trimmedUser;
    if (!trimmedUser || !password) {
      toast({ title: "Заполните все поля", variant: "destructive" });
      return;
    }
    const handle = trimmedUser.startsWith("@") ? trimmedUser : `@${trimmedUser}`;
    const existing = accounts.find((a) => a.username === handle);
    if (existing) {
      switchAccount(existing.id);
      toast({ title: `Вход выполнен`, description: `Переключено на ${existing.name}` });
    } else {
      const acc = addAccount({ name: trimmedName, username: handle });
      toast({ title: "Аккаунт добавлен", description: acc.name });
    }
    navigate("/feed");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <Link
          to="/feed"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" /> Назад
        </Link>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-elevated">
          <div className="flex flex-col items-center text-center mb-6">
            <span className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold">
              VK
            </span>
            <h1 className="mt-4 text-2xl font-semibold">Вход в ВКонтакте</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Добавьте ещё одну учётную запись, чтобы быстро переключаться между ними
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Имя</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Иван Иванов"
                autoComplete="name"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="username">Логин или ID</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="@username"
                autoComplete="username"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </div>

            <Button type="submit" className="w-full h-11 rounded-lg">
              Войти
            </Button>
          </form>

          <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            или
            <span className="h-px flex-1 bg-border" />
          </div>

          <button
            type="button"
            className="w-full inline-flex items-center justify-center gap-2 h-11 rounded-lg bg-secondary text-sm font-medium hover:bg-accent"
          >
            <QrCode className="w-4 h-4" /> Войти по QR-коду
          </button>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Нет аккаунта? <span className="text-primary cursor-pointer">Зарегистрироваться</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
