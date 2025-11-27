import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Avatar,
  Icon,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRef } from "react";

// 🧠 Testimonial Data
const testimonials = [
  {
    id: 1,
    name: "Anjali Shrestha",
    role: "Food Technologist, Kathmandu",
    feedback:
      "Strive Food Research has been instrumental in enhancing our food safety standards. Their team combines expertise with practical solutions that truly make a difference.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 2,
    name: "Ramesh Koirala",
    role: "CEO, AgroNepal Pvt. Ltd.",
    feedback:
      "The training sessions on sustainable agriculture and product quality control were outstanding. We have implemented many of their insights into our operations.",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    id: 3,
    name: "Dr. Bina Adhikari",
    role: "Nutrition Researcher, Lalitpur",
    feedback:
      "Their evidence-based approach to food research and development has elevated the scientific credibility of our projects. Highly recommended!",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    id: 4,
    name: "Sanjay Thapa",
    role: "Quality Manager, Himalayan Foods",
    feedback:
      "Strive Food Research provided us with comprehensive training in modern food testing methodologies. Their professional guidance has improved our lab efficiency.",
    image: "https://randomuser.me/api/portraits/men/33.jpg",
  },
];

const Testimonial = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const bgGradient = useColorModeValue(
    "linear(to-b, gray.50, teal.50)",
    "linear(to-b, gray.900, teal.900)"
  );
  const cardBg = useColorModeValue("white", "gray.800");
  const borderCol = useColorModeValue("gray.200", "gray.700");
  const titleCol = useColorModeValue("gray.800", "white");
  const textCol = useColorModeValue("gray.600", "gray.300");

  const scrollAmount = 350; // distance scrolled per click

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <Box bgGradient={bgGradient} pt="80px">
      <Container maxW="7xl" px={{ base: 6, md: 10 }}>
        {/* Header */}
        <Box textAlign="center" mb={10}>
          <Heading
            as="h1"
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
            mb={4}
            fontWeight="bold"
            color={titleCol}
          >
            What Our Clients Say
          </Heading>
          <Text maxW="5xl" mx="auto" fontSize="lg" color={textCol}>
            Hear from professionals and organizations who have worked with us on
            research, training, and consultancy projects.
          </Text>
        </Box>

        {/* Arrow Buttons + Scrollable Cards */}
        <Box position="relative">
          {/* Left Button */}
          <IconButton
            aria-label="Scroll left"
            icon={<FaChevronLeft />}
            onClick={scrollLeft}
            position="absolute"
            top="50%"
            left="-16px"
            transform="translateY(-50%)"
            zIndex={2}
            colorScheme="orange"
            variant="solid"
            borderRadius="full"
            boxShadow="md"
            _hover={{ bg: "orange.600" }}
          />

          {/* Scrollable Area */}
          <Box
            ref={scrollRef}
            display="flex"
            overflowX="hidden" // hides scrollbar
            scrollBehavior="smooth"
          >
            {testimonials.map((item) => (
              <Box
                key={item.id}
                flex="0 0 350px"
                mx={3}
                p={6}
                borderWidth="1px"
                borderColor={borderCol}
                rounded="lg"
                bg={cardBg}
                shadow="md"
                transition="all 0.3s ease"
                _hover={{
                  transform: "translateY(-5px)",
                  boxShadow: "lg",
                  borderColor: "teal.300",
                }}
              >
                <VStack align="start" spacing={4}>
                  <Icon
                    as={FaQuoteLeft}
                    color="teal.500"
                    w={6}
                    h={6}
                    opacity={0.8}
                  />
                  <Text
                    fontSize="md"
                    fontStyle="italic"
                    color={textCol}
                    lineHeight="tall"
                  >
                    “{item.feedback}”
                  </Text>

                  <HStack pt={2} spacing={4} align="center">
                    <Avatar name={item.name} src={item.image} size="md" />
                    <VStack align="start" spacing={0}>
                      <Text
                        fontWeight="bold"
                        color={titleCol}
                        fontSize="md"
                        lineHeight="short"
                      >
                        {item.name}
                      </Text>
                      <Text fontSize="sm" color={textCol}>
                        {item.role}
                      </Text>
                    </VStack>
                  </HStack>
                </VStack>
              </Box>
            ))}
          </Box>

          {/* Right Button */}
          <IconButton
            aria-label="Scroll right"
            icon={<FaChevronRight />}
            onClick={scrollRight}
            position="absolute"
            top="50%"
            right="-16px"
            transform="translateY(-50%)"
            zIndex={2}
            colorScheme="orange"
            variant="solid"
            borderRadius="full"
            boxShadow="md"
            _hover={{ bg: "orange.600" }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Testimonial;
