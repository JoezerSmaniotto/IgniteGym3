import { Input as NativeBaseInput, IInputProps, FormControl } from 'native-base';

type Props = IInputProps & {
  errorMessage?: string | null;
}

export function Input({ errorMessage = null, isInvalid, ...rest }: Props) {
  const invalid = !!errorMessage || isInvalid;
  // Para verficar se o input é invalido olho errorMessage OU a outro 
  // props o isInvalid que é uma prop do Input, então posso escolher 
  // passar essa prop para invalidar, isso é opcional.
  return (
    // Com o FormControl do native-base conseguimos dizer se o Imput é INVÁLIDO ou não.
    <FormControl isInvalid={invalid} mb={4}>
      <NativeBaseInput
        bg="gray.700"
        h={14}
        px={4}
        borderWidth={0}
        fontSize="md"
        color="white"
        fontFamily="body"
        w="full"
        placeholderTextColor="gray.300"
        isInvalid={invalid}
        _invalid={{
          borderWidth: 1,
          borderColor: "red.500"
        }}
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
      <FormControl.ErrorMessage>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}