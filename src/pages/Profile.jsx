import {
  Avatar,
  Box,
  Flex,
  Text,
  IconButton,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constant";
import useIndexStore from "../store";

const Profile = () => {
  const navigate = useNavigate();
  const setProfile = useIndexStore((state) => state.setProfile);
  const profile = useIndexStore((state) => state.profile);
  const authToken = sessionStorage.getItem("authToken");

  const fetchProfile = async () => {
    try {
      const resp = await axios.get(`${BASE_URL}/auth/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      // console.log(resp.data.data);
      setProfile(resp.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // console.log(profile, "<<<< profile");
  // console.log(profile?.profile?.following.length, "<<<< following");
  // console.log(profile?.profile?.followers, "<<<< followers");

  return (
    <Box bg="white" minH="100vh" position="relative">
      {/* Header */}
      <Box bg="black" h="120px" position="relative">
        <IconButton
          icon={<FaArrowLeft />}
          onClick={() => navigate("/")}
          aria-label="Back"
          position="absolute"
          top="4"
          left="4"
          color="white"
          bg="transparent"
          _hover={{ bg: "rgba(255,255,255,0.1)" }}
        />
        <Avatar
          size="xl"
          src={
            profile?.profile?.photo ||
            "https://api.dicebear.com/6.x/adventurer/svg?seed=Anjas"
          }
          position="absolute"
          bottom="-40px"
          left="20px"
          border="4px solid white"
          alt={profile?.profile?.fullname || "User Avatar"}
        />
      </Box>

      {/* User Info */}
      <Box mt="60px" px={4}>
        <Text fontWeight="bold" fontSize="lg">
          {profile?.profile?.fullname || "Name"}
        </Text>
        <Text color="gray.500" fontSize="sm">
          {`@${profile?.profile?.username || "Username"}`}
        </Text>
        <Text mt={2} color="gray.600" fontSize="sm">
          {profile?.profile?.bio || "No bio yet."}
        </Text>

        <Flex gap={6} mt={3} fontSize="sm">
          <Text>
            <b>{profile?.profile?.following?.length || 0}</b> Following
          </Text>
          <Text>
            <b>{profile?.profile?.followers?.length || 0}</b> Followers
          </Text>
        </Flex>
      </Box>

      {/* Tabs */}
      <Tabs mt={4} isFitted variant="unstyled">
        <TabList borderBottom="1px solid #e2e8f0">
          <Tab
            _selected={{ color: "black", borderBottom: "2px solid black" }}
            fontWeight="bold"
          >
            Posts
          </Tab>
          <Tab
            _selected={{ color: "black", borderBottom: "2px solid black" }}
            fontWeight="bold"
          >
            Bookmarks
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Flex
              justify="center"
              align="center"
              minH="200px"
              direction="column"
            >
              <Text color="gray.500" fontWeight="bold">
                No posts yet
              </Text>
              <Text color="gray.400" fontSize="sm">
                Be the first to start the conversation!
              </Text>
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex
              justify="center"
              align="center"
              minH="200px"
              direction="column"
            >
              <Text color="gray.500" fontWeight="bold">
                No bookmarks yet
              </Text>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Floating Action Button */}
      <IconButton
        icon={<FaPlus />}
        color="white"
        bg="blue.600"
        rounded="full"
        aria-label="Add Post"
        position="fixed"
        bottom="20px"
        right="20px"
        boxSize="50px"
        _hover={{ bg: "blue.700" }}
      />
    </Box>
  );
};

export default Profile;
