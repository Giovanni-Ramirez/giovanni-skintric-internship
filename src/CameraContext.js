import React, { createContext, useState, useContext } from 'react';

const CameraContext = createContext();

export function CameraProvider({ children }) {
    const [stream, setStream] = useState(null);

    const startCamera = async () => {
        const constraints = {
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
        };
        // Triggers permission and starts the stream
        const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        setStream(mediaStream);
        return mediaStream;
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    };

    return React.createElement(
        CameraContext.Provider,
        { value: { stream, setStream, startCamera, stopCamera } },
        children
    );
}

export const useCamera = () => useContext(CameraContext);
