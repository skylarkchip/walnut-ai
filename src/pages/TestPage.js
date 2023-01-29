import { Box, Image } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import {
  Layer,
  Rect,
  Stage,
  Text as KonvaText,
  Tag as KonvaTag,
  Label as KonvaLabel,
} from "react-konva";
import { pdfjs } from "react-pdf/dist/esm/entry.webpack5";
import { useSelector } from "react-redux";

const TestPage = () => {
  const file = useSelector((state) => state.file.file);
  const [currentPage, setCurrentPage] = useState(3);
  const [images, setImages] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [rect, setRect] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const containerRef = useRef();
  const imageRef = useRef();
  const stageRef = useRef();

  useEffect(() => {
    (async () => {
      const pdf = await pdfjs.getDocument(file.path).promise;
      const canvas = document.createElement("canvas");
      const images = [];
      for (let i = 0; i < pdf.numPages; i++) {
        const page = await pdf.getPage(i + 1);
        const viewPort = page.getViewport({ scale: 1 });
        const ctx = canvas.getContext("2d");
        canvas.height = viewPort.height;
        canvas.width = viewPort.width;
        await page.render({ canvasContext: ctx, viewport: viewPort }).promise;
        images.push({ page: i + 1, url: canvas.toDataURL() });
      }
      setImages(images);
    })();
  }, [file]);

  const onMouseDownHandler = (e) => {
    const pos = stageRef.current.getPointerPosition();
    setIsDrawing(true);
    setRect({
      x: pos.x,
      y: pos.y,
      width: 0,
      height: 0,
    });
  };

  const onMouseMoveHandler = (e) => {
    if (isDrawing) {
      const pos = stageRef.current.getPointerPosition();
      setRect({
        ...rect,
        width: pos.x - rect.x,
        height: pos.y - rect.y,
      });
    }
  };

  const onMouseUpHandler = () => {
    if (isDrawing) {
      const customCanvas = document.createElement("canvas");
      customCanvas.width = rect.width;
      customCanvas.height = rect.height;
      customCanvas
        .getContext("2d")
        .drawImage(
          imageRef.current,
          rect.x,
          rect.y,
          rect.width,
          rect.height,
          0,
          0,
          rect.width,
          rect.height
        );

      setImageUrl(customCanvas.toDataURL("image/png"));
      setIsDrawing(false);
    }
  };

  return (
    <>
      {images.length > 0 &&
        images.map((image, idx) => {
          return (
            <Box key={image.page}>
              {image.page === currentPage && (
                <Box w="full" h="full" ref={containerRef} position="relative">
                  <Image ref={imageRef} src={image.url} alt={`image${idx}`} />
                  <Stage
                    ref={stageRef}
                    width={imageRef.current && imageRef.current.width}
                    height={imageRef.current && imageRef.current.height}
                    onMouseDown={onMouseDownHandler}
                    onMouseMove={onMouseMoveHandler}
                    onMouseUp={onMouseUpHandler}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                    }}
                  >
                    <Layer>
                      <KonvaLabel x={rect.x} y={rect.y}>
                        <KonvaTag fill="red" />
                        <KonvaText
                          align="left"
                          fontFamily={"Inter"}
                          fontSize={14}
                          fill="white"
                          padding={4}
                          text={`${rect.x} - ${rect.y}`}
                        />
                      </KonvaLabel>
                      <Rect
                        x={rect.x}
                        y={rect.y}
                        height={rect.height}
                        width={rect.width}
                        stroke="red"
                        strokeWidth={2}
                      />
                    </Layer>
                  </Stage>
                  <Image src={imageUrl} alt="screen-capture" />
                </Box>
              )}
            </Box>
          );
        })}
    </>
  );
};

export default TestPage;
