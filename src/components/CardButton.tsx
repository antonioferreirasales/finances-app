import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styled } from 'nativewind';

interface CardButtonProps {
  title: string;
  onPress?: () => void;
  children?: React.ReactNode;
}

function CardButtonContent({
  title,
  onPress,
  children,
  ...props
}: CardButtonProps) {
  return (
    <View className="flex items-center justify-center w-full">
      <TouchableOpacity
        className="bg-black rounded-lg py-3 px-4 mt-4 w-full"
        {...props}
        onPress={onPress}
      >
        {children && children}
        <Text className="text-white text-center">{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const CardButton = styled(CardButtonContent);
export { CardButton };
