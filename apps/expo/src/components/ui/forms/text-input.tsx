import React from "react";
import { TextInput as RNTextInput, Text, View } from "react-native";
import type { TextInputProps } from "react-native";
import clsx from "clsx";

interface Props extends TextInputProps {
  errorMessage?: string;
  label: string;
  className?: string;
}

const TextInput = React.forwardRef<RNTextInput, Props>(
  ({ errorMessage, label, className, ...props }, ref) => {
    return (
      <View className={clsx("mb-4 w-full", className)}>
        <Text className="mb-2 text-lg font-medium text-gray-900">{label}</Text>
        <RNTextInput
          ref={ref}
          className={clsx(
            "h-12 rounded-xl border bg-white px-3",
            errorMessage ? "border-red-500" : "border-gray-300",
            className,
          )}
          autoCorrect={false}
          autoCapitalize="none"
          {...props}
        />
        {!!errorMessage && (
          <Text className="mt-1 text-sm text-red-500">{errorMessage}</Text>
        )}
      </View>
    );
  },
);
TextInput.displayName = "TextInput";

export { TextInput };