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
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

interface OurTeamProps {
  showAll?: boolean;
  showPagination?: boolean;
}

interface TeamMember {
  id: number;
  name: string;
  alias: string;
  details: string;
  thumb: string | null;
}

const defaultImage = "https://cdn-icons-png.flaticon.com/512/847/847969.png";

const OurTeam = ({ showAll = false, showPagination = false }: OurTeamProps) => {
  const bgGradient = useColorModeValue(
    "linear(to-b, gray.50, teal.50)",
    "linear(to-b, gray.900, teal.900)"
  );
  const cardBg = useColorModeValue("white", "gray.800");
  const textCol = useColorModeValue("gray.600", "gray.300");
  const titleCol = useColorModeValue("gray.800", "white");

  const itemsPerPage = 6;
  const homeLimit = 3;

  const [currentPage, setCurrentPage] = useState(1);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [mainTitle, setMainTitle] = useState("");
  const [mainDescription, setMainDescription] = useState("");
  const [loading, setLoading] = useState(true);

  const totalPages = Math.ceil(members.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const displayedMembers = showAll
    ? showPagination
      ? members.slice(startIndex, startIndex + itemsPerPage)
      : members
    : members.slice(0, homeLimit);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/page/alias/teams");
        const json = await res.json();

        setMainTitle(json.data.title || "Our Team");
        setMainDescription(json.data.details || "");
        setMembers(json.data.children || []);
        setLoading(false);
      } catch (error) {
        console.error("Error loading team:", error);
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  if (loading) {
    return (
      <Flex justify="center" py={20}>
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box py={{ base: 10, md: 16 }} bgGradient={bgGradient} overflow={"hidden"}>
      <Container maxW="7xl" textAlign="center" mb={{ base: 6, md: 10 }}>
        <Heading fontSize={{ base: "2xl", md: "3xl" }} color={titleCol} mb={4}>
          {mainTitle}
        </Heading>

        <Box
          dangerouslySetInnerHTML={{ __html: mainDescription }}
          style={{ color: textCol, fontSize: "18px" }}
        />
      </Container>

      <Container maxW="7xl" px={{ base: 4, md: 0 }}>
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3 }}
          spacing={{ base: 6, md: 10 }}
        >
          {displayedMembers.map((member) => (
            <Box
              key={member.id}
              p={{ base: 4, md: 6 }}
              bg={cardBg}
              rounded="xl"
              shadow="md"
              transition="0.3s"
              _hover={{ shadow: "xl", transform: "translateY(-6px)" }}
            >
              <VStack spacing={4}>
                <Image
                  src={
                    member.thumb && member.thumb !== ""
                      ? member.thumb
                      : defaultImage
                  }
                  alt={member.name}
                  boxSize={{ base: "90px", md: "120px" }}
                  objectFit="cover"
                  rounded="full"
                  border="3px solid #ddd"
                />

                <Heading fontSize={{ base: "md", md: "lg" }} color={titleCol}>
                  {member.name}
                </Heading>

                <Box
                  fontSize={{ base: "sm", md: "md" }}
                  color={textCol}
                  textAlign="center"
                  dangerouslySetInnerHTML={{ __html: member.details }}
                />
              </VStack>
            </Box>
          ))}
        </SimpleGrid>

        {showPagination && totalPages > 1 && (
          <Flex
            justify="center"
            mt={10}
            gap={4}
            direction={{ base: "column", sm: "row" }}
            align="center"
          >
            <Button
              width={{ base: "100%", sm: "auto" }}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              isDisabled={currentPage === 1}
            >
              Previous
            </Button>

            <Text fontSize={{ base: "sm", md: "md" }}>
              Page {currentPage} of {totalPages}
            </Text>

            <Button
              width={{ base: "100%", sm: "auto" }}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              isDisabled={currentPage === totalPages}
            >
              Next
            </Button>
          </Flex>
        )}

        {!showAll && (
          <Flex justify="right" mt={12}>
            <Link
              as={RouterLink}
              to="/our-team-page"
              color="teal.600"
              fontWeight="semibold"
              fontSize={{ base: "md", md: "lg" }}
              _hover={{ textDecoration: "underline", color: "teal.800" }}
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
