import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  VStack,
  Button,
  Flex,
  Icon,
  Spinner,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

interface TeamMember {
  id: number;
  name: string;
  alias: string;
  details: string;
  thumb: string | null;
  facebook?: string | null;
  instagram?: string | null;
}

const fallbackImage = "https://cdn-icons-png.flaticon.com/512/847/847969.png";

const TeamId = () => {
  const { alias } = useParams(); // <-- using alias instead of id
  const [member, setMember] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);

  const titleColor = useColorModeValue("gray.800", "white");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const cardBg = useColorModeValue("white", "gray.800");

  const normalizeUrl = (url?: string | null) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `https://${url}`;
  };

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/page/alias/teams");
        const json = await res.json();

        // find member by alias
        const found = json.data.children.find(
          (item: any) => item.alias === alias
        );

        setMember(found);
      } catch (err) {
        console.error("Error fetching member:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [alias]);

  if (loading) {
    return (
      <Flex justify="center" py={20}>
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (!member) {
    return (
      <Flex justify="center" py={20}>
        <Heading>No team member found</Heading>
      </Flex>
    );
  }

  return (
    <Box py={16}>
      <Container maxW="5xl">
        {/* Back Button */}
        <Button as={RouterLink} to="/our-team-page" mb={8} colorScheme="teal">
          ← Back to Team
        </Button>

        <Flex
          bg={cardBg}
          p={8}
          rounded="xl"
          shadow="md"
          gap={10}
          direction={{ base: "column", md: "row" }}
          align="flex-start"
        >
          {/* Image */}
          <Image
            src={member.thumb || fallbackImage}
            alt={member.name}
            boxSize={{ base: "180px", md: "220px" }}
            objectFit="cover"
            rounded="full"
            border="4px solid teal"
            mx="auto"
          />

          {/* Info */}
          <VStack align="start" spacing={4} flex="1">
            <Heading color={titleColor}>{member.name}</Heading>

            <Box
              fontSize="18px"
              color={textColor}
              textAlign="justify"
              dangerouslySetInnerHTML={{ __html: member.details }}
            />

            {/* Social Icons */}
            <Flex gap={4} mt={4}>
              {member.facebook && (
                <Button bg="blue.500" w={10} h={10} rounded="full">
                  <Link href={normalizeUrl(member.facebook)} isExternal>
                    <Icon as={FaFacebookF} color="white" boxSize={5} />
                  </Link>
                </Button>
              )}

              {member.instagram && (
                <Button bg="pink.600" w={10} h={10} rounded="full">
                  <Link href={normalizeUrl(member.instagram)} isExternal>
                    <Icon as={FaInstagram} color="white" boxSize={5} />
                  </Link>
                </Button>
              )}
            </Flex>
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default TeamId;
