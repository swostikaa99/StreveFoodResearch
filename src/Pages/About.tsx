import React from "react";
import { Box, Text, useColorModeValue, Heading } from "@chakra-ui/react";
import AboutComponent from "../Components/AboutComponent";
import PageWrapper from "../Layout/Pagewrapper";

export default function About() {
  const textMuted = useColorModeValue("gray.600", "gray.300");
  const bgGradient = useColorModeValue(
    "linear(to-b, gray.50, teal.50)",
    "linear(to-b, gray.900, teal.900)"
  );

  return (
    <PageWrapper>
      <Box bgGradient={bgGradient}>
        <AboutComponent showAll={true} />
      </Box>
    </PageWrapper>
  );
}
