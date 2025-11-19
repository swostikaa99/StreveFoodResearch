import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Icon,
  useColorModeValue,
  HStack,
  Center,
} from "@chakra-ui/react";
import {
  FaLeaf,
  FaMicroscope,
  FaHandsHelping,
  FaUsers,
  FaGlobeAsia,
  FaIndustry,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const impacts = [
  {
    id: 1,
    title: "Environmental Sustainability",
    description:
      "We promote sustainable agricultural and food production practices that minimize environmental impact and conserve natural resources for future generations.",
    icon: FaLeaf,
  },
  {
    id: 2,
    title: "Scientific Advancement",
    description:
      "Our research contributes to evidence-based innovation in food science and technology, supporting a more efficient and safer food industry.",
    icon: FaMicroscope,
  },
  {
    id: 3,
    title: "Community Empowerment",
    description:
      "Through outreach, workshops, and training programs, we empower farmers, students, and professionals to enhance their skills and knowledge.",
    icon: FaHandsHelping,
  },
  {
    id: 4,
    title: "Public Health Improvement",
    description:
      "By focusing on nutrition and food safety, we play a crucial role in improving public health outcomes and ensuring food security.",
    icon: FaUsers,
  },
  {
    id: 5,
    title: "Global Collaboration",
    description:
      "We collaborate with international research institutions and development agencies to bring global expertise to local contexts.",
    icon: FaGlobeAsia,
  },
  {
    id: 6,
    title: "Industry Innovation",
    description:
      "Our consultancy services help industries innovate in processing, packaging, and product development while maintaining quality standards.",
    icon: FaIndustry,
  },
];

const Impacts = () => {
  const bgGradient = useColorModeValue(
    "linear(to-b, gray.50, teal.50)",
    "linear(to-b, gray.900, teal.900)"
  );
  const cardBg = useColorModeValue("white", "gray.800");
  const titleCol = useColorModeValue("gray.800", "white");
  const textCol = useColorModeValue("gray.600", "gray.300");
  const borderCol = useColorModeValue("gray.200", "gray.700");

  return (
    <Box bgGradient={bgGradient} py={{ base: 12, md: 16 }}>
      <Container maxW="7xl">
        {/* Header */}
        <Box textAlign="center" mb={12} px={{ base: 4, md: 0 }}>
          <Heading
            as="h1"
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
            mb={4}
            fontWeight="bold"
            color={titleCol}
          >
            Our Impacts
          </Heading>
          <Text maxW="5xl" mx="auto" fontSize="lg" color={textCol}>
            Through research, innovation, and collaboration, we drive measurable
            change in communities, industries, and the environment.
          </Text>
        </Box>

        {/* Slider with custom navigation */}
        <HStack position="relative" spacing={0} align="center">
          {/* Left navigation icon */}
          <Center
            className="custom-prev"
            position="absolute"
            left="-60px"
            zIndex="10"
            cursor="pointer"
            bg="orange.500"
            color="white"
            p={3}
            rounded="full"
            transition="all 0.3s ease"
            _hover={{ bg: "orange.600", transform: "scale(1.1)" }}
          >
            <FaChevronLeft size={20} />
          </Center>

          {/* Swiper */}
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            pagination={{ clickable: true }}
            navigation={{
              prevEl: ".custom-prev",
              nextEl: ".custom-next",
            }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            style={{ paddingBottom: "50px" }}
          >
            {impacts.map((impact) => (
              <SwiperSlide key={impact.id}>
                <Box
                  p={8}
                  borderWidth="1px"
                  borderColor={borderCol}
                  rounded="xl"
                  bg={cardBg}
                  shadow="md"
                  h={{ base: "auto", md: "320px" }}
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  transition="all 0.3s ease"
                  _hover={{
                    transform: "translateY(-5px)",
                    boxShadow: "xl",
                    borderColor: "teal.400",
                  }}
                >
                  <VStack spacing={5} align="start" textAlign="left">
                    <Box
                      bg="teal.500"
                      color="white"
                      p={4}
                      rounded="full"
                      display="inline-flex"
                    >
                      <Icon as={impact.icon} w={7} h={7} />
                    </Box>
                    <Heading
                      as="h3"
                      fontSize="xl"
                      fontWeight="semibold"
                      color={titleCol}
                    >
                      {impact.title}
                    </Heading>
                    <Text fontSize="md" color={textCol}>
                      {impact.description}
                    </Text>
                  </VStack>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Right navigation icon */}
          <Center
            className="custom-next"
            position="absolute"
            right="-60px"
            zIndex="10"
            cursor="pointer"
            bg="orange.500"
            color="white"
            p={3}
            rounded="full"
            transition="all 0.3s ease"
            _hover={{ bg: "teal.600", transform: "scale(1.1)" }}
          >
            <FaChevronRight size={20} />
          </Center>
        </HStack>
      </Container>
    </Box>
  );
};

export default Impacts;
