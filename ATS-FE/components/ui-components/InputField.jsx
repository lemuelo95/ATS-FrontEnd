import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function InputField({
  type = 'text',
  name,
  placeholder,
  value,
  onChange,
  showPassword,
  onTogglePassword,
  className = '',
}) {
  return (
    <div className="relative">
      <input
        type={type === 'password' && showPassword ? 'text' : type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full border p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10 ${className}`}
        required
      />
      {type === 'password' && (
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
        </button>
      )}
    </div>
  );
} 