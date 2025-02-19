import React, {useRef} from "react";
import {useFrame} from "@react-three/fiber";
import {PerspectiveCamera} from "@react-three/drei";

const CameraRotation = () => {
    const cameraRef = useRef();
    useFrame(({ clock }) => {
        if (cameraRef.current) {
            const angle = clock.getElapsedTime() * 0.5;
            const radius = window.innerWidth > 768 ? 9 : 14;
            const height = 2;
            cameraRef.current.position.x = Math.sin(angle) * radius;
            cameraRef.current.position.z = Math.cos(angle) * radius;
            cameraRef.current.position.y = height;
            cameraRef.current.lookAt(0, 0, 0);
        }
    });
    return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 14]} fov={40} />;
};
export default CameraRotation;