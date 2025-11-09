import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Badge,
  VStack,
  HStack,
  Icon,
  Image,
  Flex,
  Button,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { FaClock, FaUser, FaCalendarAlt } from "react-icons/fa";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import img1 from "../assets/research-1.jpg";
import img2 from "../assets/research-2.jpg";
import img3 from "../assets/research-3.jpg";
import img4 from "../assets/research-4.jpg";
import img5 from "../assets/research-5.jpg";
import img6 from "../assets/research-6.jpg";

interface BlogsSectionProps {
  showAll?: boolean; // true = blogs page
  showPagination?: boolean; // true = enable pagination
}

const BlogsSection = ({
  showAll = false,
  showPagination = false,
}: BlogsSectionProps) => {
  const bgGradient = useColorModeValue(
    "linear(to-b, gray.50, teal.50)",
    "linear(to-b, gray.900, teal.900)"
  );
  const cardBg = useColorModeValue("white", "gray.800");
  const borderCol = useColorModeValue("gray.200", "gray.700");
  const titleCol = useColorModeValue("gray.800", "white");
  const textCol = useColorModeValue("gray.600", "gray.300");

  const blogPosts = [
    {
      id: 1,
      title: "Sustainable Agriculture: The Future of Food Production",
      description:
        "Exploring innovative techniques in sustainable farming and their impact on food security and environmental conservation.",
      author: "Dr. Sarah Chen",
      date: "March 15, 2024",
      readTime: "8 min read",
      category: "Sustainability",
      image: img1,
    },
    {
      id: 2,
      title: "Nutritional Analysis of Ancient Grains",
      description:
        "A comprehensive study on the nutritional benefits of ancient grains and their potential role in modern diets.",
      author: "Dr. Michael Rodriguez",
      date: "March 10, 2024",
      readTime: "6 min read",
      category: "Nutrition",
      image: img2,
    },
    {
      id: 3,
      title: "Food Safety in the Supply Chain",
      description:
        "Research findings on improving food safety protocols from farm to table in modern supply chains.",
      author: "Dr. Emily Watson",
      date: "March 5, 2024",
      readTime: "10 min read",
      category: "Safety",
      image: img3,
    },
    {
      id: 4,
      title: "Climate Change Impact on Crop Yields",
      description:
        "Analyzing the effects of climate change on global crop production and adaptation strategies.",
      author: "Dr. James Thompson",
      date: "February 28, 2024",
      readTime: "12 min read",
      category: "Climate",
      image: img4,
    },
    {
      id: 5,
      title: "Innovative Food Preservation Techniques",
      description:
        "Latest research on natural food preservation methods that maintain nutritional value and extend shelf life.",
      author: "Dr. Lisa Park",
      date: "February 20, 2024",
      readTime: "7 min read",
      category: "Innovation",
      image: img5,
    },
    {
      id: 6,
      title: "Plant-Based Protein Sources Study",
      description:
        "Comprehensive analysis of plant-based protein alternatives and their nutritional profiles.",
      author: "Dr. Ahmed Hassan",
      date: "February 15, 2024",
      readTime: "9 min read",
      category: "Nutrition",
      image: img6,
    },
  ];

  // Pagination setup
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(blogPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const displayedPosts = showAll
    ? showPagination
      ? blogPosts.slice(startIndex, startIndex + itemsPerPage)
      : blogPosts
    : blogPosts.slice(0, 3);

  return (
    <Box
      bgGradient={bgGradient}
      py={{ base: 6, md: 10 }}
      px={{ base: 6, md: 10 }}
    >
      <Container maxW="7xl">
        {/* Section Header */}
        <Box textAlign="center" mb={12}>
          <Flex justify="center" align="center">
            <Text
              bg="teal.100"
              color="teal.700"
              px={4}
              py={2}
              rounded="full"
              fontWeight="semibold"
              fontSize="sm"
              textAlign="center"
            >
              Our Blogs
            </Text>
          </Flex>
          <Heading
            as="h1"
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
            mb={4}
            fontWeight="bold"
            color={titleCol}
          >
            Research Insights
          </Heading>
          <Text maxW="4xl" mx="auto" fontSize="lg" color={textCol}>
            Explore our latest research findings and insights in food science,
            sustainability, and nutrition.
          </Text>
        </Box>

        {/* Blog Grid */}
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={8}>
          {displayedPosts.map((post) => (
            <Box
              key={post.id}
              borderWidth="1px"
              borderColor={borderCol}
              rounded="lg"
              overflow="hidden"
              bg={cardBg}
              transition="all 0.3s ease"
              _hover={{ transform: "translateY(-5px)", boxShadow: "lg" }}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              h="100%" // ensures card stretches evenly
            >
              <Image
                src={post.image}
                alt={post.title}
                w="full"
                h="220px"
                objectFit="cover"
              />
              <Box p={6} flex="1" display="flex" flexDirection="column">
                <VStack align="start" spacing={3} flex="1">
                  <HStack justify="space-between" w="full">
                    <Badge colorScheme="teal" variant="subtle">
                      {post.category}
                    </Badge>
                    <HStack fontSize="sm" color={textCol}>
                      <Icon as={FaClock} />
                      <Text>{post.readTime}</Text>
                    </HStack>
                  </HStack>

                  {/* Fixed height container for title & description */}
                  <Box flex="1" minH="150px">
                    <Heading
                      as="h3"
                      fontSize="xl"
                      fontWeight="semibold"
                      color={titleCol}
                      transition="color 0.3s ease"
                      _hover={{ color: "teal.500" }}
                      mb={2}
                    >
                      {post.title}
                    </Heading>
                    <Text fontSize="sm" color={textCol}>
                      {post.description}
                    </Text>
                  </Box>

                  <HStack
                    justify="space-between"
                    w="full"
                    pt={2}
                    fontSize="sm"
                    color={textCol}
                  >
                    <HStack>
                      <Icon as={FaUser} />
                      <Text>{post.author}</Text>
                    </HStack>
                    <HStack>
                      <Icon as={FaCalendarAlt} />
                      <Text>{post.date}</Text>
                    </HStack>
                  </HStack>
                </VStack>
              </Box>
            </Box>
          ))}
        </SimpleGrid>

        {/* Pagination on Blogs Page */}
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
              to="/blogs"
              color="teal.600"
              fontWeight="semibold"
              fontSize="lg"
              _hover={{ textDecoration: "underline", color: "teal.800" }}
            >
              View More →
            </Link>
          </Flex>
        )}
      </Container>
    </Box>
  );
};

export default BlogsSection;
