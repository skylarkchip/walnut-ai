import { Box, Flex, Icon, IconButton, Image, Spinner } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import {
  Layer,
  Rect,
  Stage,
  Text as KonvaText,
  Tag as KonvaTag,
  Label as KonvaLabel,
} from "react-konva";
import { pdfjs } from "react-pdf/dist/esm/entry.webpack5";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { v4 } from "uuid";
import { canvasActions } from "../../redux/slices/canvas";

const EditorCanvas = () => {
  const dispatch = useDispatch();
  const file = useSelector((state) => state.file.file);
  const isDrawing = useSelector((state) => state.canvas.isDrawing);
  const selectedLabel = useSelector((state) => state.labels.selectedLabel);
  const boundingBox = useSelector((state) => state.canvas.boundingBox);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isDocumentLoading, setIsDocumentLoading] = useState(false);
  const [rect, setRect] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const containerRef = useRef();
  const imageRef = useRef();
  const stageRef = useRef();

  const params = useParams();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.has("page")) {
      setCurrentPage(searchParams.get("page"));
    }
  }, [searchParams]);

  useEffect(() => {
    (async () => {
      setIsDocumentLoading(true);
      const pdf = await pdfjs.getDocument(file.path).promise;
      const canvas = document.createElement("canvas");
      const images = [];
      setTotalPages(pdf.numPages);
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
      setIsDocumentLoading(false);
    })();
  }, [file]);

  const onPageChangeHandler = (offset) => {
    setCurrentPage((prevState) => prevState + offset);
  };

  const onPreviousPageHandler = () => {
    onPageChangeHandler(-1);
  };

  const onNextPageHandler = () => {
    onPageChangeHandler(+1);
  };

  const onMouseDownHandler = (e) => {
    if (selectedLabel) {
      dispatch(canvasActions.setIsDrawing(true));
      const pos = stageRef.current.getPointerPosition();
      setRect({
        x: pos.x,
        y: pos.y,
        width: 0,
        height: 0,
      });
    }
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

      const id = v4();

      dispatch(
        canvasActions.getCurrentBox({
          id: id,
          boundingBox: rect,
          file,
          page: currentPage,
          label: selectedLabel,
          image: customCanvas.toDataURL("image/png"),
        })
      );
      dispatch(canvasActions.setIsDrawing(false));
      setRect({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      });
    }
  };

  return (
    <Flex
      minH="full"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      {isDocumentLoading && (
        <Flex h="100vh" alignItems="center" justifyContent="center">
          <Spinner color="twitter" size="md" />
        </Flex>
      )}
      {!isDocumentLoading && (
        <>
          <Flex columnGap="4" py="4">
            <IconButton
              borderRadius="full"
              icon={<Icon as={HiChevronLeft} boxSize="6" />}
              onClick={onPreviousPageHandler}
              isDisabled={currentPage === 1}
            />
            <IconButton
              borderRadius="full"
              icon={<Icon as={HiChevronRight} boxSize="6" />}
              onClick={onNextPageHandler}
              isDisabled={currentPage === totalPages}
            />
          </Flex>
          {images.length > 0 &&
            images.map((image, idx) => {
              return (
                <Box key={image.page}>
                  {image.page === currentPage && (
                    <Box
                      w="full"
                      h="full"
                      ref={containerRef}
                      position="relative"
                    >
                      <Image
                        ref={imageRef}
                        src={image.url}
                        alt={`image${idx}`}
                      />
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
                        {isDrawing && (
                          <Layer>
                            <KonvaLabel x={rect.x} y={rect.y}>
                              <KonvaTag fill="red" />
                              <KonvaText
                                align="left"
                                fontFamily={"Inter"}
                                fontSize={14}
                                fill="white"
                                padding={4}
                                text={selectedLabel.value}
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
                        )}
                        <Layer>
                          {boundingBox.map((box) => (
                            <React.Fragment key={box.id}>
                              {box.page === currentPage &&
                                box.file.id === params.id && (
                                  <>
                                    <KonvaLabel
                                      x={box.boundingBox.x}
                                      y={box.boundingBox.y}
                                    >
                                      <KonvaTag fill="red" />
                                      <KonvaText
                                        align="left"
                                        fontFamily={"Inter"}
                                        fontSize={14}
                                        fill="white"
                                        padding={4}
                                        text={box.label.value}
                                      />
                                    </KonvaLabel>
                                    <Rect
                                      x={box.boundingBox.x}
                                      y={box.boundingBox.y}
                                      height={box.boundingBox.height}
                                      width={box.boundingBox.width}
                                      stroke="red"
                                      strokeWidth={2}
                                    />
                                  </>
                                )}
                            </React.Fragment>
                          ))}
                        </Layer>
                      </Stage>
                    </Box>
                  )}
                </Box>
              );
            })}
        </>
      )}
    </Flex>
  );
};

export default EditorCanvas;
