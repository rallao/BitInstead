"use client";

import { useMemo, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Text,
  Tooltip,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

interface TimelineProps {
  products: Array<{
    name: string;
    releaseDate: string;
    price: number;
    btcPrice: number;
  }>;
  onSelectProduct: (product: TimelineProps["products"][0]) => void;
}

export default function Timeline({ products, onSelectProduct }: TimelineProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const sortedProducts = useMemo(() => {
    return [...products].sort(
      (a, b) =>
        new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
    );
  }, [products]);

  const startDate = new Date(sortedProducts[0].releaseDate);
  const endDate = new Date(
    sortedProducts[sortedProducts.length - 1].releaseDate
  );
  const timelineLength = endDate.getTime() - startDate.getTime();

  const getPositionPercentage = (date: string) => {
    const currentDate = new Date(date);
    const position = currentDate.getTime() - startDate.getTime();
    return (position / timelineLength) * 100;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const handleScroll = (direction: "left" | "right") => {
    const container = document.getElementById("timeline-container");
    if (container) {
      const scrollAmount = direction === "left" ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setScrollPosition(container.scrollLeft + scrollAmount);
    }
  };

  return (
    <Box position="relative" w="full" mb={12}>
      {/* Navigation Buttons */}
      {!isMobile && (
        <Box>
          <IconButton
            aria-label="Scroll left"
            icon={<ChevronLeftIcon />}
            onClick={() => handleScroll("left")}
            position="absolute"
            left={-4}
            top="50%"
            transform="translateY(-50%)"
            zIndex={10}
            rounded="full"
            variant="solid"
          />
          <IconButton
            aria-label="Scroll right"
            icon={<ChevronRightIcon />}
            onClick={() => handleScroll("right")}
            position="absolute"
            right={-4}
            top="50%"
            transform="translateY(-50%)"
            zIndex={10}
            rounded="full"
            variant="solid"
          />
        </Box>
      )}

      {/* Timeline Container */}
      <Box
        id="timeline-container"
        w="full"
        overflowX="auto"
        pb={16}
        className="hide-scrollbar"
      >
        <Box
          minW={["1200px", null, "2000px"]}
          mx={[8, null, 12]}
          position="relative"
        >
          {/* Timeline base line */}
          <Box h="1px" bg="white" rounded="full" position="relative">
            {/* Year markers */}
            {Array.from(
              new Set(
                sortedProducts.map((p) => new Date(p.releaseDate).getFullYear())
              )
            ).map((year) => (
              <Text
                key={year}
                position="absolute"
                top={4}
                transform="translateX(-50%)"
                color="whiteAlpha.500"
                fontSize="xs"
                left={`${getPositionPercentage(`${year}-01-01`)}%`}
              >
                {year}
              </Text>
            ))}

            {/* Timeline points */}
            {sortedProducts.map((product) => {
              const position = getPositionPercentage(product.releaseDate);
              return (
                <Box
                  key={`${product.name}-${product.releaseDate}`}
                  position="absolute"
                  transform="translateX(-50%)"
                  left={`${position}%`}
                >
                  <Tooltip
                    hasArrow
                    label={
                      <Box>
                        <Text fontWeight="bold">{product.name}</Text>
                        <Text fontSize="xs">
                          {formatDate(product.releaseDate)}
                        </Text>
                      </Box>
                    }
                    placement="top"
                    bg="white"
                    color="brand.primary"
                  >
                    <Button
                      onClick={() => onSelectProduct(product)}
                      w={5}
                      h={5}
                      p={0}
                      minW={0}
                      rounded="full"
                      bg="white"
                      border="4px solid"
                      borderColor="brand.primary"
                      _hover={{
                        bg: "brand.secondary",
                        borderColor: "white",
                        transform: "scale(1.25)",
                      }}
                      transition="all 0.2s"
                    />
                  </Tooltip>

                  <Text
                    position="absolute"
                    top={8}
                    left="50%"
                    transform="translateX(-50%) rotate(45deg)"
                    color="white"
                    fontSize="xs"
                    opacity={0.75}
                    _hover={{ opacity: 1 }}
                    transition="opacity 0.2s"
                  >
                    {formatDate(product.releaseDate)}
                  </Text>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>

      {/* Mobile scroll hint */}
      {isMobile && (
        <Text
          textAlign="center"
          color="white"
          fontSize="sm"
          mt={4}
          opacity={0.75}
        >
          ← Swipe timeline to explore →
        </Text>
      )}
    </Box>
  );
}
