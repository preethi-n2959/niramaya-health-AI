import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "py-3 px-6 rounded-xl font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm";
  
  const variants = {
    primary: "bg-teal-600 text-white hover:bg-teal-700 shadow-teal-200",
    secondary: "bg-white text-teal-700 border border-teal-100 hover:bg-teal-50",
    outline: "border-2 border-slate-200 text-slate-600 hover:border-teal-500 hover:text-teal-600"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};