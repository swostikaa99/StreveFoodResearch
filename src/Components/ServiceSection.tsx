import {
  Box,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
  useColorModeValue,
  VStack,
  Icon,
  Button,
  Link,
  Spinner,
} from "@chakra-ui/react";
import {
  FaGraduationCap,
  FaMicroscope,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

interface ChildItem {
  id: number;
  name: string;
  alias: string;
  details: string;
  thumb?: string | null;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    name: string;
    title: string;
    details: string;
    children: {
      ongoing: ChildItem[];
      upcoming: ChildItem[];
      past: ChildItem[];
      allevents: ChildItem[];
    };
  };
}

interface ServicesSectionProps {
  showAll?: boolean;
  showPagination?: boolean;
}

const MotionBox = motion(Box);

const ServicesSection = ({
  showAll = false,
  showPagination = false,
}: ServicesSectionProps) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const cardHover = useColorModeValue("gray.50", "gray.700");
  const textMuted = useColorModeValue("gray.600", "gray.300");
  const bgGradient = useColorModeValue(
    "linear(to-b, gray.50, teal.50)",
    "linear(to-b, gray.900, teal.900)"
  );

  const navigate = useNavigate();
  const [pageData, setPageData] = useState<ApiResponse["data"] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await axios.get<ApiResponse>(
          "http://127.0.0.1:8000/api/page/alias/classes"
        );
        setPageData(res.data.data);
      } catch (error) {
        console.error("Error fetching services data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
  }, []);

  const stripHtml = (html?: string) =>
    html
      ? new DOMParser()
          .parseFromString(html, "text/html")
          .body.textContent?.trim() || ""
      : "";

  const items =
    pageData?.children?.allevents?.map((item, i) => ({
      icon: [FaGraduationCap, FaMicroscope, FaUsers][i % 3],
      color: ["teal.500", "orange.400", "blue.500"][i % 3],
      title: item.name,
      description: stripHtml(item.details),
      image: item.thumb || undefined,
    })) || [];

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedServices = showAll
    ? showPagination
      ? items.slice(startIndex, startIndex + itemsPerPage)
      : items
    : items.slice(0, 3);

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="calc(100vh - 80px)">
        <Spinner size="xl" color="teal.500" />
      </Flex>
    );
  }

  return (
    <MotionBox
      as="section"
      bgGradient={bgGradient}
      minH="calc(100vh - 80px)"
      p={{ base: 10, md: 20 }}
      w="100%"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.8 }}
    >
      <Box maxW="7xl" mx="auto" w="full">
        {/* Section Header */}
        <VStack spacing={4} textAlign="center" mb={16}>
          <Text
            bg="teal.100"
            color="teal.700"
            px={4}
            py={2}
            rounded="full"
            fontWeight="semibold"
            fontSize="sm"
          >
            Our Services
          </Text>
          <Heading fontSize={{ base: "3xl", md: "5xl" }} color="teal.800">
            {pageData?.title || "Comprehensive Food Industry Solutions"}
          </Heading>
          <Box
            w="full"
            maxW={{ base: "full", md: "6xl", lg: "7xl" }}
            mx="auto"
            px={{ base: 4, md: 10 }}
          >
            <Text
              fontSize="md"
              color={textMuted}
              textAlign="justify"
              dangerouslySetInnerHTML={{ __html: pageData?.details || "" }}
            />
          </Box>
        </VStack>

        {/* Service Cards */}
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={10}
        >
          {displayedServices.map((service, i) => (
            <MotionBox
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.5, delay: i * 0.15 }}
            >
              <Flex
                direction="column"
                bg={cardBg}
                rounded="xl"
                shadow="md"
                borderWidth="1px"
                overflow="hidden"
                transition="all 0.3s"
                _hover={{
                  shadow: "xl",
                  borderColor: "teal.300",
                  transform: "translateY(-5px)",
                  bg: cardHover,
                }}
                h="100%"
              >
                {/* Image Section */}
                <Box position="relative" h="220px" overflow="hidden">
                  <Image
                    src={
                      service.image ||
                      "https://via.placeholder.com/400x220?text=No+Image"
                    }
                    alt={service.title}
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    transition="transform 0.5s"
                    _hover={{ transform: "scale(1.08)" }}
                  />
                  <Box
                    position="absolute"
                    inset="0"
                    bgGradient="linear(to-t, rgba(0,0,0,0.6), transparent)"
                  />
                  <Box position="absolute" bottom={4} left={4}>
                    <Icon
                      as={service.icon}
                      boxSize={10}
                      color={service.color}
                    />
                  </Box>
                </Box>

                {/* Content Section */}
                <Flex direction="column" p={{ base: 5, md: 6 }} flex="1">
                  <Text
                    fontSize={{ base: "xl", md: "2xl" }}
                    fontWeight="bold"
                    mb={2}
                    color={useColorModeValue("gray.800", "white")}
                  >
                    {service.title}
                  </Text>
                  <Text color={textMuted} fontSize="md" mb={4} noOfLines={3}>
                    {service.description}
                  </Text>

                  <Button
                    variant="outline"
                    w="full"
                    colorScheme="teal"
                    rightIcon={<FaArrowRight />}
                    onClick={() => navigate(`/ServiceId/${service.title}`)}
                    mt="auto"
                    _hover={{
                      bg: "teal.500",
                      color: "white",
                      transform: "translateY(-2px)",
                    }}
                  >
                    Learn More
                  </Button>
                </Flex>
              </Flex>
            </MotionBox>
          ))}
        </Grid>

        {/* Pagination */}
        {showPagination && totalPages > 1 && (
          <Flex justify="center" align="center" mt={10} gap={3}>
            <Button
              isDisabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Prev
            </Button>
            <Text fontWeight="semibold">
              Page {currentPage} of {totalPages}
            </Text>
            <Button
              isDisabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </Button>
          </Flex>
        )}

        {/* View More link only on Home Page */}
        {!showAll && (
          <Flex justify="right" mt={12}>
            <Link
              as={RouterLink}
              to="/services"
              color="teal.600"
              fontWeight="semibold"
              fontSize="lg"
              _hover={{ textDecoration: "underline", color: "teal.800" }}
            >
              View More →
            </Link>
          </Flex>
        )}
      </Box>
    </MotionBox>
  );
};

export default ServicesSection;
