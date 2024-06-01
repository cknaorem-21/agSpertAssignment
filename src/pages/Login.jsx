import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  Flex,
  Heading,
  Button,
  Center,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import getSingleAdminUser from "../utils/api/getSingleAdmin";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Signup = () => {
  const {setAuth} = useContext(AuthContext)
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const mutation = useMutation({
    mutationFn: async (data) => {
      return getSingleAdminUser(data)
      
    },
    onSuccess: (user) => {
      if (user) {
        setAuth(true)
        localStorage.setItem("auth", "true")
        navigate("/saleorders")
      } else {
        alert("Invalid username or password");
      }
    },
    onError: (error) => {
      console.error("Error logging in user", error);
    }
  });

  const onSubmit = async (data) => {
    mutation.mutate(data);
  };

  return (
    <Flex minH="70vh" justify="center" align="center">
      <Box
        p={8}
        border="1px"
        borderColor="gray.300"
        borderRadius="xl"
        boxShadow="lg"
        w="30em"
      >
        <Heading textAlign="center">Log in</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl id="email" isInvalid={errors.email} isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              borderColor="gray.500"
              _hover={{ borderColor: "gray.700" }}
              _focus={{ border: "none" }}
              size="sm"
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl id="password" isInvalid={errors.password} isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                borderColor="gray.500"
                _hover={{ borderColor: "gray.700" }}
                _focus={{ border: "none" }}
                size="sm"
                type={showPassword ? "text" : "password"}
              />
              <InputRightElement h="100%">
                {showPassword ? (
                  <ViewIcon onClick={() => setShowPassword(false)} />
                ) : (
                  <ViewOffIcon onClick={() => setShowPassword(true)} />
                )}
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          <Center>
            <Button type="submit" colorScheme="blue" mt="0.75em" isLoading={mutation.isPending}>
              Log in
            </Button>
          </Center>
        </form>
      </Box>
    </Flex>
  );
};

export default Signup;
