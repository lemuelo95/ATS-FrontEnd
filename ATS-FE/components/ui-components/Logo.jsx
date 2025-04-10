import logo2 from '@/assets/RS_2.svg';
import logo from '@/assets/ATS.svg';

export default function Logo({ type = 'main', className = '' }) {
  const logos = {
    main: logo,
    secondary: logo2,
  };

  return (
    <img
      src={logos[type]}
      alt={type === 'main' ? 'ATS Logo' : 'RydeSync Logo'}
      className={className}
    />
  );
} 