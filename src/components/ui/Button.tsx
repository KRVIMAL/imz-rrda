// src/components/ui/Button.tsx - Themed button component
import React from 'react';
import { IconType } from 'react-icons';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  icon?: IconType;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  children: React.ReactNode;
  
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  isLoading = false,
  children,
  className = '',
  disabled,
  onClick,
  ...props
}) => {
  const baseClasses = 'btn';
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    success: 'bg-success-600 hover:bg-success-700 text-text-inverse',
    warning: 'bg-warning-600 hover:bg-warning-700 text-text-inverse',
    error: 'bg-error-600 hover:bg-error-700 text-text-inverse',
  };
  
  const sizeClasses = {
    sm: 'px-sm py-xs text-caption',
    md: 'px-md py-sm text-body-small',
    lg: 'px-lg py-md text-body',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button
      className={classes}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}

    >
      {isLoading ? (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
      ) : (
        Icon && iconPosition === 'left' && <Icon className="w-4 h-4 mr-2" />
      )}
      {children}
      {Icon && iconPosition === 'right' && !isLoading && <Icon className="w-4 h-4 ml-2" />}
    </button>
  );
};

export default Button;