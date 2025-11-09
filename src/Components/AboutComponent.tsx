import {
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  Stack,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaAward, FaBullseye, FaUsers, FaChartLine } from "react-icons/fa";

const About = () => {
  const values = [
    {
      icon: FaAward,
      title: "Excellence",
      description:
        "Committed to the highest standards in food safety and quality research.",
    },
    {
      icon: FaBullseye,
      title: "Innovation",
      description:
        "Pioneering new methodologies and solutions for the food industry.",
    },
    {
      icon: FaUsers,
      title: "Collaboration",
      description:
        "Building partnerships to strengthen Nepal's food sector capacity.",
    },
    {
      icon: FaChartLine,
      title: "Growth",
      description:
        "Empowering businesses through knowledge transfer and training.",
    },
  ];

  const textMuted = useColorModeValue("gray.600", "gray.300");
  const bgGradient = useColorModeValue(
    "linear(to-b, gray.50, teal.50)",
    "linear(to-b, gray.900, teal.900)"
  );

  return (
    <Box
      as="section"
      id="about"
      w="100%"
      overflow="hidden"
      bgGradient={bgGradient}
      py={{ base: 16, md: 24 }}
      px={{ base: 6, md: 10 }}
    >
      <Box maxW="7xl" mx="auto" w="full">
        <Grid
          templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
          gap={{ base: 10, lg: 16 }}
          alignItems="center"
        >
          {/* LEFT SIDE */}
          <Box>
            <Box
              display="inline-block"
              px={4}
              py={2}
              bg="teal.100"
              color="teal.800"
              rounded="full"
              fontSize="sm"
              fontWeight="semibold"
              mb={4}
            >
              About Us
            </Box>

            <Heading
              as="h2"
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="bold"
              mb={6}
              color={useColorModeValue("gray.800", "white")}
            >
              Leading Food Research & Training in Nepal
            </Heading>

            <Text fontSize="lg" color={textMuted} mb={4} lineHeight="tall">
              Established in 2020 and based in Bhaktapur/Suryabinayak, Strive
              Food Research & Training (Pvt. Ltd.) has emerged as Nepal's
              premier organization for food & beverage consulting and training
              services.
            </Text>
            <Text fontSize="lg" color={textMuted} mb={6} lineHeight="tall">
              Our mission is to elevate food safety standards, enhance industry
              competence, and drive innovation through evidence-based research
              and comprehensive capacity building programs.
            </Text>

            {/* FEATURE HIGHLIGHTS */}
            <Stack spacing={5}>
              <Flex align="start" gap={4}>
                <Box
                  w={12}
                  h={12}
                  bg="teal.100"
                  rounded="lg"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                >
                  <Icon as={FaAward} w={6} h={6} color="teal.600" />
                </Box>
                <Box>
                  <Heading as="h3" size="md" mb={1}>
                    Expert Team
                  </Heading>
                  <Text color={textMuted}>
                    Highly qualified food scientists and industry professionals.
                  </Text>
                </Box>
              </Flex>

              <Flex align="start" gap={4}>
                <Box
                  w={12}
                  h={12}
                  bg="orange.100"
                  rounded="lg"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                >
                  <Icon as={FaBullseye} w={6} h={6} color="orange.600" />
                </Box>
                <Box>
                  <Heading as="h3" size="md" mb={1}>
                    Modern Facilities
                  </Heading>
                  <Text color={textMuted}>
                    State-of-the-art research and training infrastructure.
                  </Text>
                </Box>
              </Flex>
            </Stack>
          </Box>

          {/* RIGHT SIDE: VALUE CARDS */}
          <Grid
            templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }}
            gap={{ base: 6, md: 8 }}
          >
            {values.map((value, index) => (
              <Box
                key={index}
                p={{ base: 5, md: 6 }}
                rounded="lg"
                borderWidth={2}
                borderColor="gray.200"
                bg="white"
                boxShadow="sm"
                _hover={{
                  boxShadow: "lg",
                  transform: "translateY(-5px)",
                  borderColor: "teal.300",
                }}
                transition="all 0.3s"
              >
                <Box
                  w={14}
                  h={14}
                  rounded="full"
                  bg="teal.100"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mb={4}
                  color="teal.600"
                >
                  <Icon as={value.icon} w={8} h={8} />
                </Box>
                <Heading as="h3" fontSize="xl" fontWeight="bold" mb={2}>
                  {value.title}
                </Heading>
                <Text fontSize="sm" color={textMuted} lineHeight="tall">
                  {value.description}
                </Text>
              </Box>
            ))}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default About;
