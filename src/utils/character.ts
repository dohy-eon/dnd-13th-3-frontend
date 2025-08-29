export const getCharacterImage = (characterIndex?: number): string => {
  // Default to 1 if characterIndex is not provided or invalid
  const index =
    characterIndex && characterIndex >= 1 && characterIndex <= 6
      ? characterIndex
      : 1;
  return `/images/logos/MCharacter${index}.svg`;
};
