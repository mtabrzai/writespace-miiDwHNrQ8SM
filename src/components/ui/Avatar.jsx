import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Avatar = ({
  src,
  alt,
  size = 'medium',
  shape = 'circle',
  variant = 'default',
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center overflow-hidden font-medium';

  const sizeClasses = {
    small: 'w-8 h-8 text-sm',
    medium: 'w-10 h-10 text-base',
    large: 'w-12 h-12 text-lg',
    xlarge: 'w-16 h-16 text-xl',
  };

  const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-md',
  };

  const variantClasses = {
    default: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
    accent: 'bg-accent text-white',
    danger: 'bg-danger text-white',
    warning: 'bg-warning text-white',
    info: 'bg-info text-white',
    light: 'bg-light text-dark',
    dark: 'bg-dark text-white',
  };

  const classes = clsx(
    baseClasses,
    sizeClasses[size],
    shapeClasses[shape],
    variantClasses[variant],
    className
  );

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={clsx(shapeClasses[shape], sizeClasses[size], className)}
        {...props}
      />
    );
  }

  return (
    <div className={classes} {...props}>
      {alt ? alt.charAt(0).toUpperCase() : '?'}
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  shape: PropTypes.oneOf(['circle', 'square']),
  variant: PropTypes.oneOf([
    'default',
    'primary',
    'secondary',
    'accent',
    'danger',
    'warning',
    'info',
    'light',
    'dark',
  ]),
  className: PropTypes.string,
};

export default Avatar;