import * as React from "react";
import { debounce } from "lodash";

type WindowDimensions = {
  width: number;
  height: number;
};

export function useWindowDimensions(): WindowDimensions {
  const [windowDimensions, setWindowDimensions] =
    React.useState<WindowDimensions>({
      width: 0,
      height: 0,
    });
  React.useEffect(() => {
    const handleResize = debounce(() => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 100);
    handleResize();
    window.addEventListener("resize", handleResize);
    return (): void => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

export function useIsMobile(breakpoint = 998) {
  const { width } = useWindowDimensions();
  return width < breakpoint;
}
