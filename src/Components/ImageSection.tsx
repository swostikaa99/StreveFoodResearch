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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
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
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [childrenImages, setChildrenImages] = useState<GalleryImage[]>([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const titleCol = useColorModeValue("gray.800", "white");
  const textCol = useColorModeValue("gray.600", "gray.300");

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/page/alias/gallery");
        const json = await res.json();

        console.log("API RESPONSE:", json);

        if (json.success) {
          /** MAIN IMAGE */
          const parentThumb = Array.isArray(json.data.thumb)
            ? json.data.thumb[0]
            : json.data.thumb;

          setMainImage(parentThumb || "");

          /** CHILD IMAGES */
          const parsedChildren = (json.data.children || []).map((item: any) => {
            let src = "";

            if (typeof item.thumb === "string") {
              src = item.thumb.split(",")[0];
            } else if (Array.isArray(item.thumb)) {
              src = item.thumb[0];
            }

            return {
              id: item.id,
              src,
              title: item.name || "Image",
              description: item.details
                ? item.details.replace(/<[^>]+>/g, "")
                : "",
            };
          });

          setChildrenImages(parsedChildren);
        }
      } catch (err) {
        console.error("Error:", err);
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
    <>
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

          {/* MAIN IMAGE CARD */}
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={8}>
            <Box
              borderWidth="1px"
              borderColor="gray.200"
              bg="white"
              rounded="lg"
              overflow="hidden"
              cursor="pointer"
              onClick={onOpen}
              _hover={{ transform: "translateY(-4px)", boxShadow: "lg" }}
              transition="all 0.3s ease"
            >
              <AspectRatio ratio={4 / 3}>
                <Image src={mainImage} objectFit="cover" />
              </AspectRatio>
              <Box p={5}>
                <Heading as="h3" fontSize="lg" mb={1} color={titleCol}>
                  Research Gallery
                </Heading>
                <Text fontSize="sm" color={textCol}>
                  Click to view all gallery images
                </Text>
              </Box>
            </Box>
          </SimpleGrid>

          <Flex justify="center" mt={8}>
            <Link
              as={RouterLink}
              to="/images"
              color="teal.500"
              fontWeight="semibold"
            >
              View More →
            </Link>
          </Flex>
        </Container>
      </Box>

      {/* WORKING MODAL - NO PORTAL */}
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Research Images</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
              {childrenImages.length ? (
                childrenImages.map((img) => (
                  <Box
                    key={img.id}
                    borderWidth="1px"
                    rounded="md"
                    overflow="hidden"
                  >
                    <Image src={img.src} objectFit="cover" />
                    <Box p={2}>
                      <Text fontWeight="bold">{img.title}</Text>
                    </Box>
                  </Box>
                ))
              ) : (
                <Text>No child images found.</Text>
              )}
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImagesSection;
