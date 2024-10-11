import { useState, useRef } from "react";
import Config from "./components/Config";
import NavBar from "./components/NavBar";
import Upload from "./components/Upload";
import Result from "./components/Result";
import Steps from "./components/Steps";
import html2canvas from "html2canvas-pro";

import axios from "axios";

function App() {
    const [screen, setScreen] = useState(1);
    const [name, setName] = useState("");
    const [normalizationTechnique, setNormalizationTechnique] =
        useState("stylegan");
    const [performanceMetric, setPerformanceMetric] = useState("LPIPS");
    const [image, setImage] = useState(null);
    const [imgSrc, setImageSrc] = useState(null);
    const [loading, setLoading] = useState(false);
    const [processedImage, setProcessedImage] = useState(null);
    const [normalizedImage, setNormalizedImage] = useState(null);
    const [score, setScore] = useState(null);

    const screenshotRef = useRef(null);

    const upload = () => {
        setScore(null);
        setProcessedImage(null);
        setNormalizedImage(null);
        const formData = new FormData();
        formData.append("user_name", name);
        formData.append("normalization_method", normalizationTechnique);
        formData.append("evaluation_method", performanceMetric);
        formData.append("image", image);
        axios
            .post("https://api.faceapp.qu-mlg.com/faceapi", formData, {
                timeout: 300000,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                if (response.status == 200) {
                    console.log("success");
                    setScore(response.data.score);
                    setProcessedImage(
                        `data:image/png;base64,${response.data.proessed_input_image}`
                    );
                    setNormalizedImage(
                        `data:image/png;base64,${response.data.normalized_image}`
                    );
                } else if (response.status == 503) {
                    setScore("Server is busy. Please try again later.");
                } else {
                    setScore(response.data.error);
                }
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
                if (error.response) {
                    setScore(error.response.data.error);
                } else if (error.request.status == 0) {
                    setScore(
                        "The server is currently busy. Please try again in a few minutes."
                    );
                } else {
                    setScore(
                        "An unknown error has occurred. Please try again!"
                    );
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const downloadCSV = () => {
        const headers = [
            "Name",
            "Normalization Technique",
            "Performance Metric",
            "Score",
        ];
        const csvRows = [
            headers.join(","),
            [name, normalizationTechnique, performanceMetric, score].join(","),
        ];
        const csvString = csvRows.join("\n");
        const blob = new Blob([csvString], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "results.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const downloadScreenshot = () => {
        const element = screenshotRef.current;
        html2canvas(element)
            .then((canvas) => {
                const image = canvas.toDataURL("image/png");
                const link = document.createElement("a");
                link.href = image;
                link.download = "screenshot.png";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch((error) => {
                console.error("Screenshot capture failed:", error);
            });
    };

    const onSelectImage = (src, img) => {
        setImageSrc(src);
        setImage(img);
    };

    const onNextClick = () => {
        if (screen == 2) {
            console.log("upload");
            console.log(name);
            console.log(normalizationTechnique);
            console.log(performanceMetric);
            console.log(image);
            setLoading(true);
            // setTimeout(() => {
            //     setLoading(false);
            // }, 5000);
            upload();
        }
        setScreen(screen + 1);
    };

    return (
        <div className="max-w-md mx-auto">
            <div className="flex flex-col h-screen p-4 max-w-lg">
                <NavBar />
                <Steps screen={screen} />
                <div className="flex-grow place-content-center p-4">
                    {screen == 1 && (
                        <Upload
                            imageSrc={imgSrc}
                            onSelectImage={(src, img) =>
                                onSelectImage(src, img)
                            }
                        />
                    )}
                    {screen == 2 && (
                        <Config
                            name={name}
                            onNameChange={setName}
                            normalizationTechnique={normalizationTechnique}
                            performanceMetric={performanceMetric}
                            onNormalizationTechniqueChange={
                                setNormalizationTechnique
                            }
                            onPerformanceMetricChange={setPerformanceMetric}
                        />
                    )}
                    {screen == 3 && (
                        <Result
                            loading={loading}
                            onDownloadClick={downloadCSV}
                            onCaptureClick={downloadScreenshot}
                            normalizationTechnique={normalizationTechnique}
                            performanceMetric={performanceMetric}
                            score={score}
                            inputImage={imgSrc}
                            processedImage={processedImage}
                            normalizedImage={normalizedImage}
                            screenshotRef={screenshotRef}
                        />
                    )}
                </div>
                <div className="p-4 flex flex-row w-full">
                    {screen != 1 && (
                        <button
                            className="btn btn-circle btn-primary"
                            onClick={() => setScreen(screen - 1)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                fill="#000"
                            >
                                <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
                            </svg>
                        </button>
                    )}
                    <div className="flex-grow"></div>
                    {screen != 3 && (
                        <button
                            className="btn btn-circle btn-primary"
                            disabled={
                                image == null || (screen == 2 && name == "")
                            }
                            onClick={() => onNextClick()}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                fill="#000"
                            >
                                <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
