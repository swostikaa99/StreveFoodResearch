import {
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  Stack,
  Icon,
  useColorModeValue,
  Link,
  Spinner,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaAward, FaBullseye, FaUsers, FaChartLine } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

interface AboutProps {
  showAll?: boolean; // true = full About page
}

const iconMap: any = {
  Integrity: FaAward,
  Innovation: FaBullseye,
  Quality: FaUsers,
  Collaboration: FaChartLine,
  Sustainability: FaChartLine,
  Intigrity: FaAward,
};

const About = ({ showAll = false }: AboutProps) => {
  const [page, setPage] = useState<any>(null);
  const [whoWeAre, setWhoWeAre] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [loadingWho, setLoadingWho] = useState(true);

  const textMuted = useColorModeValue("gray.600", "gray.300");
  const bgGradient = useColorModeValue(
    "linear(to-b, gray.50, teal.50)",
    "linear(to-b, gray.900, teal.900)"
  );

  // ===========================
  //      FETCH ABOUT DATA
  // ===========================
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/page/alias/about-us")
      .then((res) => {
        setPage(res.data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Fetch Who We Are data
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/page/alias/who-we-are")
      .then((res) => {
        setWhoWeAre(res.data.data);
        setLoadingWho(false);
      })
      .catch(() => setLoadingWho(false));
  }, []);

  if (loading || loadingWho)
    return (
      <Flex w="100%" justify="center" py={20}>
        <Spinner size="xl" color="teal.500" />
      </Flex>
    );

  if (!page || !whoWeAre) return null;

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
        {/* GRID LAYOUT */}
        <Grid
          templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
          gap={{ base: 10, lg: 16 }}
          alignItems="center"
          position="relative"
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

            {/* API Title */}
            <Heading
              as="h2"
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="bold"
              mb={6}
              color={useColorModeValue("gray.800", "white")}
            >
              {page.title}
            </Heading>

            {/* API HTML details */}
            <Box
              fontSize="lg"
              color={textMuted}
              mb={6}
              lineHeight="tall"
              dangerouslySetInnerHTML={{ __html: page.details }}
            />

            {/* ONLY FIRST PARAGRAPH OF "WHO WE ARE" */}
            <Box>
              <Heading
                as="h3"
                fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                fontWeight="semi-bold"
                mb={6}
                color={useColorModeValue("gray.800", "white")}
              >
                {whoWeAre.title}
              </Heading>

              {/* Render all paragraphs from API */}
              <Box
                fontSize="lg"
                color={textMuted}
                mb={2}
                lineHeight="tall"
                dangerouslySetInnerHTML={{ __html: whoWeAre.details }}
              />
            </Box>
          </Box>

          {/* RIGHT SIDE ICON GRID */}
          <Grid
            templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }}
            gap={{ base: 6, md: 8 }}
          >
            {page.children?.map((value: any, index: number) => {
              const IconComponent = iconMap[value.name] || FaAward;

              return (
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
                    <Icon as={IconComponent} w={8} h={8} />
                  </Box>

                  <Heading as="h3" fontSize="xl" fontWeight="bold" mb={2}>
                    {value.name}
                  </Heading>

                  <Text
                    fontSize="sm"
                    color={textMuted}
                    lineHeight="tall"
                    dangerouslySetInnerHTML={{ __html: value.details }}
                  />
                </Box>
              );
            })}
          </Grid>

          {/* View More link at the right of the whole section */}
          {!showAll && (
            <Flex
              w="100%"
              justify="flex-end"
              align="center"
              mt={4}
              gridColumn={{ base: "1 / -1", lg: "1 / -1" }}
            >
              <Link
                as={RouterLink}
                to="/about"
                color="teal.600"
                fontWeight="semibold"
                fontSize="lg"
                _hover={{ textDecoration: "underline", color: "teal.800" }}
              >
                View More →
              </Link>
            </Flex>
          )}
        </Grid>

        {/* FULL WIDTH SECTION — Mission + Vision */}
        {showAll && (
          <Box maxW="7xl" mx="auto" mt={5}>
            {/* Mission */}
            <Heading
              as="h3"
              fontSize={{ base: "2xl", md: "3xl" }}
              mb={4}
              mt={10}
              fontWeight="semi-bold"
              color={useColorModeValue("gray.800", "white")}
            >
              Our Mission
            </Heading>
            <Text fontSize="lg" color={textMuted} lineHeight="tall" mb={4}>
              To empower Nepal’s food and agribusiness enterprises with
              innovative, research-based, and market-oriented solutions that
              enhance quality, ensure food safety, and promote sustainable
              business growth.
            </Text>
            {/* Vision */}
            <Heading
              as="h3"
              fontSize={{ base: "2xl", md: "3xl" }}
              mb={4}
              mt={10}
              fontWeight="semi-bold"
              color={useColorModeValue("gray.800", "white")}
            >
              Our Vision
            </Heading>
            <Text fontSize="lg" color={textMuted} lineHeight="tall">
              To be Nepal’s most trusted and result-driven partner in food
              research, training, and consultancy — advancing innovation,
              compliance, and competitiveness across the food value chain.
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default About;
