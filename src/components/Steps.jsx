function Steps({ screen }) {
    return (
        <div>
            <ul className="steps w-full">
                <li className={`step ${screen >= 1 ? "step-primary" : ""}`}>
                    Upload
                </li>
                <li className={`step ${screen >= 2 ? "step-primary" : ""}`}>
                    Config
                </li>
                <li className={`step ${screen >= 3 ? "step-primary" : ""}`}>
                    Result
                </li>
            </ul>
        </div>
    );
}

export default Steps;
