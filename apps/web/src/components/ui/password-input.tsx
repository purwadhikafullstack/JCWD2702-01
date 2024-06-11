import * as React from 'react';

import { cn } from '@/lib/utils';
import { Input } from './input';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <Input
        type={showPassword ? 'text' : 'password'}
        suffix={
          showPassword ? (
            <EyeIcon
              onClick={() => setShowPassword(false)}
              className=" hover:cursor-pointer"
            />
          ) : (
            <EyeOffIcon
              onClick={() => setShowPassword(true)}
              className=" hover:cursor-pointer"
            />
          )
        }
        className={className}
        {...props}
        ref={ref}
      />
    );
  },
);
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
