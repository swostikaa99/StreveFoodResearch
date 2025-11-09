import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  SimpleGrid,
  AspectRatio,
  useColorModeValue,
  Flex,
  Button,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import PageWrapper from "../Layout/Pagewrapper";

import research1 from "../assets/research-1.jpg";
import research2 from "../assets/research-2.jpg";
import research3 from "../assets/research-3.jpg";
import research4 from "../assets/research-4.jpg";
import research5 from "../assets/research-5.jpg";
import research6 from "../assets/research-6.jpg";

interface ImageItem {
  id: number;
  src: string;
  title: string;
  description: string;
}

interface ImagesProps {
  isHomePage?: boolean;
}

const images: ImageItem[] = [
  {
    id: 1,
    src: research1,
    title: "Laboratory Analysis",
    description:
      "Fresh produce quality testing in our state-of-the-art laboratory",
  },
  {
    id: 2,
    src: research2,
    title: "Sustainable Agriculture",
    description: "Controlled environment research for optimal crop growth",
  },
  {
    id: 3,
    src: research3,
    title: "Food Quality Testing",
    description:
      "Microscopic examination of food samples for quality assurance",
  },
  {
    id: 4,
    src: research4,
    title: "Nutritional Research",
    description: "Analyzing nutritional content of various food sources",
  },
  {
    id: 5,
    src: research5,
    title: "Hydroponic Systems",
    description:
      "Modern agricultural technology for sustainable food production",
  },
  {
    id: 6,
    src: research6,
    title: "Food Science",
    description: "Laboratory research documentation and analysis",
  },
];

const Images = ({ isHomePage = false }: ImagesProps) => {
  const bgGradient = useColorModeValue(
    "linear(to-b, gray.50, teal.50)",
    "linear(to-b, gray.900, teal.900)"
  );
  const cardBg = useColorModeValue("white", "gray.800");
  const borderCol = useColorModeValue("gray.200", "gray.700");
  const titleCol = useColorModeValue("gray.800", "white");
  const textCol = useColorModeValue("gray.600", "gray.300");

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(images.length / itemsPerPage);
  const paginatedImages = images.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const displayedImages = isHomePage ? images.slice(0, 3) : paginatedImages;

  const content = (
    <Box bgGradient={bgGradient} py={{ base: 10, md: 16 }}>
      <Container maxW="7xl" p={{ base: 8, md: 10 }}>
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
            Our Images
          </Text>
        </Flex>

        <Box textAlign="center" mb={12}>
          <Heading
            as="h1"
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
            mb={4}
            fontWeight="bold"
            color={titleCol}
          >
            Research Gallery
          </Heading>
          <Text maxW="2xl" mx="auto" fontSize="lg" color={textCol}>
            Visual documentation of our research activities and laboratory
            facilities.
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={8}>
          {displayedImages.map((image) => (
            <Box
              key={image.id}
              position="relative"
              overflow="hidden"
              rounded="lg"
              borderWidth="1px"
              borderColor={borderCol}
              bg={cardBg}
              transition="all 0.3s ease"
              _hover={{ transform: "translateY(-4px)", boxShadow: "lg" }}
            >
              <AspectRatio ratio={4 / 3}>
                <Image
                  src={image.src}
                  alt={image.title}
                  objectFit="cover"
                  transition="transform 0.3s ease"
                  _hover={{ transform: "scale(1.05)" }}
                />
              </AspectRatio>
              <Box p={5}>
                <Heading
                  as="h3"
                  fontSize="lg"
                  mb={1}
                  color={titleCol}
                  fontWeight="semibold"
                  _hover={{ color: "teal.500" }}
                >
                  {image.title}
                </Heading>
                <Text fontSize="sm" color={textCol}>
                  {image.description}
                </Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>

        {isHomePage && (
          <Flex justify="right" mt={12}>
            <Link
              as={RouterLink}
              to="/images"
              color="teal.600"
              fontWeight="semibold"
              fontSize="lg"
              _hover={{ textDecoration: "underline", color: "teal.800" }}
            >
              View More →
            </Link>
          </Flex>
        )}

        {!isHomePage && totalPages > 1 && (
          <Flex justify="center" mt={10} gap={4}>
            <Button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              isDisabled={currentPage === 1}
              colorScheme="teal"
              variant="outline"
            >
              Previous
            </Button>
            <Text alignSelf="center">
              Page {currentPage} of {totalPages}
            </Text>
            <Button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              isDisabled={currentPage === totalPages}
              colorScheme="teal"
              variant="outline"
            >
              Next
            </Button>
          </Flex>
        )}
      </Container>
    </Box>
  );

  return isHomePage ? content : <PageWrapper>{content}</PageWrapper>;
};

export default Images;
