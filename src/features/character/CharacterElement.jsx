import React, {Suspense} from 'react';
import NightSky from "./NightSky.jsx";
import EnergyParticles from "./EnergyParticles.jsx";
import CharacterModel from "./CharacterModel.jsx";
import {Canvas} from "@react-three/fiber";
import CameraRotation from "./CameraRotation.jsx";

const CharacterElement = () => {

    return (
        <Canvas shadows className={'border-2 border-fuchsia-500 rounded-lg'}>
            <NightSky />
            <EnergyParticles count={500} radius={6} />
            <directionalLight
                position={[10, 10, 10]}
                intensity={10}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                color="#800080"       // Фиолетовый цвет

            />
            <directionalLight
                position={[-10, 5, 5]}
                intensity={10}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                color="#800080"       // Фиолетовый цвет
            />
            <directionalLight
                position={[0, 5, 5]}
                intensity={5}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}

            />

            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} color="#00ffff"/>
            <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} color="#ff00ff"/>
            <pointLight position={[0, 5, 5]} intensity={0.7} color="#ffffff"/>
            <pointLight position={[-5, 0, -5]} intensity={0.5} color="#00ffff"/>
            <pointLight position={[5, 0, -5]} intensity={0.5} color="#ff1493"/>

            <CameraRotation/>

            <Suspense fallback={null}>
                <CharacterModel
                    position-y={-3}
                    scale={3}
                />

            </Suspense>
        </Canvas>
    );
};

export default CharacterElement;