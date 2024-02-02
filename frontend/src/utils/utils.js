export const findProductName = (htmlString) => {
    const match = /<p[^>]*>(.*?)<\/p>/.exec(htmlString);
    if (!match) return "Product name";
  
    let text = match[1].trim();
    if (text.length > 120) {
      text = text.slice(0, 120);
      text = text.slice(0, text.lastIndexOf(" "));
    }
    return text;
  };