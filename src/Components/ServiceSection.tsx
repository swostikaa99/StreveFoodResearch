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
} from "@chakra-ui/react";
import {
  FaGraduationCap,
  FaMicroscope,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import trainingImage from "../assets/training-image.jpg";
import researchImage from "../assets/research-image.jpg";
import consultancyImage from "../assets/consultancy-image.jpg";

interface ServicesSectionProps {
  showAll?: boolean; // true = services page
  showPagination?: boolean; // true = enable pagination
}

const ServicesSection = ({
  showAll = false,
  showPagination = false,
}: ServicesSectionProps) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const cardHover = useColorModeValue("gray.50", "gray.700");
  const textMuted = useColorModeValue("gray.600", "gray.300");
  const navigate = useNavigate();
  const bgGradient = useColorModeValue(
    "linear(to-b, gray.50, teal.50)",
    "linear(to-b, gray.900, teal.900)"
  );

  const services = [
    {
      icon: FaGraduationCap,
      color: "teal.500",
      title: "Training Programs",
      description:
        "Comprehensive food safety and quality management training for industry professionals.",
      image: trainingImage,
      features: [
        "HACCP Certification",
        "Food Safety Management",
        "Quality Assurance",
        "Regulatory Compliance",
      ],
    },
    {
      icon: FaMicroscope,
      color: "orange.400",
      title: "Research & Development",
      description:
        "Cutting-edge food science research to advance industry standards and innovation.",
      image: researchImage,
      features: [
        "Product Development",
        "Nutritional Analysis",
        "Shelf Life Studies",
        "Sensory Evaluation",
      ],
    },
    {
      icon: FaUsers,
      color: "blue.500",
      title: "Consultancy Services",
      description:
        "Expert guidance on food business operations, compliance, and best practices.",
      image: consultancyImage,
      features: [
        "Regulatory Compliance",
        "Process Optimization",
        "Quality Systems",
        "Capacity Building",
      ],
    },
    {
      icon: FaGraduationCap,
      color: "teal.500",
      title: "Training Programs",
      description:
        "Comprehensive food safety and quality management training for industry professionals.",
      image: trainingImage,
      features: [
        "HACCP Certification",
        "Food Safety Management",
        "Quality Assurance",
        "Regulatory Compliance",
      ],
    },
    {
      icon: FaMicroscope,
      color: "orange.400",
      title: "Research & Development",
      description:
        "Cutting-edge food science research to advance industry standards and innovation.",
      image: researchImage,
      features: [
        "Product Development",
        "Nutritional Analysis",
        "Shelf Life Studies",
        "Sensory Evaluation",
      ],
    },
    {
      icon: FaUsers,
      color: "blue.500",
      title: "Consultancy Services",
      description:
        "Expert guidance on food business operations, compliance, and best practices.",
      image: consultancyImage,
      features: [
        "Regulatory Compliance",
        "Process Optimization",
        "Quality Systems",
        "Capacity Building",
      ],
    },
    {
      icon: FaGraduationCap,
      color: "teal.500",
      title: "Training Programs",
      description:
        "Comprehensive food safety and quality management training for industry professionals.",
      image: trainingImage,
      features: [
        "HACCP Certification",
        "Food Safety Management",
        "Quality Assurance",
        "Regulatory Compliance",
      ],
    },
    {
      icon: FaMicroscope,
      color: "orange.400",
      title: "Research & Development",
      description:
        "Cutting-edge food science research to advance industry standards and innovation.",
      image: researchImage,
      features: [
        "Product Development",
        "Nutritional Analysis",
        "Shelf Life Studies",
        "Sensory Evaluation",
      ],
    },
    {
      icon: FaUsers,
      color: "blue.500",
      title: "Consultancy Services",
      description:
        "Expert guidance on food business operations, compliance, and best practices.",
      image: consultancyImage,
      features: [
        "Regulatory Compliance",
        "Process Optimization",
        "Quality Systems",
        "Capacity Building",
      ],
    },
    // add more if needed
  ];

  // Pagination setup
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(services.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedServices = showAll
    ? showPagination
      ? services.slice(startIndex, startIndex + itemsPerPage)
      : services
    : services.slice(0, 3);

  return (
    <Box
      as="section"
      bgGradient={bgGradient}
      minH="calc(100vh - 80px)"
      p={{ base: 10, md: 20 }}
      w="100%"
    >
      <Box maxW="7xl" mx="auto" w="full">
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
            Comprehensive Food Industry Solutions
          </Heading>
          <Text fontSize="lg" color={textMuted} maxW="4xl">
            From training to research and consultancy, we provide end-to-end
            support for food businesses in Nepal.
          </Text>
        </VStack>

        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={10}
        >
          {displayedServices.map((service, i) => (
            <Box
              key={i}
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
            >
              <Box position="relative" h="220px" overflow="hidden">
                <Image
                  src={service.image}
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
                  <Icon as={service.icon} boxSize={10} color={service.color} />
                </Box>
              </Box>

              <Box p={{ base: 5, md: 6 }}>
                <Heading
                  as="h3"
                  size="lg"
                  mb={2}
                  color={useColorModeValue("gray.800", "white")}
                >
                  {service.title}
                </Heading>
                <Text fontSize="md" color={textMuted} mb={4}>
                  {service.description}
                </Text>

                <VStack align="start" spacing={2} mb={6}>
                  {service.features.map((feature, idx) => (
                    <Flex key={idx} align="center" gap={2}>
                      <Box w={2} h={2} bg="teal.400" borderRadius="full" />
                      <Text fontSize="sm" color={textMuted}>
                        {feature}
                      </Text>
                    </Flex>
                  ))}
                </VStack>

                <Button
                  variant="outline"
                  w="full"
                  colorScheme="teal"
                  rightIcon={<FaArrowRight />}
                  onClick={() => navigate(`/ServiceId/${i}`)}
                  _hover={{
                    bg: "teal.500",
                    color: "white",
                    transform: "translateY(-2px)",
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Box>
          ))}
        </Grid>

        {/* Pagination only on Services Page */}
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
    </Box>
  );
};

export default ServicesSection;
