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
} from "@chakra-ui/react";
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
  details: string;
  thumb: string | null;
  facebook?: string | null;
  instagram?: string | null;
}

const fallbackImage = "https://cdn-icons-png.flaticon.com/512/847/847969.png";

const OurTeam = ({ showAll = false, showPagination = false }: OurTeamProps) => {
  const bgGradient = useColorModeValue(
    "linear(to-b, gray.50, teal.50)",
    "linear(to-b, gray.900, teal.900)"
  );
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const titleColor = useColorModeValue("gray.800", "white");

  // States
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [title, setTitle] = useState("Our Team");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  // Pagination
  const itemsPerPage = 6;
  const homeLimit = 3;
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(members.length / itemsPerPage);

  // Members visible to user
  const displayedMembers = showAll
    ? showPagination
      ? members.slice((page - 1) * itemsPerPage, page * itemsPerPage)
      : members
    : members.slice(0, homeLimit);

  // Fetch Data
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/page/alias/teams"
        );
        const json = await response.json();

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

  // Extract first sentence from HTML
  const getFirstSentence = (html?: string) => {
    if (!html) return "";

    const text = new DOMParser()
      .parseFromString(html, "text/html")
      .body.textContent?.trim();

    const match = text?.match(/[^.!?]+[.!?]/);
    return match ? match[0] : text || "";
  };

  // Normalize social link URLs
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
      {/* Page Title + Description */}
      <Container maxW="7xl" textAlign="center" mb={10}>
        <Heading
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          color={titleColor}
        >
          {title}
        </Heading>

        <Box
          dangerouslySetInnerHTML={{ __html: description }}
          style={{ color: textColor, fontSize: "18px" }}
          textAlign="justify"
        />
      </Container>

      {/* Team Grid */}
      <Container maxW="7xl">
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={10}>
          {displayedMembers.map((m) => (
            <Box
              key={m.id}
              p={{ base: 4, md: 6 }}
              bg={cardBg}
              rounded="xl"
              shadow="md"
              transition="0.3s"
              _hover={{ shadow: "xl", transform: "translateY(-6px)" }}
              display="flex"
              flexDirection="column"
              h="100%"
            >
              {/* main content grows to push icons to bottom */}
              <VStack spacing={4} align="center" flex="1">
                <Image
                  src={m.thumb || fallbackImage}
                  alt={m.name}
                  boxSize={{ base: "90px", md: "120px" }}
                  objectFit="cover"
                  rounded="full"
                  border="3px teal solid"
                  mx="auto"
                />

                <Heading
                  fontSize="lg"
                  color={titleColor}
                  minH={{ base: "2.8rem", md: "3.6rem" }}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                  noOfLines={2}
                >
                  {m.name}
                </Heading>

                <Text
                  fontSize="md"
                  color={textColor}
                  textAlign="center"
                  noOfLines={2}
                >
                  {getFirstSentence(m.details)}
                </Text>
              </VStack>

              {/* icon row anchored to bottom; fixed-size slots keep horizontal alignment */}
              <Flex mt={4} gap={3} align="center" justify="center">
                <Button
                 bgColor={"blue.500"}
                  w={8}
                  h={8}
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {m.facebook ? (
                    <Link
                      href={normalizeUrl(m.facebook)}
                      isExternal
                      aria-label={`${m.name} Facebook`}
                    >
                      <Icon as={FaFacebookF} boxSize={5} color="white" />
                    </Link>
                  ) : (
                    <Box w={5} h={5} />
                  )}
                </Button>

                <Button
                 bgColor={"pink.600"}
                  w={8}
                  h={8}
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                 
                >
                  {m.instagram ? (
                    <Link
                      href={normalizeUrl(m.instagram)}
                      isExternal
                      aria-label={`${m.name} Instagram`}
                    >
                      <Icon as={FaInstagram} boxSize={5} color="white" />
                    </Link>
                  ) : (
                    <Box w={5} h={5} />
                  )}
                </Button>
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

        {/* View More Button */}
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
    </Box>
  );
};

export default OurTeam;
