import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Heading,
  IconButton,
  Spacer,
  useColorMode,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { auth, setAuth } = useContext(AuthContext);
  return (
    <>
      <Flex p="1em" alignItems={"center"} shadow="md">
        <Heading>Sale-Records</Heading>
        <Spacer />
        <Flex gap="1em">
          {auth ? (
          <NavLink to="/login">
            <Button onClick={()=> {setAuth(false); localStorage.removeItem("auth")}}>Log out</Button>
          </NavLink>
          ) : (
            <>
              <NavLink to="/login">
                <Button>Login</Button>
              </NavLink>
              <NavLink to="/signup">
                <Button>Signup</Button>
              </NavLink>
            </>
          )}
          {colorMode === "light" ? (
            <IconButton
              isRound
              onClick={toggleColorMode}
              aria-label="dark-light-toggle"
              icon={<MoonIcon />}
            />
          ) : (
            <IconButton
              isRound
              onClick={toggleColorMode}
              aria-label="dark-light-toggle"
              icon={<SunIcon />}
            />
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default Navbar;
