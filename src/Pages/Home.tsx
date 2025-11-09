import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  Icon,
} from "@chakra-ui/react";
import {
  FaArrowRight,
  FaFlask,
  FaGraduationCap,
  FaBuilding,
} from "react-icons/fa";
import HeroBackground from "../assets/hero-background.jpg";
import About from "../Components/AboutComponent";
import ServicesSection from "../Components/ServiceSection";
import Testimonial from "./Testimonial";
import Impacts from "./Impacts";
import BlogsSection from "../Components/BlogSection";
import ImagePage from "./Image";
import PageWrapper from "../Layout/Pagewrapper";

const Hero = () => {
  return (
    <PageWrapper>
      <Box bg="gray.50">
        {/* HERO SECTION */}
        <Box
          as="section"
          position="relative"
          minH="100vh"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          overflow="hidden"
          px={{ base: 6, md: 12, lg: 20 }}
          py={{ base: 10, md: 16, lg: 24 }}
        >
          <Image
            src={HeroBackground}
            alt="Food research laboratory"
            objectFit="cover"
            w="100%"
            h="100%"
            position="absolute"
            top="0"
            left="0"
            zIndex="0"
          />

          {/* Overlay */}
          <Box
            position="absolute"
            inset="0"
            bgGradient="linear(to-r, rgba(0, 100, 80, 0.9), rgba(0, 120, 90, 0.8), transparent)"
            zIndex="1"
          />

          {/* MAIN CONTENT */}
          <Box
            position="relative"
            zIndex="2"
            color="white"
            maxW="7xl"
            mx="auto"
            w="full"
          >
            <Stack
              spacing={8}
              maxW={{ base: "full", md: "3xl" }}
              textAlign={{ base: "left", md: "left" }}
            >
              {/* Badge */}
              {/* <Flex
              align="center"
              bg="whiteAlpha.300"
              border="1px solid"
              borderColor="whiteAlpha.400"
              px={4}
              py={2}
              w="fit-content"
              rounded="full"
              backdropFilter="blur(6px)"
            >
              <Box w={4} h={4} bg="orange.400" borderRadius="full" mr={3} />
              <Text fontSize="sm" fontWeight="medium" color="whiteAlpha.900">
                Established 2020 | Bhaktapur, Nepal
              </Text>
            </Flex> */}

              {/* Heading */}
              <Heading
                fontSize={useBreakpointValue({
                  base: "3xl",
                  sm: "4xl",
                  md: "5xl",
                  lg: "6xl",
                })}
                lineHeight="1.2"
                fontWeight="bold"
              >
                Elevating Food Safety Through Science & Training
              </Heading>

              {/* Description */}
              <Text fontSize={{ base: "md", md: "xl" }} color="whiteAlpha.900">
                Expert food & beverage consulting, research, and capacity
                building services for Nepal's growing food industry.
              </Text>

              {/* Buttons */}
              <Flex gap={4} flexWrap="wrap">
                <Button
                  rightIcon={<FaArrowRight />}
                  bgGradient="linear(to-r, #0A7263, #F08B2C)"
                  color="white"
                  _hover={{
                    bgGradient: "linear(to-r, #0B8571, #FFA54A)",
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                  }}
                  size="lg"
                >
                  Explore Our Services
                </Button>
                <Button
                  variant="outline"
                  borderColor="white"
                  color="white"
                  _hover={{ bg: "white", color: "teal.700" }}
                  size="lg"
                >
                  Contact Us
                </Button>
              </Flex>
            </Stack>

            {/* STATS GRID */}
            <Grid
              templateColumns={{
                base: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              }}
              gap={6}
              mt={16}
            >
              {[
                {
                  icon: FaFlask,
                  number: "500+",
                  label: "Research Projects",
                },
                {
                  icon: FaGraduationCap,
                  number: "1000+",
                  label: "Professionals Trained",
                },
                {
                  icon: FaBuilding,
                  number: "50+",
                  label: "Partner Organizations",
                },
              ].map((stat, i) => (
                <GridItem key={i}>
                  <Box
                    bg="whiteAlpha.200"
                    backdropFilter="blur(6px)"
                    border="1px solid"
                    borderColor="whiteAlpha.300"
                    rounded="lg"
                    p={6}
                    _hover={{ bg: "whiteAlpha.300" }}
                    transition="0.3s"
                    textAlign="center"
                  >
                    <Icon
                      as={stat.icon}
                      boxSize={8}
                      color="orange.300"
                      mb={3}
                    />
                    <Text fontSize="3xl" fontWeight="bold">
                      {stat.number}
                    </Text>
                    <Text color="whiteAlpha.800">{stat.label}</Text>
                  </Box>
                </GridItem>
              ))}
            </Grid>
          </Box>
        </Box>
        <Box>
          <About />
        </Box>
        <Box>
          <ServicesSection showAll={false} showPagination={false} />
        </Box>
        <Box>
          <BlogsSection showAll={false} showPagination={false} />
        </Box>
        <Box>
          <ImagePage isHomePage />
        </Box>
        <Box>
          <Impacts />
        </Box>
        <Box>
          <Testimonial />
        </Box>
      </Box>
    </PageWrapper>
  );
};

export default Hero;
