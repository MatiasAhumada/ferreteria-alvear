export const getCenteredMenuPosition = () => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const menuWidth = 192;
  const menuHeight = 200;

  return {
    top: (windowHeight - menuHeight) / 2,
    left: (windowWidth - menuWidth) / 2,
  };
};
