import { useRef } from "react";
import placeholder from "../assets/placeholder.png";

function Upload({ imageSrc, onSelectImage }) {
    const fileInputRef = useRef(null);

    const handleCaptureClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target.result != null) {
                    onSelectImage(e.target.result, file);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="mb-4">
                <p className="text-xl w-full text-center">Select an Image</p>
            </div>

            <div className="flex-grow w-full">
                {imageSrc && (
                    <img
                        src={imageSrc}
                        alt="Image Preview"
                        className="w-full h-auto"
                    />
                )}
                {!imageSrc && (
                    <img
                        src={placeholder}
                        alt="Image Preview"
                        className="w-full h-auto opacity-40"
                    />
                )}
            </div>

            <div className="mt-4 flex flex-col w-full border-opacity-50">
                <input
                    type="file"
                    className="file-input file-input-bordered w-full"
                    onChange={handleFileChange}
                />
                <div className="divider">OR</div>
                <button onClick={handleCaptureClick} className="btn w-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#666666"
                    >
                        <path d="M440-440ZM120-120q-33 0-56.5-23.5T40-200v-480q0-33 23.5-56.5T120-760h126l74-80h240v80H355l-73 80H120v480h640v-360h80v360q0 33-23.5 56.5T760-120H120Zm640-560v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80ZM440-260q75 0 127.5-52.5T620-440q0-75-52.5-127.5T440-620q-75 0-127.5 52.5T260-440q0 75 52.5 127.5T440-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Z" />
                    </svg>
                    Take a Picture
                </button>
                <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
            </div>
        </div>
    );
}

export default Upload;
