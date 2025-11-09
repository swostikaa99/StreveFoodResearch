import { Box, Heading, Text } from "@chakra-ui/react";
import Footer from "./Layout/Footer";
// import Home from "./Pages/Home";
import AllRoutes from "./AllRoutes";
import Header from "./Layout/Header";

function App() {
  return (
    <div>
      <Box>
        {/* <Header /> */}

        <AllRoutes />
        {/* <Home /> */}
        {/* <Footer /> */}
      </Box>
    </div>
  );
}

export default App;
