import "vuetify/styles";
import {createVuetify} from "vuetify";
import {md3} from "vuetify/blueprints";
import {aliases, mdi} from "vuetify/iconsets/mdi-svg";

export const lightTheme = {
  dark: false,
  colors: {
    background: "#ffffff",
    surface: "#ffffff",
    primary: "#212121",
    secondary: "#424242",
    accent: "#EFC606",
    accentDarker: "#826C02",
    success: "#009688",
    grey: "#616161",
    error: "#FF5252",
    info: "#2196F3",
    infoLight: "#BBDEFB",
    infoLighter: "#E3F2FD",
    warning: "#FFC107",
    // Colour Palette
    colourPalette0: "#2196F3",
    colourPalette1: "#DC143C",
    colourPalette2: "#FF4500",
    colourPalette3: "#FFA500",
    colourPalette4: "#FFD700",
  },
};

export default createVuetify({
  blueprint: md3,
  // Override default component properties
  defaults: {
    VAlert: {
      border: true,
      variant: "tonal",
    },
    VCheckbox: {
      color: "primary",
      persistentHint: true,
    },
    VChip: {
      rounded: "pill",
    },
    VPagination: {
      density: "compact",
      totalVisible: 5,
    },
    VProgressCircular: {
      color: "primary",
    },
    VSelect: {
      color: "primary",
      persistentHint: true,
    },
    VSwitch: {
      color: "primary",
      inset: true,
      persistentHint: true,
      style: "--v-input-control-height: unset;",
    },
    VTextField: {
      color: "primary",
      persistentHint: true,
      variant: "outlined",
    },
    VTextarea: {
      color: "primary",
      persistentHint: true,
      variant: "outlined",
    },
    VCard: {
      elevation: 0,
    },
    VBtn: {
      rounded: false,
      //@ts-ignore
      style: ({props}) => ({
        cursor: props.disabled ? "not-allowed" : "pointer",
      }),
    },
    VTooltip: {
      location: "top",
    },
    VImg: {
      transition: false,
    },
    VExpansionPanel: {
      elevation: 0,
    },
    VExpandTransition: {
      appear: true,
    },
    VFadeTransition: {
      mode: "out-in",
      hideOnLeave: true,
    },
    VAutocomplete: {
      density: "compact",
      variant: "outlined",
    },
  },
  display: {
    mobileBreakpoint: "md",
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: "light",
    themes: {
      light: lightTheme,
    },
  },
});
