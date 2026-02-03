import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  icon,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-4 py-3 rounded-xl font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background";
  
  const variants = {
    // Primary: Uses the #a7aef0 color. 
    // Since it's light, we might want darker text in light mode, or keep white with shadow.
    // Let's use a gradient to giving it some pop.
    primary: "bg-gradient-to-r from-primary to-blue-400 text-white shadow-lg shadow-primary/20 hover:shadow-primary/40 focus:ring-primary",
    
    // Secondary: In Light mode #a6c0f1 (Blue), Dark #292929 (Dark Grey)
    secondary: "bg-surfaceHighlight dark:bg-surfaceHighlight text-slate-700 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600 focus:ring-slate-500",
    
    danger: "bg-danger/10 text-danger hover:bg-danger/20 focus:ring-danger",
    ghost: "bg-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5",
    outline: "border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-slate-400 hover:text-slate-900 dark:hover:text-white bg-transparent"
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;