import React from 'react';

const TruncatedCell = ({ text }: { text: string }) => {
  const maxLength = 20;

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert('Copied to clipboard');
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  const truncateMiddle = (str: string, maxLength: number) => {
    const strLength = str.length;
    if (strLength <= maxLength) return str;
    const partLength = Math.floor(maxLength / 2);
    return str.substring(0, partLength) + '...' + str.substring(strLength - partLength, strLength);
  };

  const truncatedText = truncateMiddle(text, maxLength);
  return (
    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500" title={text} onClick={copyToClipboard} style={{ cursor: 'pointer' }}>
      {truncatedText}
    </td>
  );
};

export default TruncatedCell;
