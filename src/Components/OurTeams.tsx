import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Image,
  Flex,
  Button,
  useColorModeValue,
  Link,
  Spinner,
  Icon,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

interface OurTeamProps {
  showAll?: boolean;
  showPagination?: boolean;
}

interface TeamMember {
  id: number;
  name: string;
  meta_name?: string | null;
  details: string;
  thumb: string | null;
  facebook?: string | null;
  instagram?: string | null;
  alias: string;
}

const fallbackImage = "https://cdn-icons-png.flaticon.com/512/847/847969.png";

// Modal animation variants
const modalAnim = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, scale: 0.85, transition: { duration: 0.2 } },
};

const OurTeam = ({ showAll = false, showPagination = false }: OurTeamProps) => {
  const bgGradient = useColorModeValue(
    "linear(to-b, gray.50, teal.50)",
    "linear(to-b, gray.900, teal.900)"
  );
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const titleColor = useColorModeValue("gray.800", "white");
  const metaColor = useColorModeValue("gray.500", "gray.400");

  const [members, setMembers] = useState<TeamMember[]>([]);
  const [title, setTitle] = useState("Our Team");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 6;
  const homeLimit = 3;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(members.length / itemsPerPage);

  const displayedMembers = showAll
    ? showPagination
      ? members.slice((page - 1) * itemsPerPage, page * itemsPerPage)
      : members
    : members.slice(0, homeLimit);

  // Modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState<TeamMember | null>(null);

  const openModal = (m: TeamMember) => {
    setSelected(m);
    onOpen();
  };

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/page/alias/teams");
        const json = await res.json();

        setTitle(json.data.title);
        setDescription(json.data.details);
        setMembers(json.data.children);
      } catch (err) {
        console.error("Error loading team:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeamData();
  }, []);

  const getFirstSentence = (html?: string) => {
    if (!html) return "";
    const text = new DOMParser()
      .parseFromString(html, "text/html")
      .body.textContent?.trim();
    if (!text) return "";
    const match = text.match(/[^.!?]+[.!?]/);
    return match ? match[0] : text;
  };

  const normalizeUrl = (url?: string | null) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `https://${url}`;
  };

  if (loading) {
    return (
      <Flex justify="center" py={20}>
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box py={{ base: 10, md: 16 }} bgGradient={bgGradient}>
      <Container maxW="7xl" textAlign="center" mb={10}>
        <Heading
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          color={titleColor}
          mb={10}
        >
          {title}
        </Heading>

        <Box
          dangerouslySetInnerHTML={{ __html: description }}
          style={{ color: textColor, fontSize: "18px" }}
          textAlign="justify"
        />
      </Container>

      {/* ===== TEAM GRID ===== */}
      <Container maxW="7xl">
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={10}>
          {displayedMembers.map((m) => (
            <Box
              key={m.id}
              p={{ base: 4, md: 6 }}
              bg={cardBg}
              rounded="xl"
              shadow="md"
              cursor="pointer"
              onClick={() => openModal(m)}
              position="relative"
              overflow="hidden"
              transition="0.4s"
              _hover={{
                transform: "translateY(-6px)",
              }}
              // Animated border effect
              _before={{
                content: '""',
                position: "absolute",
                inset: 0,
                padding: "2px",
                borderRadius: "14px",
                background:
                  "linear-gradient(90deg, #0fb9b1, #6a11cb, #2575fc, #0fb9b1)",
                backgroundSize: "300% 300%",
                animation: "borderMove 4s ease infinite",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            >
              <VStack spacing={2} align="center" flex="1">
                <Image
                  src={m.thumb || fallbackImage}
                  alt={m.name}
                  boxSize={{ base: "90px", md: "120px" }}
                  objectFit="cover"
                  rounded="full"
                  border="3px teal solid"
                />

                <Heading fontSize="lg" color={titleColor} textAlign="center">
                  {m.name}
                </Heading>

                {m.meta_name && (
                  <Text
                    fontSize="sm"
                    fontWeight="semibold"
                    color={metaColor}
                    textAlign="center"
                  >
                    {m.meta_name}
                  </Text>
                )}

                <Text
                  fontSize="md"
                  color={textColor}
                  textAlign="center"
                  noOfLines={2}
                >
                  {getFirstSentence(m.details)}
                </Text>
              </VStack>

              {/* SOCIAL ICONS */}
              <Flex mt={4} gap={3} align="center" justify="center">
                {m.facebook && (
                  <Link
                    href={normalizeUrl(m.facebook)}
                    isExternal
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Flex
                      w={10}
                      h={10}
                      bg="#1877F2"
                      rounded="full"
                      align="center"
                      justify="center"
                      _hover={{ transform: "scale(1.1)" }}
                    >
                      <Icon as={FaFacebookF} color="white" boxSize={5} />
                    </Flex>
                  </Link>
                )}

                {m.instagram && (
                  <Link
                    href={normalizeUrl(m.instagram)}
                    isExternal
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Flex
                      w={10}
                      h={10}
                      bg="#E1306C"
                      rounded="full"
                      align="center"
                      justify="center"
                      _hover={{ transform: "scale(1.1)" }}
                    >
                      <Icon as={FaInstagram} color="white" boxSize={5} />
                    </Flex>
                  </Link>
                )}
              </Flex>
            </Box>
          ))}
        </SimpleGrid>

        {/* Pagination */}
        {showPagination && totalPages > 1 && (
          <Flex justify="center" mt={10} gap={4}>
            <Button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Text>
              Page {page} of {totalPages}
            </Text>
            <Button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </Flex>
        )}

        {/* View More */}
        {!showAll && (
          <Flex justify="right" mt={12}>
            <Link
              as={RouterLink}
              to="/our-team-page"
              color="teal.600"
              fontWeight="bold"
              fontSize="lg"
            >
              View More →
            </Link>
          </Flex>
        )}
      </Container>

      {/* ===== MODAL WITH ANIMATION ===== */}
      {selected && (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
          <ModalOverlay />

          <ModalContent
            as={motion.div}
            variants={modalAnim}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ModalHeader textAlign="center">{selected.name}</ModalHeader>
            <ModalCloseButton />

            <ModalBody pb={6}>
              <Flex justify="center" mb={4}>
                <Image
                  src={selected.thumb || fallbackImage}
                  alt={selected.name}
                  boxSize="140px"
                  rounded="full"
                  border="3px solid teal"
                />
              </Flex>

              {selected.meta_name && (
                <Text
                  textAlign="center"
                  fontWeight="bold"
                  color={metaColor}
                  mb={3}
                >
                  {selected.meta_name}
                </Text>
              )}

              <Box
                dangerouslySetInnerHTML={{ __html: selected.details }}
                style={{ color: textColor, fontSize: "16px" }}
                textAlign="justify"
              />

              {/* SOCIAL ICONS */}
              <Flex mt={6} gap={6} justify="center">
                {selected.facebook && (
                  <Link href={normalizeUrl(selected.facebook)} isExternal>
                    <Flex
                      w={12}
                      h={12}
                      bg="#1877F2"
                      rounded="full"
                      align="center"
                      justify="center"
                    >
                      <Icon as={FaFacebookF} color="white" boxSize={6} />
                    </Flex>
                  </Link>
                )}

                {selected.instagram && (
                  <Link href={normalizeUrl(selected.instagram)} isExternal>
                    <Flex
                      w={12}
                      h={12}
                      bg="#E1306C"
                      rounded="full"
                      align="center"
                      justify="center"
                    >
                      <Icon as={FaInstagram} color="white" boxSize={6} />
                    </Flex>
                  </Link>
                )}
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default OurTeam;
