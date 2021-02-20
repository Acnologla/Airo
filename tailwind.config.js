module.exports = {
    purge: {
      preserveHtmlElements: false,
      content: ["./pages/**.js"]
    },
    darkMode: "media", 
    theme: {
      extend: {
        colors: {
          primary: "#FF6A6A",
          white: "#FFF",
          adjacentWhite: "#E5E9F0",
          secondaryWhite: "#D8DEE9",
          black: "#2E3440",
          lightBlack: "#4C566A",
          adjacentBlack: "#3B4252",
          grey: "#F2F4F8",
          secondaryBlack: "#434C5E"
        },
        fontFamily: {
          default: ['Rubik']
        }
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
}