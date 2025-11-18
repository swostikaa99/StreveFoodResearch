import { Box } from "@chakra-ui/react";
import OurTeam from "../Components/OurTeams";
import PageWrapper from "../Layout/Pagewrapper";
// import Footer from "../Layout/Footer";
// import Header from "../Layout/Header";

export default function OurTeamPage() {
  return (
    <PageWrapper>
      <Box>
        {/* <Header /> */}
        <OurTeam showAll={true} showPagination={true} />
        {/* <Footer /> */}
      </Box>
    </PageWrapper>
  );
}
