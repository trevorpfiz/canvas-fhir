import * as React from "react";
import { Pressable, Text } from "react-native";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { useColorScheme } from "nativewind";

import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "flex-row items-center justify-center rounded-md text-sm font-medium ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary",
        destructive: "bg-destructive",
        outline: "border border-input bg-background",
        secondary: "bg-secondary ",
        ghost: "",
        link: "",
      },
      size: {
        default: "px-6 py-3.5",
        sm: "rounded-md px-3 py-2",
        lg: "rounded-md px-8 py-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const buttonTextVariants = cva("font-medium", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      destructive: "text-destructive-foreground",
      outline: "text-foreground",
      secondary: "text-secondary-foreground",
      ghost: "text-foreground",
      link: "text-primary underline",
    },
    size: {
      default: "text-xl",
      sm: "text-lg",
      lg: "text-2xl",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

// TODO: Fix android ripple overflow on corners
const rippleColor = (isThemeDark: boolean) => {
  const secondary = isThemeDark ? "hsl(240 4% 16%)" : "hsl(240 5% 96%)";
  return {
    default: isThemeDark ? "#d4d4d8" : "#3f3f46",
    destructive: isThemeDark ? "#b91c1c" : "#f87171",
    outline: secondary,
    secondary: isThemeDark ? "#3f3f46" : "#e4e4e7",
    ghost: secondary,
    link: secondary,
  };
};

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> &
    VariantProps<typeof buttonVariants> & {
      textClass?: string;
    }
>(
  (
    {
      className,
      textClass,
      variant = "default",
      size,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const { colorScheme } = useColorScheme();

    // Define a style for the disabled state
    const disabledStyle = { opacity: disabled ? 0.5 : 1 };

    return (
      <Pressable
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        style={disabledStyle}
        android_ripple={{
          color: rippleColor(colorScheme === "dark")[variant as "default"],
          borderless: false,
        }}
        disabled={disabled}
        {...props}
      >
        {typeof children === "string"
          ? ({ pressed }) => (
              <Text
                className={cn(
                  pressed ? "opacity-70" : "",
                  buttonTextVariants({ variant, size, className: textClass }),
                )}
              >
                {children}
              </Text>
            )
          : children}
      </Pressable>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants, buttonTextVariants };
