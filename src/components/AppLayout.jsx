import { Box } from "@chakra-ui/react";

const AppLayout = ({ children }) => {
  return (
    <Box
      bg="white"
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        w="100%"
        maxW="390px"
        minH="100vh"
        bg="white"
        borderX="1px solid #e5e5e5"
      >
        {children}
      </Box>
    </Box>
  );
};

export default AppLayout;
