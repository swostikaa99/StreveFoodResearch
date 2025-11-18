import React from "react";
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
import OurTeamPage from "./Pages/OurTeamPage";
import Project from "./Pages/Project";
import ImageCategoryPage from "./Pages/ImageCategoryPage";
// import ProjectId from "./Components/ProjectId";
export default function AllRoutes() {
  return (
    <div>
      {" "}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Service />} />
        <Route path="/images" element={<Image />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/Testimonial" element={<Testimonial />} />
        <Route path="/Impacts" element={<Impacts />} />
        <Route path="/our-team-page" element={<OurTeamPage />} />
        <Route path="/ServiceId/:id" element={<ServiceId />} />
        <Route path="/project" element={<Project />} />
        <Route path="/images/:alias" element={<ImageCategoryPage />} />

        {/* <Route path="/project/:alias" element={<ProjectId />} /> */}

        {/* 
               <Route path="/register" element={<Register />} />
       
                <Route path="/blogs/:id" element={<BlogDetailPage />} /> */}
      </Routes>
    </div>
  );
}
