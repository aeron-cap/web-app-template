import type { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
}

export function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(styles.button, styles[variant], className)}
      {...props}
    />
  );
}
