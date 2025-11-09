import ServicesSection from "../Components/ServiceSection";
import PageWrapper from "../Layout/Pagewrapper";

const ServicesPage = () => {
  return (
    <PageWrapper>
      <ServicesSection showAll={true} showPagination={true} />
    </PageWrapper>
  );
};

export default ServicesPage;
