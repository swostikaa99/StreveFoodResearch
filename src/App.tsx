import { Box, Heading, Text } from "@chakra-ui/react";
import Footer from "./Layout/Footer";
// import Home from "./Pages/Home";
import AllRoutes from "./AllRoutes";
import Header from "./Layout/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Service from "./Pages/Services";
import Contact from "./Pages/Contact";
import Image from "./Pages/Image";
import Blogs from "./Pages/Blogs";
import Testimonial from "./Pages/Testimonial";
import Impacts from "./Pages/Impacts";
import ServiceId from "./Components/ServiceId";

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
