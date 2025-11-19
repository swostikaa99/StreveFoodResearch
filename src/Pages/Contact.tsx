import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Input,
  Textarea,
  Button,
  SimpleGrid,
  useToast,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import PageWrapper from "../Layout/Pagewrapper";
import { motion } from "framer-motion";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// Create a motion wrapper for Chakra Box
const MotionBox = motion.create(Box);

const Contact = () => {
  const toast = useToast();

  const [settings, setSettings] = useState<any>(null);
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    details: "",
    subject: "",
    status: "pending",
    model: "",
    model_id: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${API_BASE}/setting/list`, {
          method: "GET",
          headers: { accept: "application/json" },
        });
        const result = await response.json();
        if (result.success && result.data.length > 0) {
          setSettings(result.data[0]);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoadingSettings(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Required Field",
        description: "Full Name is required.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    if (!formData.email.trim()) {
      toast({
        title: "Required Field",
        description: "Email Address is required.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    if (!formData.phone.trim()) {
      toast({
        title: "Required Field",
        description: "Phone Number is required.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    if (!formData.subject.trim()) {
      toast({
        title: "Required Field",
        description: "Subject is required.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const payload = { ...formData };
      const response = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok && result.status) {
        toast({
          title: "Success",
          description: "Contact submitted successfully!",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          details: "",
          subject: "",
          status: "pending",
          model: "",
          model_id: "",
        });
      } else {
        toast({
          title: "Error",
          description: result.message || "Something went wrong.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error submitting contact:", error);
      toast({
        title: "Error",
        description: "Failed to connect to the server.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loadingSettings) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  const phone = settings?.phone || settings?.phone_number || "+977 9800000000";
  const address = settings?.address || "Baneshwor, Kathmandu, Nepal";
  const email =
    settings?.email || settings?.email_address || "info@strivefoodresearch.com";
  const locationUrl =
    settings?.location_url ||
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.113383783634!2d85.335192!3d27.693519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198d1dfe23f5%3A0x1f89bb0136ff94d1!2sBaneshwor%2C%20Kathmandu!5e0!3m2!1sen!2snp!4v1709968890000!5m2!1sen!2snp";

  return (
    <PageWrapper>
      <Box overflowX="hidden" py={[16, 20, 24]} px={[4, 10, 20]} bg="gray.50">
        <Flex
          direction={["column", "row"]}
          gap={20}
          align="flex-start"
          justify="center"
        >
          {/* Left: Google Map */}
          <MotionBox
            flex="1"
            minW="300px"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.8 }}
          >
            <Heading size="lg" mb={4} color="blue.800">
              Find Us Here
            </Heading>
            <Box
              as="iframe"
              title="Location"
              src={locationUrl}
              width="100%"
              height="350px"
              style={{ border: 0, borderRadius: "16px" }}
              loading="lazy"
              allowFullScreen
            ></Box>

            <VStack spacing={1} mt={6} align="start">
              <Text fontWeight="bold" color="blue.800">
                {phone}
              </Text>
              <Text color="gray.700">{address}</Text>
              <Text color="blue.600">{email}</Text>
            </VStack>
          </MotionBox>

          {/* Right: Contact Form */}
          <MotionBox
            flex="1"
            p={8}
            bg="white"
            borderRadius="lg"
            boxShadow="lg"
            w="100%"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Heading as="h3" size="lg" mb={6} color="blue.800">
              Contact Us
            </Heading>

            <SimpleGrid columns={[1, 2]} spacing={4}>
              <Input
                placeholder="Full Name *"
                name="name"
                value={formData.name}
                onChange={handleChange}
                borderColor="gray.300"
                _focus={{ borderColor: "blue.400" }}
              />
              <Input
                placeholder="Email Address *"
                name="email"
                value={formData.email}
                onChange={handleChange}
                borderColor="gray.300"
                _focus={{ borderColor: "blue.400" }}
              />
              <Input
                placeholder="Phone Number *"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                borderColor="gray.300"
                _focus={{ borderColor: "blue.400" }}
              />
              <Input
                placeholder="Company"
                name="company"
                isDisabled
                value="-"
                borderColor="gray.300"
              />
            </SimpleGrid>

            <Input
              placeholder="Subject *"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              mt={4}
              borderColor="gray.300"
              _focus={{ borderColor: "blue.400" }}
            />
            <Textarea
              placeholder="Message"
              name="details"
              value={formData.details}
              onChange={handleChange}
              mt={4}
              rows={5}
              borderColor="gray.300"
              _focus={{ borderColor: "blue.400" }}
            />

            <Button
              bgGradient="linear(to-r, green.400, green.600)"
              color="white"
              size="lg"
              mt={6}
              w="100%"
              borderRadius="full"
              _hover={{ bgGradient: "linear(to-r, green.200, green.400)" }}
              onClick={handleSubmit}
              isLoading={loading}
            >
              Send Message
            </Button>
          </MotionBox>
        </Flex>
      </Box>
    </PageWrapper>
  );
};

export default Contact;
