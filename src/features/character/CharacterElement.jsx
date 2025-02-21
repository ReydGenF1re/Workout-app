import React, {Suspense} from 'react';
import NightSky from "./NightSky.jsx";
import EnergyParticles from "./EnergyParticles.jsx";
import YungGravy from "./YungGravy.jsx";
import {Canvas} from "@react-three/fiber";
import CameraRotation from "./CameraRotation.jsx";
import BabyNoMoney from "./BabyNoMoney.jsx";
import BabyNoMoneyFat from "./BabyNoMoneyFat.jsx";
import YungGravyFat from "./YungGravyFat.jsx";
import {useAnimations, useFBX} from "@react-three/drei";
import CanvasLoader from "../../ui/CanvasLoader.jsx";

export function remapAnimationTracks(animation) {
    animation.tracks = animation.tracks.map(track => {
        const newName = track.name.replace('mixamorig', '');
        track.name = newName;
        return track;
    });
    return animation;
}

export function animationEffect(actions, animationName) {
    if (actions[animationName]) {
        actions[animationName].reset().fadeIn(0.5).play();
        return () => actions[animationName].fadeOut(0.5);
    } else {
        console.warn(`Animation "${animationName}" not found`);
    }
}

export function useAnimation(group, path = '/models/brooklyn.fbx', name = 'brooklynAnimation') {
    const {animations} = useFBX(path);
    animations[0].name = name;
    animations[0] = remapAnimationTracks(animations[0]);
    const {actions} = useAnimations([animations[0]], group)
    return actions;
}

const CharacterElement = ({boughtCharacters}) => {

    return (
        <Canvas shadows className={'sm:border-2 sm:border-fuchsia-500 rounded-lg'}>
            <NightSky/>
            <EnergyParticles count={1000} radius={7} depth={5}/>
            <directionalLight
                position={[10, 10, 10]}
                intensity={10}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                color="#800080"

            />
            <directionalLight
                position={[-10, 5, 5]}
                intensity={10}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                color="#800080"
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

            <Suspense fallback={<CanvasLoader/>}>
                {localStorage.getItem("totalWorkouts") < 40 && (
                    <>
                        <YungGravyFat scale={3} position-y={-3} position-z={2}/>
                    </>
                )}
                {localStorage.getItem("totalWorkouts") >= 40 && (
                    <>
                        <YungGravy scale={3} position-y={-3} position-z={2}/>
                    </>
                )}
                {boughtCharacters.includes('BBNO$') && localStorage.getItem("totalWorkouts") >= 80 && (
                    <BabyNoMoney position-y={-3} scale={3} position-z={-2} animationName="SwingDancing" />
                )}
                {boughtCharacters.includes('BBNO$') && localStorage.getItem("totalWorkouts") < 80 && (
                    <BabyNoMoneyFat position-y={-3} scale={3} position-z={-2} animationName="SwingDancing" />
                )}


            </Suspense>
        </Canvas>
    );
};

export default CharacterElement;