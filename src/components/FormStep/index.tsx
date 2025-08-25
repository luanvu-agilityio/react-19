interface FormStepProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  isActive: boolean;
}

export function FormStep({
  title,
  description,
  children,
  isActive,
}: Readonly<FormStepProps>) {
  if (!isActive) return null;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{title}</h2>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      {children}
    </div>
  );
}
