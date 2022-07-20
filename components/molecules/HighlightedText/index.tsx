import { chakra, Text, TextProps } from '@chakra-ui/react';
import { FC } from 'react';

export interface HighlightedTextProps extends TextProps {
  text: string;
  pattern: string;
}

const escapeChars = (text: string) => {
  return text.replace(/[.**?^${}()\[\]\\]/g, '\\$&');
};

export const HighlightedText: FC<HighlightedTextProps> = ({
  text,
  pattern: _pattern,
  ...props
}) => {
  const pattern = new RegExp(`${escapeChars(_pattern)}`, 'gi');
  const splitByPattern = text.split(pattern);
  const matches = text.match(pattern);

  const results = splitByPattern.reduce(
    (content: (string | JSX.Element)[], currentString: string, i: number) => {
      content.push(currentString);
      if (matches?.[i]) {
        content.push(
          <chakra.span key={i.toString()} fontWeight="bold">
            {matches[i]}
          </chakra.span>,
        );
      }
      return content;
    },
    [],
  );

  return <Text {...props}>{results}</Text>;
};
