import {Stars} from "@react-three/drei";
import React from "react";

const NightSky = () => (
    <>
        <color attach="background" args={['#000008']} />
        <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={10}
            saturation={0}
            fade
            speed={1}
        />
    </>
)
export default NightSky;