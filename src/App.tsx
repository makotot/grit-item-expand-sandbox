import { Box, Button } from "@mui/material";
import { useLayoutEffect, useRef, useState, VFC } from "react";

const Clone: VFC<{
  isFullScreen: boolean;
  targetSize?: DOMRect;
  wrapperSize?: DOMRect;
}> = ({ isFullScreen, targetSize, wrapperSize }) => {
  return (
    <div
      style={{
        position: "absolute",
        display: "block",
        pointerEvents: "none",
        transition: "all 0.6s ease",
        background: "#2F35FF",
        ...(isFullScreen
          ? {
              visibility: "visible",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: wrapperSize?.width,
              height: wrapperSize?.height
            }
          : {
              visibility: "hidden",
              top: (targetSize?.top || 0) - (wrapperSize?.top || 0),
              left: (targetSize?.left || 0) - (wrapperSize?.left || 0),
              right: targetSize?.right,
              bottom: targetSize?.bottom,
              width: targetSize?.width,
              height: targetSize?.height
            })
      }}
    >
      C
    </div>
  );
};

const GridLayout = () => {
  const [isFullScreen, toggle] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [wrapperSize, updateWrapperSize] = useState<DOMRect | undefined>(
    undefined
  );
  const [targetSize, updateTargetSize] = useState<DOMRect | undefined>(
    undefined
  );

  useLayoutEffect(() => {
    if (wrapperRef.current) {
      updateWrapperSize(wrapperRef.current.getBoundingClientRect());
    }
    if (targetRef.current) {
      updateTargetSize(targetRef.current.getBoundingClientRect());
    }
  }, []);

  return (
    <div>
      <Box sx={{ position: "relative" }} id="wrapper" ref={wrapperRef}>
        <Box display="grid" gap={1} gridTemplateAreas="'A B C' 'A B D'">
          <Box
            gridArea="A"
            sx={{
              padding: "2rem",
              backgroundColor: "#01A4FF"
            }}
          >
            A
          </Box>
          <Box
            gridArea="B"
            sx={{
              padding: "2rem",
              backgroundColor: "#01FFC2"
            }}
          >
            B
          </Box>
          <Box
            id="c"
            ref={targetRef}
            gridArea="C"
            sx={{
              padding: "2rem",
              backgroundColor: "#7F35FF"
            }}
          >
            C
          </Box>
          <Box
            gridArea="D"
            sx={{ padding: "2rem", backgroundColor: "#FF695E" }}
          >
            D
          </Box>
        </Box>
        <Clone
          isFullScreen={isFullScreen}
          wrapperSize={wrapperSize}
          targetSize={targetSize}
        />
      </Box>
      <Box marginTop="1rem">
        <Button variant="outlined" onClick={() => toggle((prev) => !prev)}>
          Toggle
        </Button>
      </Box>
      <Box marginTop="1rem">
        <div>Full Screen: {isFullScreen ? "Yes" : "No"}</div>
      </Box>
    </div>
  );
};

export default function App() {
  return (
    <div>
      <GridLayout />
    </div>
  );
}
