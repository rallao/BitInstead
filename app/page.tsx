"use client";

import { useState } from "react";
import { products } from "../data/products";
import RandomItemDisplay from "../components/RandomItemDisplay";
import Timeline from "../components/Timeline";
import { Box, Container, Heading, Text } from "@chakra-ui/react";

interface Product {
  name: string;
  releaseDate: string;
  price: number;
  btcPrice: number;
}

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <Box as="main" minH="100vh" bg="brand.primary" py={12} px={4}>
      <Container maxW="6xl">
        <Heading as="h1" size="2xl" textAlign="center" mb={4} color="white">
          What If You Bought BTC Instead? 🤔
        </Heading>

        <Text textAlign="center" mb={8} color="white" fontSize="lg">
          Explore the timeline below to see how much your tech purchases could
          have been worth if you had invested in Bitcoin instead!
        </Text>

        <Timeline products={products} onSelectProduct={setSelectedProduct} />

        {selectedProduct && <RandomItemDisplay product={selectedProduct} />}
      </Container>
    </Box>
  );
}
