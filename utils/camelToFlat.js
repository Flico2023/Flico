export const camelToFlat = (str) => (
    (str = str.replace(/[A-Z]/g, " $&")), str[0].toUpperCase() + str.slice(1)
  );