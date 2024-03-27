type HelperText = {
  type?: "info" | "danger" | "success" | "warning" | "default"
  children: JSX.Element | string | number,
}

export default function HelperText({ type = "default", children }: HelperText) {

  return (
    <div className={`helper-text ${type}`} role="alert">
      {children}
    </div>
  );
}