import React, {useEffect, useRef} from 'react'
import {useAnimations, useFBX, useGLTF} from '@react-three/drei'
function remapAnimationTracks(animation) {
    animation.tracks = animation.tracks.map(track => {
        const newName = track.name.replace('mixamorig', '');
        track.name = newName;
        return track;
    });
    return animation;
}
const CharacterModel = ({animationName = 'brooklynAnimation', ...props}) => {
    const group = useRef();
    const {nodes, materials} = useGLTF('/models/YungGravy.glb');

    const {animations:brooklynAnimation} = useFBX('/models/brooklyn.fbx');
    brooklynAnimation[0].name = 'brooklynAnimation';
    brooklynAnimation[0] = remapAnimationTracks(brooklynAnimation[0]);
    const {actions} = useAnimations([brooklynAnimation[0]], group)

    useEffect(() => {
        if (actions[animationName]) {
            actions[animationName].reset().fadeIn(0.5).play();
            return () => actions[animationName].fadeOut(0.5);
        } else {
            console.warn(`Animation "${animationName}" not found`);
        }
    }, [animationName, actions]);
    return (
        <group ref={group} {...props} dispose={null}>
            <primitive object={nodes.Hips}/>

            <skinnedMesh
                castShadow
                receiveShadow
                name="EyeLeft"
                geometry={nodes.EyeLeft.geometry}
                material={materials.Wolf3D_Eye}
                skeleton={nodes.EyeLeft.skeleton}
                morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
                morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
            />
            <skinnedMesh
                castShadow
                receiveShadow
                name="EyeRight"
                geometry={nodes.EyeRight.geometry}
                material={materials.Wolf3D_Eye}
                skeleton={nodes.EyeRight.skeleton}
                morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
                morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
            />
            <skinnedMesh
                castShadow
                receiveShadow
                name="Wolf3D_Head"
                geometry={nodes.Wolf3D_Head.geometry}
                material={materials.Wolf3D_Skin}
                skeleton={nodes.Wolf3D_Head.skeleton}
                morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
                morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
            />
            <skinnedMesh
                castShadow
                receiveShadow
                name="Wolf3D_Teeth"
                geometry={nodes.Wolf3D_Teeth.geometry}
                material={materials.Wolf3D_Teeth}
                skeleton={nodes.Wolf3D_Teeth.skeleton}
                morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
                morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
            />
            <skinnedMesh
                    castShadow    castShadowcastShadow
                    receiveShadow
                geometry={nodes.Wolf3D_Hair.geometry}
                material={materials.Wolf3D_Hair}
                skeleton={nodes.Wolf3D_Hair.skeleton}
            />
            <skinnedMesh
                    receiveShadow    receiveShadowcastShadow
                    receiveShadow
                geometry={nodes.Wolf3D_Glasses.geometry}
                material={materials.Wolf3D_Glasses}
                skeleton={nodes.Wolf3D_Glasses.skeleton}
            />
            <skinnedMesh
                castShadow
                receiveShadow
                geometry={nodes.Wolf3D_Outfit_Top.geometry}
                material={materials.Wolf3D_Outfit_Top}
                skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
            />
            <skinnedMesh
                castShadow
                receiveShadow
                geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
                material={materials.Wolf3D_Outfit_Bottom}
                skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
            />
            <skinnedMesh
                castShadow
                receiveShadow
                geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
                material={materials.Wolf3D_Outfit_Footwear}
                skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
            />
            <skinnedMesh
                castShadow
                receiveShadow
                geometry={nodes.Wolf3D_Body.geometry}
                material={materials.Wolf3D_Body}
                skeleton={nodes.Wolf3D_Body.skeleton}
            />
        </group>
    )
}

useGLTF.preload('/models/YungGravy.glb')
export default CharacterModel;