import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Heading,
  Flex,
  Icon,
  Image,
  useColorModeValue,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Link,
} from "@chakra-ui/react";
import { FaBriefcase } from "react-icons/fa";
import axiosInstance from "../api/axios";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";

interface Project {
  title: string;
  project: string;
  province?: string;
  detailsHtml: string;
  image?: string | null;
}

const MotionBox = motion(Box);

const ProjectSection = ({ limit }: { limit?: number }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const cardBg = useColorModeValue("white", "gray.800");
  const cardBorder = useColorModeValue("gray.200", "gray.700");
  const titleColor = useColorModeValue("gray.800", "white");
  const textColor = useColorModeValue("gray.600", "gray.300");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axiosInstance.get("/page/alias/our-projects");
        const page = response.data?.data;

        setTitle(page?.title || "Our Projects");

        if (Array.isArray(page?.children)) {
          const mappedProjects: Project[] = page.children.map((item: any) => ({
            title: item.name,
            project: item.meta_name || "",
            province: item.meta_description || "",
            detailsHtml: item.details || "",
            image:
              item.thumb && typeof item.thumb === "string"
                ? item.thumb.split(",")[0]
                : null,
          }));
          setProjects(mappedProjects);
        }
      } catch (error) {
        console.error("Project load error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <Flex justify="center" align="center" h="60vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  const openModal = (project: Project, idx: number) => {
    setSelectedProject(project);
    setSelectedIndex(idx);
    onOpen();
  };

  return (
    <Box w="100%" py={{ base: 12, md: 20 }} px={{ base: 6, md: 12 }}>
      <Box maxW="7xl" mx="auto">
        <Heading
          fontSize={{ base: "3xl", md: "5xl" }}
          fontWeight="bold"
          mb={10}
          color={titleColor}
          textAlign="center"
        >
          {title}
        </Heading>

        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={8}
        >
          {displayedProjects.map((item, idx) => (
            <MotionBox
              key={idx}
              p={6}
              bg={cardBg}
              borderWidth={1}
              borderColor={cardBorder}
              rounded="xl"
              boxShadow="md"
              _hover={{
                transform: "translateY(-6px)",
                boxShadow: "xl",
                borderColor: "teal.400",
                cursor: "pointer",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: idx * 0.1, duration: 0.5 },
              }}
              onClick={() => openModal(item, idx)}
            >
              <Box
                w={{ base: 24, md: 32 }}
                h={{ base: 24, md: 32 }}
                mx="auto"
                mb={4}
                overflow="hidden"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    objectFit="contain"
                    maxW="100%"
                    maxH="100%"
                  />
                ) : (
                  <Icon
                    as={FaBriefcase}
                    boxSize={{ base: 10, md: 12 }}
                    color="teal.600"
                  />
                )}
              </Box>

              <Heading fontSize="lg" fontWeight="bold" mb={2}>
                {item.title}
              </Heading>

              <Box mb={2}>
                {item.project && (
                  <Box fontWeight="semibold" color="teal.600">
                    {item.project}
                  </Box>
                )}
                {item.province && (
                  <Box fontSize="sm" color="gray.500">
                    {item.province}
                  </Box>
                )}
              </Box>
            </MotionBox>
          ))}
        </Grid>

        {limit && projects.length > limit && (
          <Flex justify="right" mt={8}>
            <Link
              as={RouterLink}
              to="/project"
              color="teal.500"
              fontWeight="semibold"
              _hover={{ textDecoration: "underline", color: "teal.600" }}
            >
              View More →
            </Link>
          </Flex>
        )}

        {selectedProject && (
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="xl"
            isCentered
            motionPreset="slideInBottom"
          >
            <ModalOverlay />
            <ModalContent
              as={motion.div}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: selectedIndex * 0.1, duration: 0.5 },
              }}
            >
              <ModalHeader fontWeight="bold">
                {selectedProject.title}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {selectedProject.project && (
                  <Box fontWeight="bold" color="teal.600" mb={2}>
                    {selectedProject.project}
                  </Box>
                )}
                {selectedProject.province && (
                  <Box fontSize="md" color="gray.500" mb={4}>
                    {selectedProject.province}
                  </Box>
                )}
                {selectedProject.image && (
                  <Flex justify="center" mb={4}>
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      objectFit="contain"
                      maxH="300px"
                    />
                  </Flex>
                )}

                <Box
                  className="project-details"
                  sx={{
                    "& p, & li": {
                      fontWeight: 700,
                      color: textColor,
                      lineHeight: 1.8,
                      marginBottom: "0.75rem",
                      fontSize: "18px",
                      "@media (min-width: 48em)": { fontSize: "20px" },
                    },
                    "& li": { paddingLeft: "0.5rem" },
                    "& li::marker": { color: "teal.500" },
                  }}
                  dangerouslySetInnerHTML={{
                    __html: selectedProject.detailsHtml,
                  }}
                />
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
      </Box>
    </Box>
  );
};

export default ProjectSection;
