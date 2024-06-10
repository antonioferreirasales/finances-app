import React from 'react';
import { Text, Pressable, TouchableOpacity, View } from 'react-native';
import { styled } from 'nativewind';

const StyledButton = styled(TouchableOpacity);
const StyledText = styled(Text);

interface CardButtonProps {
  title: string;
  onPress?: () => void;
}

export function CardButton({ title, onPress, ...props }: CardButtonProps) {
  return (
    <View className="flex items-center justify-center w-full">
      <StyledButton
        className="bg-black rounded-lg py-3 px-4 mt-4 w-full"
        {...props}
        onPress={onPress}
      >
        <StyledText className="text-white text-center">{title}</StyledText>
      </StyledButton>
    </View>
  );
}
