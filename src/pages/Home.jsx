import { use, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Flex,
  Text,
  IconButton,
  VStack,
  HStack,
  Divider,
} from "@chakra-ui/react";
import {
  FaRegThumbsUp,
  FaRegThumbsDown,
  FaRegComment,
  FaBookmark,
} from "react-icons/fa";
import { DUMMY } from "../constant";
import useIndexStore from "../store";
import TopBar from "../components/TopBar";

const Home = () => {
  // const [posts, setPosts] = useState(DUMMY.data);
  const posts = useIndexStore((state) => state.posts);
  const setPosts = useIndexStore((state) => state.setPosts);
  const setIsLogin = useIndexStore((state) => state.setIsLogin);

  useEffect(() => {
    // Using json example
    setPosts(DUMMY.data);
    if (sessionStorage.getItem("authToken")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  return (
    <>
      <TopBar />
      <Box maxW="600px" mx="auto" pb="80px">
        <VStack spacing={6} align="stretch">
          {posts.map((post) => (
            <Box
              key={post.id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              bg="white"
            >
              {/* Header */}
              <Flex align="center" p={3} gap={3}>
                <Avatar size="sm" src={post.profile.photo} />
                <Box>
                  <Text fontWeight="bold">{post.profile.username}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {new Date(post.createdAt).toLocaleDateString("id-ID")}
                  </Text>
                </Box>
              </Flex>

              <Divider />

              {/* Body */}
              <Box>
                {post.videos.length > 0 ? (
                  <video
                    controls
                    style={{ width: "100%", maxHeight: "400px" }}
                    src={post.videos[0]}
                  />
                ) : (
                  <Box
                    h="200px"
                    bg="gray.100"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="gray.500"
                    fontSize="sm"
                  >
                    Tidak ada video
                  </Box>
                )}
              </Box>

              {/* Footer */}
              <Box p={3}>
                <Text mb={2}>{post.description}</Text>
                <HStack spacing={4}>
                  <IconButton
                    aria-label="upvote"
                    size="sm"
                    icon={<FaRegThumbsUp />}
                    variant="ghost"
                  />
                  <Text fontSize="sm">{post.upvote.length}</Text>

                  <IconButton
                    aria-label="downvote"
                    size="sm"
                    icon={<FaRegThumbsDown />}
                    variant="ghost"
                  />
                  <Text fontSize="sm">{post.downvote.length}</Text>

                  <IconButton
                    aria-label="comment"
                    size="sm"
                    icon={<FaRegComment />}
                    variant="ghost"
                  />
                  <Text fontSize="sm">{post.total_comments}</Text>

                  <IconButton
                    aria-label="bookmark"
                    size="sm"
                    icon={<FaBookmark />}
                    variant={post.has_bookmark ? "solid" : "ghost"}
                  />
                </HStack>
              </Box>
            </Box>
          ))}
        </VStack>
      </Box>
    </>
  );
};

export default Home;
