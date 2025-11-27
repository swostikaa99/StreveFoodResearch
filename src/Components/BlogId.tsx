import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Image,
  Badge,
  HStack,
  Icon,
  Divider,
  Container,
} from "@chakra-ui/react";
import { FaUser, FaCalendarAlt, FaClock } from "react-icons/fa";
import PageWrapper from "../Layout/Pagewrapper";
import { blogPosts } from "./BlogsSection";

const BlogId = () => {
  const { id } = useParams();
  const blog = blogPosts.find((b) => b.id === Number(id));

  if (!blog) {
    return (
      <PageWrapper>
        <Box textAlign="center" py={20}>
          <Heading>Blog Not Found</Heading>
        </Box>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Container maxW="5xl" py={10}>
        {/* Image */}
        <Image
          src={blog.image}
          alt={blog.title}
          w="100%"
          h={{ base: "250px", md: "400px" }}
          objectFit="cover"
          rounded="lg"
          mb={8}
        />

        {/* Category */}
        <Badge colorScheme="teal" fontSize="md" px={4} py={1} rounded="full">
          {blog.category}
        </Badge>

        {/* Title */}
        <Heading mt={4} fontSize={{ base: "3xl", md: "4xl" }}>
          {blog.title}
        </Heading>

        {/* Meta info */}
        <HStack spacing={6} mt={4} color="gray.600">
          <HStack>
            <Icon as={FaUser} />
            <Text>{blog.author}</Text>
          </HStack>
          <HStack>
            <Icon as={FaCalendarAlt} />
            <Text>{blog.date}</Text>
          </HStack>
          <HStack>
            <Icon as={FaClock} />
            <Text>{blog.readTime}</Text>
          </HStack>
        </HStack>

        <Divider my={6} />

        {/* Blog description */}
        <Text fontSize="lg" color="gray.700" lineHeight="tall">
          {blog.description}
        </Text>

        {/* Dummy extended content */}
        <Text mt={6} fontSize="md" color="gray.600" lineHeight="taller">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros elementum tristique. Duis cursus, mi quis viverra
          ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
          Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet.
        </Text>

        <Text mt={4} fontSize="md" color="gray.600" lineHeight="taller">
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
          ut aliquip ex ea commodo consequat.
        </Text>
      </Container>
    </PageWrapper>
  );
};

export default BlogId;
