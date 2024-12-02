export const handleCopy = (text , setCopy) => {
  navigator.clipboard.writeText(text);
  if (navigator.clipboard.writeText(text)) {
    setCopy(true);
  }
};
