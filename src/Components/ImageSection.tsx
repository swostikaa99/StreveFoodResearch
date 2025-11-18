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
  Spinner,
  Center,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  description: string;
}

const ImagesSection = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  const titleCol = useColorModeValue("gray.800", "white");
  const textCol = useColorModeValue("gray.600", "gray.300");
  const borderCol = useColorModeValue("gray.200", "gray.700");
  const cardBg = useColorModeValue("white", "gray.800");

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/page/alias/gallery");
        const json = await res.json();

        if (json.success && Array.isArray(json.data?.children)) {
          const apiImages: GalleryImage[] = json.data.children.map(
            (item: any) => {
              // Handle multiple images separated by commas
              const firstImage =
                typeof item.thumb === "string" ? item.thumb.split(",")[0] : "";

              return {
                id: item.id,
                src: firstImage,
                title: item.name,
                description: item.details
                  ? item.details.replace(/<[^>]+>/g, "")
                  : "",
              };
            }
          );

          setImages(apiImages.slice(0, 3)); // show only first 3
        }
      } catch (err) {
        console.error("Error loading gallery:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  if (loading) {
    return (
      <Center py={20}>
        <Spinner size="xl" color="teal.500" />
      </Center>
    );
  }

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
