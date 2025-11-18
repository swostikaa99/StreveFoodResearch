import React from "react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  HStack,
  Link,
  Icon,
  Divider,
  Button,
  Image,
  Center,
} from "@chakra-ui/react";
import {
  FaArrowRight,
  FaArrowUp,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

import logo from "../assets/Strivelogo.jpg";

export default function Footer() {
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box bg="#063C35" color="white" pt={16} pb={6} px={{ base: 6, md: 16 }}>
      <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={10}>
        {/* Logo & About */}
        <GridItem colSpan={{ base: 1, md: 1 }}>
          <VStack align="start" spacing={4}>
            <Image
              src={logo}
              alt="Strive Food Research Logo"
              height="95px"
              // width={"250px"}
              objectFit="contain"
            />
            <Text fontSize="sm" color="gray.200">
              Nepal’s leading center for food & beverage consulting, research,
              and training advancing food safety and innovation since 2020.
            </Text>
            {/* <InputGroup size="md" bg="white" rounded="md" overflow="hidden">
              <Input placeholder="Email Address" color="black" border="none" />
              <InputRightElement>
                <Button
                  size="sm"
                  bg="orange.500"
                  color="white"
                  rounded="md"
                  _hover={{ bg: "orange.600" }}
                >
                  <FaArrowRight />
                </Button>
              </InputRightElement>
            </InputGroup> */}
          </VStack>
        </GridItem>

        {/* Company */}
        <GridItem justifyItems="left">
          <Heading size="md" mb={4}>
            Company
          </Heading>
          <VStack align="left" spacing={2} fontSize="md">
            <Link>About</Link>

            <Link>Reviews</Link>

            <Link>Latest News</Link>
            <Link>Team Member</Link>
          </VStack>
        </GridItem>
        <GridItem justifyItems="left">
          <Heading size="md" mb={4}>
            Company
          </Heading>
          <VStack align="left" spacing={2} fontSize="md">
            <Link>About</Link>

            <Link>Reviews</Link>

            <Link>Latest News</Link>
            <Link>Team Member</Link>
          </VStack>
        </GridItem>

        {/* Contact */}
        <GridItem>
          <Heading size="md" mb={4}>
            Contact
          </Heading>
          <VStack align="start" spacing={3} fontSize="md">
            <HStack>
              <Icon as={FaMapMarkerAlt} color="orange.400" />
              <Text>55 Main Street, 2nd block Melbourne, Australia</Text>
            </HStack>
            <HStack>
              <Icon as={FaEnvelope} color="orange.400" />
              <Text>strivefoodresearch@gmail.com</Text>
            </HStack>
            <HStack>
              <Icon as={FaPhoneAlt} color="orange.400" />
              <Text>+000 (123) 44 55</Text>
            </HStack>
          </VStack>
        </GridItem>
      </Grid>

      {/* Divider */}
      <Divider borderColor="gray.600" my={10} />

      {/* Bottom Section */}
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        gap={4}
      >
        <Text
          fontSize={{ base: "xs", sm: "sm" }}
          color="gray.300"
          textAlign={{ base: "center", md: "left" }}
        >
          © {new Date().getFullYear()} Strive Food Research & Training. All
          rights reserved.
        </Text>

        <Button
          onClick={scrollToTop}
          bg="orange.500"
          color="white"
          rounded="md"
          _hover={{ bg: "orange.600" }}
          p={3}
        >
          <FaArrowUp />
        </Button>

        <HStack
          spacing={6}
          fontSize="sm"
          color="gray.300"
          mt={{ base: 2, md: 0 }}
        >
          <Link>Faqs</Link>
          <Link>Setting</Link>
          <Link>Privacy</Link>
          <Link>Contact</Link>
        </HStack>
      </Flex>
    </Box>
  );
}
