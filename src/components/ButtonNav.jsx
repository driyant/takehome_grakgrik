import { Flex, Box, Text, IconButton } from "@chakra-ui/react";
import {
  FaHome,
  FaPaw,
  FaCommentDots,
  FaShareAlt,
  FaBookmark,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const navs = [
  { label: "Home", icon: FaHome, to: "/" },
  { label: "Arena", icon: FaPaw, to: "/arena" },
  { label: "Comment", icon: FaCommentDots, to: "/comment" },
  { label: "Share", icon: FaShareAlt, to: "/share" },
  { label: "Save", icon: FaBookmark, to: "/save" },
];

export default function BottomNav() {
  const navigate = useNavigate();

  return (
    <Flex
      h="60px"
      borderTop="1px solid #eee"
      align="center"
      justify="space-around"
      bg="white"
    >
      {navs.map((nav) => (
        <Box
          key={nav.label}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          flex="1"
        >
          <IconButton
            aria-label={nav.label}
            icon={<nav.icon size={24} />}
            variant="ghost"
            onClick={() => navigate(nav.to)}
            size="lg"
            isRound
            mb={1}
            _focus={{ boxShadow: "none" }}
          />
          <Text fontSize="sm" mt={-1}>
            {nav.label}
          </Text>
        </Box>
      ))}
    </Flex>
  );
}
