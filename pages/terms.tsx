import Layout from "../components/Layout";
import Hero from "../components/Hero";
import {
  Flex,
  Box,
  Heading,
  Text,
  Stack,
  Link,
  Icon,
  List,
  ListItem,
} from "@chakra-ui/core";

export default function Terms() {
  return (
    <Layout>
      <Hero />
      <Flex p={5} align="center" justify="center">
        <Box maxWidth="1000px">
          <Stack spacing={5}>
            <Heading as="h1" size="xl">
              Terms and Conditions ("Terms")
            </Heading>
            <Text>Last updated: Sep 19, 2020</Text>
            <Text>
              Please read these Terms and Conditions ("Terms", "Terms and
              Conditions") carefully before using the https://pymt.online/
              website (the "Service") operated by PYMT.ONLINE ("us", "we", or
              "our"). Your access to and use of the Service is conditioned on
              your acceptance of and compliance with these Terms. These Terms
              apply to all visitors, users and others who access or use the
              Service. By accessing or using the Service you agree to be bound
              by these Terms. If you disagree with any part of the terms then
              you may not access the Service.
            </Text>
            <Heading as="h2" size="lg">
              Links To Other Websites
            </Heading>
            <Text>
              Our Service may contain links to third-party web sites or services
              that are not owned or controlled by PYMT.ONLINE. PYMT.ONLINE has
              no control over, and assumes no responsibility for, the content,
              privacy policies, or practices of any third party web sites or
              services. You further acknowledge and agree that PYMT.ONLINE shall
              not be responsible or liable, directly or indirectly, for any
              damage or loss caused or alleged to be caused by or in connection
              with use of or reliance on any such content, goods or services
              available on or through any such web sites or services. We
              strongly advise you to read the terms and conditions and privacy
              policies of any third-party web sites or services that you visit.
            </Text>
            <Heading as="h2" size="lg">
              Governing Law
            </Heading>
            <Text>
              The laws of Singapore, excluding its conflicts of law rules, shall
              govern this Terms and Your use of the Service. Your use of the
              Application may also be subject to other local, state, national,
              or international laws.
            </Text>
            <Heading as="h2" size="lg">
              Disputes Resolution
            </Heading>
            <Text>
              If You have any concern or dispute about the Service, You agree to
              first try to resolve the dispute informally by contacting
              PYMT.ONLINE.
            </Text>
            <Heading as="h2" size="lg">
              For European Union (EU) Users
            </Heading>
            <Text>
              If You are a European Union consumer, you will benefit from any
              mandatory provisions of the law of the country in which you are
              resident in.
            </Text>
            <Heading as="h2" size="lg">
              United States Legal Compliance
            </Heading>
            <Text>
              You represent and warrant that (i) You are not located in a
              country that is subject to the United States government embargo,
              or that has been designated by the United States government as a
              &quot;terrorist supporting&quot; country, and (ii) You are not
              listed on any United States government list of prohibited or
              restricted parties.
            </Text>
            <Heading as="h2" size="lg">
              Severability
            </Heading>
            <Text>
              If any provision of these Terms is held to be unenforceable or
              invalid, such provision will be changed and interpreted to
              accomplish the objectives of such provision to the greatest extent
              possible under applicable law and the remaining provisions will
              continue in full force and effect.
            </Text>
            <Heading as="h2" size="lg">
              Waiver
            </Heading>
            <Text>
              Except as provided herein, the failure to exercise a right or to
              require performance of an obligation under this Terms shall not
              effect a party's ability to exercise such right or require such
              performance at any time thereafter nor shall be the waiver of a
              breach constitute a waiver of any subsequent breach.
            </Text>
            <Heading as="h2" size="lg">
              Changes to These Terms and Conditions
            </Heading>
            <Text>
              We reserve the right, at Our sole discretion, to modify or replace
              these Terms at any time. If a revision is material We will make
              reasonable efforts to provide at least 30 days' notice prior to
              any new terms taking effect. What constitutes a material change
              will be determined at Our sole discretion.
            </Text>
            <Text>
              By continuing to access or use Our Service after those revisions
              become effective, You agree to be bound by the revised terms. If
              You do not agree to the new terms, in whole or in part, please
              stop using the website and the Service.
            </Text>
            <Heading as="h2" size="lg">
              Refunds
            </Heading>
            <Text>
              Refunds are provided only for defective goods. If you have a
              problem with your order please contact the respective seller
              directly. Their contact details are listed on your email receipt.
            </Text>
            <Heading as="h2" size="lg">
              Privacy Policy
            </Heading>
            <Text>
              This site collects no personal data other than when an order is
              placed. Data collected during checkout is collected by Stripe in
              accordance with their terms and privacy policy linked on the
              checkout page. We keep the data associated with your order solely
              for the purposes of processing the order and potentially providing
              refunds. We will never share your personal information with third
              parties. This site does not use cookies.
            </Text>
            <Heading as="h2" size="lg">
              Contact Us
            </Heading>
            <Text>
              If you have any questions about these Terms, please{" "}
              <Link
                textDecoration="underline"
                isExternal
                href="https://twitter.com/pymt_online"
              >
                contact us. <Icon name="external-link" mx="2px" />
              </Link>
            </Text>
            <Heading as="h2" size="lg">
              Credits
            </Heading>
            <List styleType="disc">
              <ListItem>
                Thank you{" "}
                <Link
                  textDecoration="underline"
                  isExternal
                  href="https://trag.dev"
                >
                  Chris Trag <Icon name="external-link" mx="2px" />
                </Link>{" "}
                for your help with the artwork ❤️
              </ListItem>
              <ListItem>
                Icon in logo made by{" "}
                <Link
                  textDecoration="underline"
                  isExternal
                  href="https://www.flaticon.com/authors/freepik"
                >
                  Freepik <Icon name="external-link" mx="2px" />
                </Link>
              </ListItem>
            </List>
          </Stack>
        </Box>
      </Flex>
    </Layout>
  );
}
