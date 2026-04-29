/**
 * Input Component - Global
 * Componente reutilizable de input para toda la aplicación
 * Se usa en más de dos módulos (auth, user, contact, etc)
 */

import React from 'react';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className,
  ...props
}) => {
  return (
    <div className={`${styles.inputGroup} ${className || ''}`}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={`${styles.input} ${error ? styles['input--error'] : ''}`}
        {...props}
      />
      {error && <span className={styles.error}>{error}</span>}
      {helperText && !error && <span className={styles.helperText}>{helperText}</span>}
    </div>
  );
};
