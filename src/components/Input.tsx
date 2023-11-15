import { Input as NativeBaseInput, IInputProps } from 'native-base'

export function Input({ ...rest }: IInputProps) {
  return (
    <NativeBaseInput
      bg="gray.700"
      h={14}
      px={4}
      borderWidth={0}
      fontSize="md"
      color="white"
      fontFamily="body"
      mb={4}
      w="full"
      placeholderTextColor="gray.300"
      _focus={{
        bgColor: 'gray.700',
        borderWidth: 1,
        borderColor: 'green.500'
      }}
      _disabled={{// Fiz isso para o input de e-mail na screen Profile, para diferenciar o quando o input estiver disabled
        bgColor: 'gray.400',
        opacity: '0.2',
        color: "white"
      }}
      {...rest}
    />
  );
}