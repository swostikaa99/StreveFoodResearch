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
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import img1 from "../assets/research-1.jpg";
import img2 from "../assets/research-2.jpg";
import img3 from "../assets/research-3.jpg";
import img4 from "../assets/research-4.jpg";
import img5 from "../assets/research-5.jpg";
import img6 from "../assets/research-6.jpg";

// ✅ FIXED: blogPosts MUST be exported OUTSIDE component
export const blogPosts = [
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

interface BlogsSectionProps {
  showAll?: boolean;
  showPagination?: boolean;
}

const MotionBox = motion(Box);

const BlogsSection = ({
  showAll = false,
  showPagination = false,
}: BlogsSectionProps) => {
  const navigate = useNavigate();

  const bgGradient = useColorModeValue(
    "linear(to-b, gray.50, teal.50)",
    "linear(to-b, gray.900, teal.900)"
  );
  const cardBg = useColorModeValue("white", "gray.800");
  const borderCol = useColorModeValue("gray.200", "gray.700");
  const titleCol = useColorModeValue("gray.800", "white");
  const textCol = useColorModeValue("gray.600", "gray.300");

  // Pagination
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(blogPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const displayedPosts = showAll
    ? showPagination
      ? blogPosts.slice(startIndex, startIndex + itemsPerPage)
      : blogPosts
    : blogPosts.slice(0, 3);

  const openBlog = (id: number) => {
    navigate(`/blogs/${id}`);
  };

  return (
    <Box
      bgGradient={bgGradient}
      py={{ base: 6, md: 10 }}
      px={{ base: 6, md: 10 }}
    >
      <Container maxW="7xl">
        <Box textAlign="center" mb={12}>
          <Flex justify="center">
            <Text
              bg="teal.100"
              color="teal.700"
              px={4}
              py={2}
              rounded="full"
              fontWeight="semibold"
            >
              Our Blogs
            </Text>
          </Flex>

          <Heading
            as="h1"
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
            mb={4}
            color={titleCol}
          >
            Research Insights
          </Heading>

          <Text maxW="4xl" mx="auto" fontSize="lg" color={textCol}>
            Explore our latest research findings and insights in food science,
            sustainability, and nutrition.
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={8}>
          {displayedPosts.map((post, i) => (
            <MotionBox
              key={post.id}
              onClick={() => openBlog(post.id)}
              cursor="pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: i * 0.15 }}
              borderWidth="1px"
              borderColor={borderCol}
              rounded="lg"
              overflow="hidden"
              bg={cardBg}
              _hover={{ transform: "translateY(-5px)", boxShadow: "lg" }}
            >
              <Image
                src={post.image}
                alt={post.title}
                h="220px"
                w="full"
                objectFit="cover"
              />

              <Box p={6}>
                <VStack align="start" spacing={3}>
                  <HStack justify="space-between" w="full">
                    <Badge colorScheme="teal">{post.category}</Badge>
                    <HStack fontSize="sm" color={textCol}>
                      <Icon as={FaClock} />
                      <Text>{post.readTime}</Text>
                    </HStack>
                  </HStack>

                  <Heading
                    as="h3"
                    fontSize="xl"
                    fontWeight="semibold"
                    color={titleCol}
                  >
                    {post.title}
                  </Heading>

                  <Text fontSize="sm" color={textCol}>
                    {post.description}
                  </Text>

                  <HStack
                    justify="space-between"
                    w="full"
                    pt={2}
                    color={textCol}
                    fontSize="sm"
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
            </MotionBox>
          ))}
        </SimpleGrid>

        {showPagination && totalPages > 1 && (
          <Flex justify="center" align="center" mt={10} gap={3}>
            <Button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Prev
            </Button>

            <Text>
              Page {currentPage} of {totalPages}
            </Text>

            <Button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </Button>
          </Flex>
        )}

        {!showAll && (
          <Flex justify="right" mt={12}>
            <Link
              as={RouterLink}
              to="/blogs"
              fontWeight="semibold"
              color="teal.600"
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
