import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  FormControl,
  Input,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Flex,
  Heading,
  Button,
  Center,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("from submitted: ");
    console.log(formData);
  };
  return (
    <>
      <Flex
        h="100vh"
        justify="center"
        align="center"
        bgGradient="linear(to-br, blue.200, green.300)"
      >
        <Box
          p={8}
          border="1px"
          borderColor="gray.300"
          borderRadius="xl"
          boxShadow="lg"
          bgGradient="linear(to-br, yellow.100, teal.100)"
          w="30em"
        >
          <Heading textAlign="center">Log In</Heading>
          <form onSubmit={submitHandler}>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                borderColor="gray.500"
                _hover={{ borderColor: "gray.700" }}
                _focus={{ border: "none" }}
                size="sm"
              />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
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
            </FormControl>

            <Center>
              <Button type="submit" colorScheme="blue" mt="0.75em">
                Log in
              </Button>
            </Center>
          </form>
        </Box>
      </Flex>
    </>
  );
};

export default Signup;
