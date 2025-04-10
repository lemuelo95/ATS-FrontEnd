export default function Button({
  children,
  onClick,
  disabled = false,
  className = '',
  variant = 'primary',
  type = 'button',
}) {
  const baseStyles = 'w-full p-3 rounded transition duration-300';
  const variants = {
    primary: 'bg-[#44CB8D] text-white hover:bg-[#2CF699]',
    secondary: 'bg-white text-green-300 hover:text-green-500',
    disabled: 'bg-gray-400 cursor-not-allowed',
  };

  const buttonStyles = disabled
    ? `${baseStyles} ${variants.disabled}`
    : `${baseStyles} ${variants[variant]}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${buttonStyles} ${className}`}
    >
      {children}
    </button>
  );
} 