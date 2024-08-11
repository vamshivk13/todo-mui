export const getUserDisplayName = (displayName) => {
  return displayName
    ?.trim()
    .split(" ")
    .reduce((ac, cur) => {
      return ac + cur[0]?.toUpperCase();
    }, "");
};

export const getUserAccountTooltipName = (displayName) => {
  return (
    displayName &&
    displayName[0]?.toUpperCase() +
      displayName.substring(1, displayName.length) +
      "'s Account"
  );
};
