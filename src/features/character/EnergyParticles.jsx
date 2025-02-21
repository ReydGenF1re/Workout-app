import React, { useMemo } from "react";

const EnergyParticles = ({ count, radius, depth }) => {
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * 2 * Math.PI;
            const r = Math.sqrt(Math.random()) * radius;
            const x = r * Math.cos(theta);
            const z = r * Math.sin(theta);
            const y = Math.random() * depth - depth / 2;
            temp.push({ x, y, z });
        }
        return temp;
    }, [count, radius, depth]);

    return (
        <group>
            {particles.map((particle, i) => (
                <mesh key={i} position={[particle.x, particle.y, particle.z]}>
                    <sphereGeometry args={[0.02, 8, 8]} />
                    <meshBasicMaterial color="#ff00ff" />
                </mesh>
            ))}
        </group>
    );
};

export default EnergyParticles;
