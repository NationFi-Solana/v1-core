import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        cyan: ' hover:text-black border-cyan-400 hover:bg-cyan-300 border font-bold rounded-md transition-colors',
        primary:
          ' hover:text-black border-primary border-[3px] hover:bg-primary  font-bold rounded-md transition-colors',
        submit:
          'flex justify-center disabled:cursor-not-allowed transition-colors duration-300' +
          ' cursor-pointer w-full text-white py-2 bg-gradient-to-r hover:bg-opacity-70 from-primary-800  to-primary hover:from-primary-800/80 hover:to-primary/80 to rounded-md font-bold',
        blue: 'border-cyan-400 hover:bg-green-500  border font-bold  rounded-md  ',
        red: 'border-cyan-400 hover:bg-red-400 border font-bold  rounded-md  ',
        destructive:
          'border-red-500 border-[3px] text-destructive-foreground hover:bg-red-500/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
