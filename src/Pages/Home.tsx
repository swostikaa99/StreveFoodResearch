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
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import OurTeams from "../Components/OurTeams";
import ProjectSection from "../Components/ProjectSection";

// FIX: Define consistent header and footer heights
const headerHeight = 80; // adjust if needed
const footerHeight = 200; // adjust if needed

const Hero = () => {
  return (
    <Box overflowX="hidden" w="100vw" position="relative">
      {/* HEADER */}
      <Header />

      {/* MAIN WRAPPER */}
      <Box
        bg="gray.50"
        minH={`calc(100vh - ${headerHeight + footerHeight}px)`}
        pt={`${headerHeight}px`}
        pb={`${footerHeight}px`}
        overflowX="hidden"
        w="100vw"
      >
        {/* HERO SECTION */}
        <Box
          as="section"
          position="relative"
          minH="100vh"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          overflow="hidden"
          maxW="100vw"
          px={{ base: 4, sm: 6, md: 12, lg: 20 }}
          py={{ base: 14, sm: 16, md: 20, lg: 24 }}
        >
          {/* Background Image */}
          <Image
            src={HeroBackground}
            alt="Food research laboratory"
            objectFit="cover"
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            w="100%"
            h="100%"
            zIndex="0"
          />

          {/* Overlay */}
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bgGradient="linear(to-r, rgba(0, 100, 80, 0.9), rgba(0, 120, 90, 0.8), transparent)"
            zIndex="1"
          />

          {/* HERO CONTENT */}
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
              textAlign="left"
            >
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

              <Text fontSize={{ base: "md", md: "xl" }} color="whiteAlpha.900">
                Empowering Nepal’s Food Industries through Research & Innovation
                Driving Quality, Safety & Sustainability in Every Product We
                Create
              </Text>

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
                  w={{ base: "100%", sm: "auto" }}
                >
                  Explore Our Services
                </Button>

                <Button
                  variant="outline"
                  borderColor="white"
                  color="white"
                  _hover={{ bg: "white", color: "teal.700" }}
                  size="lg"
                  w={{ base: "100%", sm: "auto" }}
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
              overflow="hidden"
            >
              {[
                { icon: FaFlask, number: "500+", label: "Research Projects" },
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
                    p={{ base: 4, md: 6 }}
                    _hover={{ bg: "whiteAlpha.300" }}
                    transition="0.3s"
                    textAlign="center"
                    overflow="hidden"
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

        <About />
        <ServicesSection showAll={false} showPagination={false} />
        <BlogsSection showAll={false} showPagination={false} />
        <ImagePage isHomePage />
        <ProjectSection limit={3} />
        <OurTeams showAll={false} />
        <Impacts />
        <Testimonial />
      </Box>

      <Footer />
    </Box>
  );
};

export default Hero;
