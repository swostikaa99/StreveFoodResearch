import BlogsSection from "../Components/BlogSection";
import PageWrapper from "../Layout/Pagewrapper";

const BlogsPage = () => {
  return (
    <PageWrapper>
      <BlogsSection showAll={true} showPagination={true} />
    </PageWrapper>
  );
};

export default BlogsPage;
