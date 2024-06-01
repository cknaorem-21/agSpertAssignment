import { Box, Flex, Heading } from "@chakra-ui/react"

const Home = () => {
  return (
    <Flex h="70vh" justify="center" alignItems="center" direction={"column"}>
        <Heading>WELCOME!</Heading>
        <Box>Login to Continue</Box>
        
    </Flex>
  )
}

export default Home