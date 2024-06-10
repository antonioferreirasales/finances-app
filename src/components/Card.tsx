import React, { forwardRef } from 'react';
import { View, Text, ViewProps, TextProps } from 'react-native';
import { cn } from '@/lib/utils';
import { styled } from 'nativewind';

// Create styled components using NativeWind
const StyledView = styled(View);
const StyledText = styled(Text);

const Card = forwardRef<View, ViewProps>(({ className, ...props }, ref) => (
  <StyledView
    ref={ref}
    className={cn(
      'rounded-lg border bg-card text-card-foreground shadow-sm',
      className
    )}
    {...props}
  />
));
Card.displayName = 'Card';

const CardHeader = forwardRef<View, ViewProps>(
  ({ className, ...props }, ref) => (
    <StyledView
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef<Text, TextProps>(
  ({ className, ...props }, ref) => (
    <StyledText
      ref={ref}
      className={cn(
        'text-2xl font-semibold leading-none tracking-tight',
        className
      )}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = forwardRef<Text, TextProps>(
  ({ className, ...props }, ref) => (
    <StyledText
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
);
CardDescription.displayName = 'CardDescription';

const CardContent = forwardRef<View, ViewProps>(
  ({ className, ...props }, ref) => (
    <StyledView ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = forwardRef<View, ViewProps>(
  ({ className, ...props }, ref) => (
    <StyledView
      ref={ref}
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
