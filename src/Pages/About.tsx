import React from "react";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import AboutComponent from "../Components/AboutComponent";
import PageWrapper from "../Layout/Pagewrapper";

export default function About() {
  const textMuted = useColorModeValue("gray.600", "gray.300");

  return (
    <PageWrapper>
      <Box>
        <AboutComponent />

        <Box
          maxW="7xl"
          mx="auto"
          px={{ base: 6, md: 10 }}
          mt={{ base: 16, md: 24 }}
        >
          <Text fontSize="lg" color={textMuted} lineHeight="tall" mb={4}>
            At Strive Food Research & Training, our vision is to become the
            driving force behind Nepal’s food innovation ecosystem. We aim to
            empower food businesses to operate with scientific integrity,
            sustainability, and global competitiveness, making Nepal a
            recognized hub for safe and high-quality food production in South
            Asia.
          </Text>

          <Text fontSize="lg" color={textMuted} lineHeight="tall" mb={4}>
            We work at the intersection of science, education, and industry,
            providing services such as food safety training, research and
            product development, consultancy, laboratory testing support, and
            capacity-building workshops. Our goal is to bridge the gap between
            academic knowledge and real-world industrial application.
          </Text>

          <Text fontSize="lg" color={textMuted} lineHeight="tall" mb={4}>
            Since our establishment, we have collaborated with food enterprises,
            academic institutions, and government agencies, helping them
            implement modern food safety systems and achieve measurable results.
            Our initiatives have contributed to raising public awareness,
            enhancing employment opportunities, and developing a skilled
            generation of food technologists and entrepreneurs in Nepal.
          </Text>

          <Text fontSize="lg" color={textMuted} lineHeight="tall" mb={4}>
            Our work is guided by values of integrity, innovation, excellence,
            sustainability, and collaboration — ensuring that every project we
            undertake adds value to both people and the planet.
          </Text>

          <Text fontSize="lg" color={textMuted} lineHeight="tall">
            As we move forward, Strive Food Research & Training is committed to
            expanding its research capabilities, strengthening international
            partnerships, and introducing advanced learning programs that align
            with global food industry standards. With passion and purpose, we
            strive to nurture a safer, smarter, and more sustainable food future
            for Nepal.
          </Text>
        </Box>
      </Box>
    </PageWrapper>
  );
}
