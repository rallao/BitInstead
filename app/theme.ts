import { extendTheme } from "@chakra-ui/react";
import type { ThemeConfig } from "@chakra-ui/theme";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  styles: {
    global: {
      body: {
        bg: "#f39c12",
        color: "#5a3511",
      },
    },
  },
  colors: {
    brand: {
      primary: "#f39c12",
      secondary: "#f7b750",
      dark: "#5a3511",
      light: "#ffffff",
    },
  },
  components: {
    Button: {
      variants: {
        solid: {
          bg: "white",
          color: "#f39c12",
          _hover: {
            bg: "#f7b750",
            color: "white",
          },
        },
        outline: {
          borderColor: "white",
          color: "white",
          _hover: {
            bg: "whiteAlpha.200",
          },
        },
      },
    },
    Tooltip: {
      baseStyle: {
        bg: "white",
        color: "#f39c12",
        fontSize: "sm",
        px: 3,
        py: 2,
        borderRadius: "md",
        boxShadow: "lg",
      },
    },
  },
});
