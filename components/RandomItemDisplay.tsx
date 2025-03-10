"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import {
  Box,
  Text,
  Button,
  Stack,
  Heading,
  Link as ChakraLink,
  Spinner,
} from "@chakra-ui/react";

interface RandomItemDisplayProps {
  product: {
    name: string;
    price: number;
    releaseDate: string;
    btcPrice: number;
  };
}

const roastingMessages = [
  "Ouch! That purchase aged like milk in the sun! 🥛",
  "Hope that gadget was worth missing the crypto train! 🚂",
  "Plot twist: Your FOMO is showing! 😅",
  "Congratulations, you played yourself! 🎮",
  "In the game of investments, you chose... poorly. 🎲",
  "That's a lot of pizza money you could have HODLed! 🍕",
  "Your wallet is crying in Bitcoin! 💰",
  "This is what financial regret looks like! 😭",
];

export default function RandomItemDisplay({ product }: RandomItemDisplayProps) {
  const [currentValue, setCurrentValue] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [roastMessage] = useState(() => {
    const randomIndex = Math.floor(Math.random() * roastingMessages.length);
    return roastingMessages[randomIndex];
  });

  useEffect(() => {
    const fetchCurrentBitcoinPrice = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
        );
        const currentBtcPrice = response.data.bitcoin.usd;

        const bitcoinAmount = product.price / product.btcPrice;
        const calculatedCurrentValue = bitcoinAmount * currentBtcPrice;
        setCurrentValue(calculatedCurrentValue);
      } catch (err) {
        setError("Failed to fetch current Bitcoin price. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentBitcoinPrice();
  }, [product.price, product.btcPrice]);

  if (isLoading)
    return (
      <Box textAlign="center" py={8}>
        <Spinner size="xl" color="white" />
      </Box>
    );

  if (error)
    return (
      <Box textAlign="center" color="white" py={8}>
        {error}
      </Box>
    );

  const percentageChange = currentValue
    ? ((currentValue - product.price) / product.price) * 100
    : 0;
  const isGain = percentageChange >= 0;

  const formattedReleaseDate = format(
    new Date(product.releaseDate),
    "MMMM dd, yyyy"
  );
  const formattedOriginalPrice = product.price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  const formattedCurrentValue = currentValue
    ? currentValue.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
      })
    : "N/A";

  return (
    <Box
      bg="brand.secondary"
      p={6}
      rounded="lg"
      shadow="lg"
      borderWidth={1}
      borderColor="brand.primary"
      maxW="md"
      mx="auto"
    >
      <Stack spacing={4} align="stretch">
        <Heading as="h2" size="lg" color="brand.dark">
          Time Machine Revelation! 🚀
        </Heading>

        <Text color="brand.dark">
          Remember buying that {product.name} back in {formattedReleaseDate}?
          Your{" "}
          <Text as="span" fontWeight="bold">
            {formattedOriginalPrice}
          </Text>{" "}
          could have been worth{" "}
          <Text
            as="span"
            fontWeight="bold"
            color={isGain ? "green.600" : "red.600"}
          >
            {formattedCurrentValue}
          </Text>{" "}
          in Bitcoin today!
        </Text>

        <Text fontWeight="bold" color="brand.dark">
          {roastMessage}
        </Text>

        <ChakraLink
          href="https://www.coinbase.com"
          isExternal
          _hover={{ textDecoration: "none" }}
        >
          <Button
            w="full"
            bg="brand.primary"
            color="white"
            _hover={{ bg: "brand.dark" }}
            transition="all 0.2s"
          >
            Buy Bitcoin Now & HODL! 🌟
          </Button>
        </ChakraLink>
      </Stack>
    </Box>
  );
}
