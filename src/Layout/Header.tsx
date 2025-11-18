import React from "react";
import {
  Box,
  Flex,
  Image,
  Link,
  Button,
  IconButton,
  VStack,
  HStack,
  Collapse,
  useDisclosure,
} from "@chakra-ui/react";
import logo from "../assets/Strivelogo.jpg";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { isOpen, onToggle } = useDisclosure();
  const navigate = useNavigate();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Blogs", href: "/blogs" },
    { name: "Projects", href: "/project" },
    { name: "Images", href: "/images" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <Box
      as="header"
      position="fixed"
      top="0"
      w="100%"
      bg="whiteAlpha.900"
      backdropFilter="blur(10px)"
      borderBottom="1px solid"
      borderColor="gray.200"
      zIndex="999"
      boxShadow="sm"
    >
      {/* === TOP BAR === */}
      <Box maxW="1200px" mx="auto" px={4}>
        <Flex align="center" justify="space-between" h="20">
          <Image
            src={logo}
            alt="Strive Food Research Logo"
            height="65px"
            objectFit="contain"
            style={{ mixBlendMode: "multiply" }}
          />

          {/* Desktop Nav */}
          <HStack
            spacing={10}
            display={{ base: "none", md: "flex" }}
            align="center"
          >
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                fontWeight="500"
                color="gray.700"
                _hover={{ color: "teal.500" }}
              >
                {item.name}
              </Link>
            ))}
            <Button colorScheme="teal">Get Started</Button>
          </HStack>

          {/* Mobile Menu Button */}
          <IconButton
            aria-label="Toggle Menu"
            icon={isOpen ? <FaTimes /> : <FaBars />}
            variant="ghost"
            display={{ base: "flex", md: "none" }}
            onClick={onToggle}
            fontSize="2xl"
          />
        </Flex>
      </Box>

      <Collapse in={isOpen} animateOpacity>
        <VStack
          spacing={5}
          py={6}
          bg="white"
          w="100%"
          align="center"
          display={{ base: "flex", md: "none" }}
          borderTop="1px solid"
          borderColor="gray.200"
        >
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              fontWeight="500"
              color="gray.700"
              _hover={{ color: "teal.500" }}
              onClick={onToggle}
            >
              {item.name}
            </Link>
          ))}

          <Button
            colorScheme="teal"
            w="80%"
            onClick={() => {
              onToggle();
              navigate("/contact");
            }}
          >
            Get Started
          </Button>
        </VStack>
      </Collapse>
    </Box>
  );
};

export default Header;
