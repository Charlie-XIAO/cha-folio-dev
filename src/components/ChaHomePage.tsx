import { PropsWithChildren, ReactNode } from "react";

export interface ChaHomePageProps {
  title: ReactNode;
  description?: ReactNode;
}

export function ChaHomePage({
  title,
  description,
  children,
}: PropsWithChildren<ChaHomePageProps>) {
  return (
    <div className="w-full max-w-[960px] mx-auto px-4 py-12">
      <h1 className="prose text-4xl font-bold text-fd-primary mb-2">{title}</h1>
      <p className="prose text-lg text-fd-muted-foreground mb-8">
        {description}
      </p>

      {children}
    </div>
  );
}
