import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Image,
  VStack,
  Flex,
  Icon,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import trainingImage from "../assets/training-image.jpg";
import researchImage from "../assets/research-image.jpg";
import consultancyImage from "../assets/consultancy-image.jpg";
import { FaGraduationCap, FaMicroscope, FaUsers } from "react-icons/fa";

const ServiceId = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const textMuted = useColorModeValue("gray.600", "gray.300");

  const services = [
    {
      icon: FaGraduationCap,
      color: "teal.500",
      title: "Training Programs",
      description:
        "Comprehensive food safety and quality management training for industry professionals.",
      image: trainingImage,
      details:
        "Our training programs are designed to enhance professional skills and improve food quality standards in Nepal’s growing food sector. We provide globally recognized certifications, hands-on workshops, and in-depth learning experiences for food safety officers, QA professionals, and entrepreneurs.",
    },
    {
      icon: FaMicroscope,
      color: "orange.400",
      title: "Research & Development",
      description:
        "Cutting-edge food science research to advance industry standards and innovation.",
      image: researchImage,
      details:
        "Our R&D division focuses on innovative solutions for product development, sensory evaluation, and nutritional analysis. With a focus on evidence-based research, we aim to foster innovation and sustainable growth in the food industry.",
    },
    {
      icon: FaUsers,
      color: "blue.500",
      title: "Consultancy Services",
      description:
        "Expert guidance on food business operations, compliance, and best practices.",
      image: consultancyImage,
      details:
        "Our consultancy services help businesses meet national and international standards through quality systems, regulatory compliance, and process optimization. We empower food companies with practical insights and long-term strategies for excellence.",
    },
  ];

  const service = services[Number(id)];

  if (!service) {
    return (
      <Box textAlign="center" py={20}>
        <Heading>Service Not Found</Heading>
        <Button mt={6} colorScheme="teal" onClick={() => navigate("/")}>
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <Box
      px={{ base: 6, md: 12, lg: 20 }}
      py={{ base: 16, md: 24, lg: 28 }}
      bg={useColorModeValue("gray.50", "gray.900")}
      minH="100vh"
    >
      <Button
        leftIcon={<FaArrowLeft />}
        variant="ghost"
        colorScheme="teal"
        mb={6}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>

      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        gap={10}
        bg={useColorModeValue("white", "gray.800")}
        p={8}
        rounded="2xl"
        shadow="lg"
      >
        <Box flex="1">
          <Image
            src={service.image}
            alt={service.title}
            rounded="xl"
            objectFit="cover"
            w="100%"
            h="350px"
          />
        </Box>

        <VStack align="start" flex="1" spacing={5}>
          <Flex align="center" gap={3}>
            <Icon as={service.icon} boxSize={8} color={service.color} />
            <Heading fontSize="3xl">{service.title}</Heading>
          </Flex>

          <Text fontSize="lg" color={textMuted}>
            {service.details}
          </Text>
        </VStack>
      </Flex>
    </Box>
  );
};

export default ServiceId;
