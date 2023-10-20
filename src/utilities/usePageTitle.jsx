import {useEffect, useState } from "react";

export const usePageTitle = (location) => {
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    const titleMap = [
      { path: "/", title: "Home" },
      { path: "/home", title: "Home" },
      { path: "/home/", title: "Home" },
      { path: "/about-me", title: "About Me" },
      { path: "/connect", title: "Connect" },
      { path: "/music", title: "Music" },
      { path: "/credits", title: "Credits" },
    ];

    const curTitle = titleMap.find((item) => item.path === location);
    if (curTitle && curTitle.title) {
      setPageTitle(curTitle.title);
      document.title = "Sahil Jindal - " + curTitle.title;
    }
  }, [location]);

  return pageTitle;
};