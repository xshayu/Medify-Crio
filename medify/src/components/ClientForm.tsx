'use client';

import { FormEventHandler, ReactNode } from 'react';

interface ClientFormProps {
  onSubmit?: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
  className?: string;
}

const ClientForm = ({ onSubmit, children, className }: ClientFormProps) => {
    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault();
      onSubmit?.(e);  // Call the parent's handler if provided
    };
  
    return (
      <form onSubmit={handleSubmit} className={className}>
        {children}
      </form>
    );
};
  
export default ClientForm;