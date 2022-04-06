import * as ThemeUi from "theme-ui";

type ButtonProps = ThemeUi.ButtonProps & {
  isLoading?: boolean;
};

function ButtonBase({ isLoading, disabled, children, ...props }: ButtonProps) {
  return (
    <ThemeUi.Button
      {...props}
      disabled={isLoading || disabled}
      sx={{
        fontFamily: "body",
        fontSize: `${12 / 16}rem`,
        fontWeight: "bold",
        py: 3,
        px: 5,
        borderRadius: "24px",

        "&:hover,&:disabled": {
          opacity: 0.8,
        },

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isLoading ? (
        <ThemeUi.Spinner size={14} sx={{ color: "white" }} />
      ) : (
        children
      )}
    </ThemeUi.Button>
  );
}

function PrimaryButton(props: ButtonProps) {
  return (
    <ButtonBase
      {...props}
      sx={{
        backgroundColor: "#7C5DFA",
      }}
    >
      {props.children}
    </ButtonBase>
  );
}

export { PrimaryButton };
