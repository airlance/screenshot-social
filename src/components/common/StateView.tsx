import { AlertTriangle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

type BaseProps = {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
};

export const EmptyState = ({ icon, title, description, action, className }: BaseProps) => (
  <div
    className={cn(
      "flex flex-col items-center justify-center text-center py-16 px-6 gap-3",
      className,
    )}
  >
    {icon && (
      <div className="w-16 h-16 rounded-2xl bg-secondary/70 flex items-center justify-center text-muted-foreground">
        {icon}
      </div>
    )}
    <div className="font-semibold text-base text-foreground">{title}</div>
    {description && (
      <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
        {description}
      </p>
    )}
    {action}
  </div>
);

export const ErrorState = ({
  title = "Не удалось загрузить данные",
  description = "Проверьте соединение и попробуйте ещё раз.",
  onRetry,
  className,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}) => (
  <div
    className={cn(
      "flex flex-col items-center justify-center text-center py-16 px-6 gap-3",
      className,
    )}
  >
    <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center text-destructive">
      <AlertTriangle className="w-7 h-7" />
    </div>
    <div className="font-semibold text-base text-foreground">{title}</div>
    <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">{description}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="vk-pill flex items-center gap-2 mt-1"
      >
        <RefreshCw className="w-4 h-4 text-primary" /> Повторить
      </button>
    )}
  </div>
);
