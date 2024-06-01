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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [confirmPassword, setConfirmPassword] = useState("")

  const submitHandler = (e) => {
    e.preventDefault()
    console.log("from submitted: ")
    console.log(formData)
  }
  return (
    <>
      <Flex
        minH="70vh"
        justify="center"
        align="center"
        mt="2em"
      >
        <Box
          p={8}
          border="1px"
          borderColor="gray.300"
          borderRadius="xl"
          boxShadow="lg"
          w="30em"
        >
          <Heading textAlign="center">Sign Up</Heading>
          <form onSubmit={submitHandler}>
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                value={formData.name}
                onChange={(e)=>setFormData({...formData, name: e.target.value})}
                borderColor="gray.500"
                _hover={{ borderColor: "gray.700" }}
                _focus={{ border: "none" }}
                size="sm"
              />
            </FormControl>

            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                value={formData.email}
                onChange={(e)=>setFormData({...formData, email: e.target.value})}
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
                  onChange={(e)=>setFormData({...formData, password: e.target.value})}
                  borderColor="gray.500"
                  _hover={{ borderColor: "gray.700" }}
                  _focus={{ border: "none" }}
                  size="sm"
                  type={showPassword ? "text" : "password"}
                />
                <InputRightElement h="100%">
                  {showPassword ? (
                    <ViewOffIcon onClick={() => setShowPassword(false)} />
                  ) : (
                    <ViewIcon onClick={() => setShowPassword(true)} />
                  )}
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl id="confirmpassword" isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  value={confirmPassword}
                  onChange={(e)=>setConfirmPassword(e.target.value)}
                  borderColor="gray.500"
                  _hover={{ borderColor: "gray.700" }}
                  _focus={{ border: "none" }}
                  size="sm"
                  type={showConfirmPassword ? "text" : "password"}
                />
                <InputRightElement h="100%">
                  {showConfirmPassword ? (
                    <ViewOffIcon
                      onClick={() => setShowConfirmPassword(false)}
                    />
                  ) : (
                    <ViewIcon onClick={() => setShowConfirmPassword(true)} />
                  )}
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Center>
              <Button type="submit" colorScheme="blue" mt="0.75em">
                Sign Up
              </Button>
            </Center>
          </form>
        </Box>
      </Flex>
    </>
  );
};

export default Signup;
