import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Box } from "@chakra-ui/react";

const PageWrapper = ({ children }) => {
  return (
    <Box minH="100vh">
      <Header />

      <Box
        as="main"
        // flex="1"

        // px={{ base: 4, md: 10, lg: 20 }}
        // py={{ base: 6, md: 10 }}
      >
        {children}
      </Box>

      <Footer />
    </Box>
  );
};

export default PageWrapper;
