function Config({
    name,
    normalizationTechnique,
    performanceMetric,
    onNameChange,
    onNormalizationTechniqueChange,
    onPerformanceMetricChange,
}) {
    const handleNameChange = (event) => {
        onNameChange(event.target.value);
    };

    const handleNormalizationChange = (event) => {
        onNormalizationTechniqueChange(event.target.value);
    };

    const handlePerformanceMetricChange = (event) => {
        onPerformanceMetricChange(event.target.value);
    };

    return (
        <div>
            <p className="text-xl mb-4">Name of the Patient</p>
            <label className="input input-bordered flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                    type="text"
                    className="grow"
                    placeholder="Name"
                    value={name}
                    onChange={handleNameChange}
                />
            </label>

            <br></br>

            <p className="text-xl">Normalization Technique</p>
            <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text">StyleGAN</span>
                    <input
                        type="radio"
                        name="normalization"
                        value="stylegan"
                        className="radio checked:bg-blue-500"
                        checked={normalizationTechnique === "stylegan"}
                        onChange={handleNormalizationChange}
                    />
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text">Automat</span>
                    <input
                        type="radio"
                        name="normalization"
                        value="automat"
                        className="radio checked:bg-blue-500"
                        checked={normalizationTechnique === "automat"}
                        onChange={handleNormalizationChange}
                    />
                </label>
            </div>
            {/* <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text">Encoder</span>
                    <input
                        type="radio"
                        name="normalization"
                        value="Encoder"
                        className="radio checked:bg-blue-500"
                        checked={normalizationTechnique === "Encoder"}
                        onChange={handleNormalizationChange}
                    />
                </label>
            </div> */}

            <br></br>

            <p className="text-xl">Performance Metric</p>
            <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text">LPIPS</span>
                    <input
                        type="radio"
                        name="performanceMetric"
                        value="LPIPS"
                        className="radio checked:bg-blue-500"
                        checked={performanceMetric === "LPIPS"}
                        onChange={handlePerformanceMetricChange}
                    />
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text">SSIM</span>
                    <input
                        type="radio"
                        name="performanceMetric"
                        value="SSIM"
                        className="radio checked:bg-blue-500"
                        checked={performanceMetric === "SSIM"}
                        onChange={handlePerformanceMetricChange}
                    />
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text">Pixel-Wise</span>
                    <input
                        type="radio"
                        name="performanceMetric"
                        value="Pixelwise"
                        className="radio checked:bg-blue-500"
                        checked={performanceMetric === "Pixelwise"}
                        onChange={handlePerformanceMetricChange}
                    />
                </label>
            </div>
        </div>
    );
}

export default Config;
