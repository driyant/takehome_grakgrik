import { Box, Flex } from "@chakra-ui/react";
import BottomNav from "./ButtonNav";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <Flex
      direction="column"
      maxW="420px"
      mx="auto"
      h="100vh"
      bg="white"
      borderX="1px solid #eee"
    >
      {/* Content */}
      <Box flex="1" overflowY="auto">
        <Outlet />
      </Box>

      {/* Bottom Nav */}
      <BottomNav />
    </Flex>
  );
}
