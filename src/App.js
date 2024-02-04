import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';
import { OrbitControls, useCursor } from '@react-three/drei';

const ScaleKnob = () => {
  const knobRef = useRef();
  const [active, setActive] = React.useState(false);
  const { scale } = useSpring({ scale: active ? 1.5 : 1 });

  // Change cursor on hover
  useCursor(active);

  // Rotate the knob on each frame
  useFrame(() => {
    knobRef.current.rotation.y += 0.01;
  });

  return (
    <a.mesh
      ref={knobRef}
      scale={scale}
      onClick={() => setActive(!active)}
      onPointerOver={() => setActive(true)}
      onPointerOut={() => setActive(false)}
    >
      <cylinderGeometry args={[1, 1, 2, 32]} />
      <meshStandardMaterial color={active ? 'hotpink' : 'orange'} />
    </a.mesh>
  );
};

const Scene = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} />
      <ScaleKnob />
      <OrbitControls />
    </Canvas>
  );
};

export default Scene;
