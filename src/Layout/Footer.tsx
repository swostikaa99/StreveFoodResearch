import React from "react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
  HStack,
  Link,
  Icon,
  Divider,
  Button,
  Image,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import {
  FaArrowUp,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import logo from "../assets/Strivelogo.jpg";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box bg="#063C35" color="white" pt={16} pb={6}>
      <Box mx="auto" px={{ base: 4, sm: 6, md: 12, lg: 16 }}>
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          }}
          gap={6}
          alignItems="start"
          justifyItems="start"
        >
          {/* Logo & About */}
          <GridItem>
            <VStack align="start" spacing={4}>
              <Image
                src={logo}
                alt="Strive Food Research Logo"
                height={{ base: "65px", md: "95px" }}
                objectFit="contain"
              />
              <Text fontSize="sm" color="gray.200">
                Nepal’s leading center for food & beverage consulting, research,
                and training advancing food safety and innovation since 2020.
              </Text>
            </VStack>
          </GridItem>

          {/* Company */}
          <GridItem>
            <Heading size="md" mb={4}>
              Company
            </Heading>
            <VStack align="flex-start" spacing={2} fontSize="md">
              <Link as={RouterLink} to="/about">
                About Us
              </Link>
              <Link as={RouterLink} to="/project">
                Reviews
              </Link>
              <Link as={RouterLink} to="/blogs">
                Latest News
              </Link>
              <Link as={RouterLink} to="/our-team-page">
                Team Member
              </Link>
            </VStack>
          </GridItem>

          {/* Support */}
          <GridItem>
            <Heading size="md" mb={4}>
              Support
            </Heading>
            <VStack align="flex-start" spacing={2} fontSize="md">
              <Link>FAQ</Link>
              <Link as={RouterLink} to="/services">
                Services
              </Link>
              <Link>Careers</Link>
              <Link as={RouterLink} to="/services">
                Training Programs
              </Link>
            </VStack>
          </GridItem>

          {/* Contact */}
          <GridItem>
            <Heading size="md" mb={4}>
              Contact
            </Heading>
            <VStack align="start" spacing={3} fontSize="md">
              <HStack align="start">
                <Icon as={FaMapMarkerAlt} color="orange.400" mt={1} />
                <Text>
                  55 Main Street, 2nd Block, <br /> Melbourne, Australia
                </Text>
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
          gap={6}
        >
          <Text
            fontSize={{ base: "xs", sm: "sm" }}
            color="gray.300"
            textAlign="center"
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

          <HStack spacing={6} fontSize="sm" color="gray.300">
            <Link>FAQs</Link>
            <Link>Privacy</Link>
            <Link>Settings</Link>
            <Link as={RouterLink} to="/contact">
              Contact
            </Link>
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
}
