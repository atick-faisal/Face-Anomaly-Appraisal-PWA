function Result({
    loading,
    normalizationTechnique,
    score,
    inputImage,
    processedImage,
    normalizedImage,
}) {
    return (
        <div className="flex flex-col justify-center items-center">
            {loading && (
                <span className="loading loading-infinity loading-lg"></span>
            )}
            {loading && <p>Please Wait ...</p>}
            {processedImage && (
                <p className="text-xl">Normalization Technique</p>
            )}
            {processedImage && (
                <h1 className="text-3xl mb-4">{normalizationTechnique}</h1>
            )}
            {processedImage && <p className="text-xl">Score</p>}
            {score && <h1 className="text-3xl mb-4 text-center">{score}</h1>}
            {processedImage && <p className="text-xl">Input Image</p>}
            {processedImage && <img className="mb-4" src={inputImage}></img>}
            {processedImage && <p className="text-xl">Processed Image</p>}
            {processedImage && (
                <img className="mb-4" src={processedImage}></img>
            )}
            {processedImage && <p className="text-xl">Normalized Image</p>}
            {normalizedImage && (
                <img className="mb-16" src={normalizedImage}></img>
            )}
        </div>
    );
}

export default Result;
