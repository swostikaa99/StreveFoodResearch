import React from "react";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
} from "@chakra-ui/react";

const FAQ = () => {
  const faqs = [
    {
      question: "Do you offer marketing contracts or relationships?",
      answer:
        "Yes, we provide both short-term and long-term marketing partnerships tailored to your business goals.",
    },
    {
      question: "What kind of marketing efforts do you specialize in?",
      answer:
        "We specialize in digital marketing — including SEO, social media strategy, content marketing, paid ads, and brand growth campaigns.",
    },
    {
      question: "Can I use the demos made by Ewebot?",
      answer:
        "Absolutely! You can use our demos as starting points or full solutions depending on your project needs.",
    },
    {
      question: "What everybody ought to know about digital marketing?",
      answer:
        "Digital marketing is all about connecting with your audience online — using data, creativity, and technology to drive engagement and conversions.",
    },
  ];

  return (
    <Box maxW="800px" mx="auto" py={10} px={4}>
      <Accordion allowToggle>
        {faqs.map((item, index) => (
          <AccordionItem
            key={index}
            border="none"
            mb={4}
            borderRadius="md"
            boxShadow="sm"
            bg="gray.50"
            _expanded={{ bg: "white", boxShadow: "md" }}
          >
            <h2>
              <AccordionButton
                _expanded={{ color: "blue.600", fontWeight: "bold" }}
                py={5}
              >
                <Box flex="1" textAlign="left" fontSize="lg">
                  {index + 1}. {item.question}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={5} color="gray.600" fontSize="md">
              {item.answer}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};

export default FAQ;
