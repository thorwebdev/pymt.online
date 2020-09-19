import Layout from "../components/Layout";
import Hero from "../components/Hero";
import { Flex, Box } from "@chakra-ui/core";
import Instructions from "../components/Instructions";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Flex p={5} align="center" justify="center">
        <Box maxWidth="1000px">
          <Instructions />
        </Box>
      </Flex>
    </Layout>
  );
}
