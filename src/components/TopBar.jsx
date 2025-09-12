import {
  Flex,
  Button,
  Avatar,
  HStack,
  WrapItem,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useShowModals from "../hooks/useShowModals";
import useIndexStore from "../store";

export default function TopBar() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useShowModals();
  const isLogin = useIndexStore((state) => state.isLogin);
  const profile = useIndexStore((state) => state.profile);

  const handleAvatarClick = () => {
    if (isLogin) {
      navigate("/profile");
    } else {
      onOpen();
    }
  };

  console.log(profile, "<<<< profile in topbar");

  return (
    <Flex
      h="60px"
      p={4}
      align="center"
      justify="space-between"
      borderBottom="1px solid #eee"
      bg="white"
      marginBottom="0.5rem"
      zIndex={10}
      position="sticky"
      top="0"
    >
      {!isLogin ? (
        <>
          {" "}
          {/* Avatar */}
          <WrapItem cursor={"pointer"} onClick={handleAvatarClick}>
            <Avatar
              size="md"
              name="User"
              src="https://api.dicebear.com/6.x/adventurer/svg?seed=User"
              border="3px solid"
              borderColor="pink.400"
            />
          </WrapItem>
          {/* Login and Register Button */}
          <HStack spacing={3}>
            <Button
              as={RouterLink}
              to="/login"
              variant="outline"
              colorScheme="blackAlpha"
              size="sm"
              rounded="md"
            >
              Login
            </Button>
            <Button
              as={RouterLink}
              to="/register"
              bg="black"
              color="white"
              _hover={{ bg: "gray.800" }}
              size="sm"
              rounded="md"
            >
              Register
            </Button>
          </HStack>
          {/* Modal */}
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader textAlign="center" fontWeight="bold" fontSize="xl">
                Login first
              </ModalHeader>
              <ModalBody>
                <Text textAlign="center" fontSize="md">
                  Your save can't access profile because you're not logged in.
                  Please login first.
                </Text>
              </ModalBody>
              <ModalFooter display="flex" justifyContent="center" gap={4}>
                <Button
                  variant="outline"
                  color="black"
                  borderColor="black"
                  borderWidth="2px"
                  fontWeight="bold"
                  fontSize="lg"
                  w="48%"
                  h="60px"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  bg="black"
                  color="white"
                  _hover={{ bg: "gray.800" }}
                  fontWeight="bold"
                  fontSize="lg"
                  w="48%"
                  h="60px"
                  as={RouterLink}
                  to="/login"
                  onClick={onClose}
                >
                  Login
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      ) : (
        <Flex align="center" gap={3}>
          {/* Avatar */}
          <WrapItem cursor="pointer" onClick={() => navigate("/profile")}>
            <Avatar
              size="md"
              name="User"
              src={
                profile?.profile?.photo ||
                "https://api.dicebear.com/6.x/adventurer/svg?seed=User"
              }
              border="3px solid"
              borderColor="purple.300"
            />
          </WrapItem>
          {/* Tab For You */}
          <Text
            fontWeight="bold"
            borderBottom="2px solid black"
            pb="2px"
            cursor="pointer"
          >
            For You
          </Text>
        </Flex>
      )}
    </Flex>
  );
}
