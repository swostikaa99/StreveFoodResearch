import BlogsSection from "../Components/BlogsSection";
import PageWrapper from "../Layout/Pagewrapper";

const BlogsPage = () => {
  return (
    <PageWrapper>
      <BlogsSection showAll={true} showPagination={true} />
    </PageWrapper>
  );
};

export default BlogsPage;
