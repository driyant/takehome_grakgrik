import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Stack,
  Text,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constant";
import useToast from "../hooks/useToast";
import { useFormik } from "formik";
import { validate } from "../utils/validate";
import useIndexStore from "../store";

const Login = () => {
  const [spinnerShouldShow, setSpinnerShouldShow] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const setProfile = useIndexStore((state) => state.setProfile);

  const fetchProfile = async (authToken) => {
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

  const handleSubmit = async (values, { setFieldError }) => {
    setSpinnerShouldShow(true);
    try {
      const resp = await axios(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(values),
      });
      const { token } = resp.data.data;
      sessionStorage.setItem("authToken", token);
      fetchProfile(token).then(() => {
        navigate("/");
      });
    } catch (error) {
      const apiMessage = error?.response?.data?.messages;
      if (apiMessage === "Wrong password") {
        setFieldError("email", "Something wrong with your email or password.");
      } else if (apiMessage === "User not exist") {
        setFieldError("email", "We couldn’t find an account with that email.");
      } else {
        toast({
          title: "Login failed",
          status: "error",
          description: apiMessage || "Invalid email or password",
        });
      }
    } finally {
      setSpinnerShouldShow(false);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("authToken")) {
      navigate("/");
    }
  }, []);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validate,
    onSubmit: (values, helpers) => handleSubmit(values, helpers),
  });

  return (
    <Flex minH="100vh" align="center" justify="center" bg="white">
      <Box w="100%" maxW="390px" p={6} bg="white">
        <Stack spacing={6}>
          {/* Header */}
          <Box>
            <Heading size="lg" mb={1}>
              Login
            </Heading>
            <Text color="gray.600">Welcome back to the app</Text>
          </Box>

          {/* Form */}
          <Stack as="form" spacing={4} onSubmit={formik.handleSubmit}>
            {/* Email */}
            <FormControl isInvalid={!!formik.errors.email}>
              <FormLabel fontSize="sm">Email Address</FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {formik.errors.email}
                </Text>
              )}
            </FormControl>

            {/* Password */}
            <FormControl isInvalid={!!formik.errors.password}>
              <FormLabel fontSize="sm">Password</FormLabel>
              <Input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.password && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {formik.errors.password}
                </Text>
              )}
            </FormControl>

            {/* Keep signed in */}
            <Checkbox defaultChecked colorScheme="blue">
              Keep me signed in
            </Checkbox>

            {/* Submit Button */}
            <Button
              color="white"
              bg="black"
              _hover={{ bg: "gray.800" }}
              rounded="md"
              size="lg"
              type="submit"
              disabled={spinnerShouldShow}
            >
              {spinnerShouldShow ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Login"
              )}
            </Button>
          </Stack>

          {/* Footer */}
          <Text textAlign="center" fontSize="sm">
            Don&apos;t have an account?{" "}
            <Link
              as={RouterLink}
              to="/register"
              color="blue.600"
              fontWeight="bold"
            >
              Create an account
            </Link>
          </Text>
        </Stack>
      </Box>
    </Flex>
  );
};

export default Login;
