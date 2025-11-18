import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Box, useColorModeValue } from "@chakra-ui/react";

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const bgGradient = useColorModeValue(
    "linear(to-b, gray.50, teal.50)",
    "linear(to-b, gray.900, teal.900)"
  );

  // Assume your header height is 80px and footer height is ~60px.
  // You can adjust these values if your layout differs.
  const headerHeight = 80;
  const footerHeight = 60;

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Box position="fixed" top={0} left={0} right={0} zIndex={1000}>
        <Header />
      </Box>

      {/* main content section adjusted to exclude header/footer height */}
      <Box
        as="main"
        flex="1"
        bgGradient={bgGradient}
        minH={`calc(100vh - ${headerHeight + footerHeight}px)`}
        pt={`${headerHeight}px`}
        pb={`${footerHeight}px`}
        px={{ base: 4, md: 10, lg: 20 }}
        overflow="hidden"
        fontFamily={"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"}
      >
        {children}
      </Box>

      <Footer />
    </Box>
  );
};

export default PageWrapper;
