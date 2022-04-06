import { Box, BoxProps } from "theme-ui";

type MaxWidthWrapperProps = BoxProps;

export function MaxWidthWrapper({ children, ...props }: MaxWidthWrapperProps) {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 768,
        mx: "auto",
        px: 5,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}
