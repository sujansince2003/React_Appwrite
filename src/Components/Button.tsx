function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textClr = "text-white",
  className = "",
  onClick,
  ...props
}: any) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`px-4 py-2 rounded-lg ${textClr} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
