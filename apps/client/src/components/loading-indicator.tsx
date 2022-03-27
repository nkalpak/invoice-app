import { Box, Spinner } from "theme-ui";

export function RelativeLoadingIndicator() {
  return (
    <Box
      sx={{
        backgroundColor: "rgba(255,255,255,0.85)",
        height: "100%",
        width: "100%",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spinner size={16} />
    </Box>
  );
}
