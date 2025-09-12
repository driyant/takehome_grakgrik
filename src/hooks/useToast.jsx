import { useToast as chakraUseToast } from "@chakra-ui/react";

const useToast = () => {
  const toast = chakraUseToast();
  return (props) =>
    toast({
      duration: 3000,
      isClosable: true,
      position: "top",
      ...props,
    });
};

export default useToast;
