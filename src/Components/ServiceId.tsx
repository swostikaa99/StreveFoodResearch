import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Image,
  VStack,
  Flex,
  Icon,
  Button,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";

interface ChildItem {
  id: number;
  name: string;
  alias: string;
  details: string;
  thumb?: string | null;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    name: string;
    title: string;
    details: string;
    children: {
      allevents: ChildItem[];
    };
  };
}

const ServiceId = () => {
  const { id } = useParams(); // "id" is actually the title (alias)
  const navigate = useNavigate();
  const textMuted = useColorModeValue("gray.600", "gray.300");

  const [service, setService] = useState<ChildItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get<ApiResponse>(
          "http://127.0.0.1:8000/api/page/alias/classes"
        );
        const allServices = res.data.data.children.allevents;
        const found = allServices.find(
          (s) =>
            s.name.toLowerCase() === decodeURIComponent(id || "").toLowerCase()
        );
        setService(found || null);
      } catch (error) {
        console.error("Error fetching service:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Spinner size="xl" color="teal.500" />
      </Flex>
    );
  }

  if (!service) {
    return (
      <Box textAlign="center" py={20}>
        <Heading>Service Not Found</Heading>
        <Button mt={6} colorScheme="teal" onClick={() => navigate("/services")}>
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
        {/* Image */}
        <Box flex="1">
          <Image
            src={
              service.thumb ||
              "https://via.placeholder.com/400x300?text=No+Image"
            }
            alt={service.name}
            rounded="xl"
            objectFit="cover"
            w="100%"
            h="350px"
          />
        </Box>

        {/* Content */}
        <VStack align="start" flex="1" spacing={5}>
          <Heading fontSize="3xl" color="teal.700">
            {service.name}
          </Heading>
          <Text
            fontSize="md"
            color={textMuted}
            dangerouslySetInnerHTML={{ __html: service.details }}
          />
        </VStack>
      </Flex>
    </Box>
  );
};

export default ServiceId;
