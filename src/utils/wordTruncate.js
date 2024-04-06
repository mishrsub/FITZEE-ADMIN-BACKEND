export const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
  
    if (words.length > wordLimit) {
      const truncatedText = words.slice(0, wordLimit).join(' ');
      return `${truncatedText}....`;
    }
  
    return text;
  }