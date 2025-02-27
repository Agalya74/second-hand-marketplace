import React from "react";

const ThemeToggle = ({ darkMode, setDarkMode }) => {
  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem("darkMode", newTheme);
  };

  return <button onClick={toggleTheme}>Toggle {darkMode ? "Light" : "Dark"} Mode</button>;
};

export default ThemeToggle;
