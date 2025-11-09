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
  Link,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

import research1 from "../assets/research-1.jpg";
import research2 from "../assets/research-2.jpg";
import research3 from "../assets/research-3.jpg";
import research4 from "../assets/research-4.jpg";
import research5 from "../assets/research-5.jpg";
import research6 from "../assets/research-6.jpg";

const allImages = [
  {
    id: 1,
    src: research1,
    title: "Laboratory Analysis",
    description: "Fresh produce quality testing in our state-of-the-art lab.",
  },
  {
    id: 2,
    src: research2,
    title: "Sustainable Agriculture",
    description: "Controlled environment research for optimal crop growth.",
  },
  {
    id: 3,
    src: research3,
    title: "Food Quality Testing",
    description:
      "Microscopic examination of food samples for quality assurance.",
  },
  {
    id: 4,
    src: research4,
    title: "Nutritional Research",
    description: "Analyzing nutritional content of various food sources.",
  },
  {
    id: 5,
    src: research5,
    title: "Hydroponic Systems",
    description:
      "Modern agricultural technology for sustainable food production.",
  },
  {
    id: 6,
    src: research6,
    title: "Food Science",
    description: "Laboratory research documentation and analysis.",
  },
];

const ImagesSection = () => {
  const titleCol = useColorModeValue("gray.800", "white");
  const textCol = useColorModeValue("gray.600", "gray.300");
  const borderCol = useColorModeValue("gray.200", "gray.700");
  const cardBg = useColorModeValue("white", "gray.800");

  const images = allImages.slice(0, 3); // only first 3 for homepage

  return (
    <Box py={{ base: 12, md: 20 }}>
      <Container maxW="7xl">
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
            display="inline-block"
          >
            Our Images
          </Text>
        </Flex>

        <Box textAlign="center" mb={12}>
          <Heading
            as="h2"
            fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            mb={4}
            fontWeight="bold"
            color={titleCol}
          >
            Research Gallery
          </Heading>
          <Text maxW="2xl" mx="auto" fontSize="lg" color={textCol}>
            A glimpse into our research activities and laboratory facilities.
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={8}>
          {images.map((image) => (
            <Box
              key={image.id}
              borderWidth="1px"
              borderColor={borderCol}
              bg={cardBg}
              rounded="lg"
              overflow="hidden"
              transition="all 0.3s ease"
              _hover={{ transform: "translateY(-4px)", boxShadow: "lg" }}
            >
              <AspectRatio ratio={4 / 3}>
                <Image src={image.src} alt={image.title} objectFit="cover" />
              </AspectRatio>
              <Box p={5}>
                <Heading as="h3" fontSize="lg" mb={1} color={titleCol}>
                  {image.title}
                </Heading>
                <Text fontSize="sm" color={textCol}>
                  {image.description}
                </Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>

        {/* View More Link */}
        <Flex justify="center" mt={8}>
          <Link
            as={RouterLink}
            to="/images"
            color="teal.500"
            fontWeight="semibold"
            _hover={{ textDecoration: "underline", color: "teal.600" }}
          >
            View More →
          </Link>
        </Flex>
      </Container>
    </Box>
  );
};

export default ImagesSection;
