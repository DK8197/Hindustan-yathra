'use client';

import {
  memo,
  Suspense,
  useEffect,
  useMemo,
  useRef,
} from 'react';

import * as THREE from 'three';

import {
  Canvas,
  useFrame,
} from '@react-three/fiber';

import {
  PerspectiveCamera,
  useTexture,
} from '@react-three/drei';

import { useAppStore } from '@/store/useAppStore';

const EARTH_DAY_TEXTURE_URL = "textures/earth-day-new.webp";
const EARTH_CLOUDS_TEXTURE_URL = "textures/earth-clouds.webp";

/* -------------------------------------------------------------------------- */
/* Shared Resources                                                           */
/* -------------------------------------------------------------------------- */

const EARTH_GEOMETRY =
  new THREE.SphereGeometry(
    1,
    32,
    32
  );

const CLOUD_GEOMETRY =
  new THREE.SphereGeometry(
    1.01,
    32,
    32
  );

/* -------------------------------------------------------------------------- */
/* Earth                                                                      */
/* -------------------------------------------------------------------------- */

function Earth({
  isMobile,
}: {
  isMobile: boolean;
}) {
  const earthGroupRef =
    useRef<THREE.Group>(null);

  const earthRef =
    useRef<THREE.Mesh>(null);

  const cloudsRef =
    useRef<THREE.Mesh>(null);

  const targetRotation =
    useRef({
      x: 0,
      y: 0,
    });

  const [earthMap, cloudMap] =
    useTexture([
      EARTH_DAY_TEXTURE_URL,
      EARTH_CLOUDS_TEXTURE_URL,
    ]) as [
      THREE.Texture,
      THREE.Texture
    ];

  useEffect(() => {
    if (earthMap) {
      earthMap.colorSpace =
        THREE.SRGBColorSpace;
    }

    if (cloudMap) {
      cloudMap.colorSpace =
        THREE.SRGBColorSpace;
    }
  }, [earthMap, cloudMap]);

  const earthMaterial =
    useMemo(
      () =>
        new THREE.MeshStandardMaterial({
          map: earthMap,
          roughness: 0.9,
          metalness: 0,
        }),
      [earthMap]
    );

  const cloudMaterial =
    useMemo(
      () =>
        new THREE.MeshStandardMaterial({
          map: cloudMap,
          transparent: true,
          opacity: 0.18,
          depthWrite: false,
        }),
      [cloudMap]
    );

  useFrame((state, delta) => {
    if (earthGroupRef.current) {
      const progress =
        THREE.MathUtils.clamp(
          useAppStore.getState().heroScrollProgress,
          0,
          1
        );

      const startScale =
        isMobile ? 1.5 : 2.0;

      earthGroupRef.current.scale.setScalar(
        startScale + (6.0 - startScale) * progress
      );
    }

    if (!earthRef.current) {
      return;
    }

    const mouseX =
      state.pointer.x * 0.15;

    const mouseY =
      state.pointer.y * 0.08;

    targetRotation.current.x =
      mouseY;

    targetRotation.current.y =
      mouseX;

    earthRef.current.rotation.y +=
      delta * 0.12;

    earthRef.current.rotation.x =
      THREE.MathUtils.lerp(
        earthRef.current.rotation.x,
        targetRotation.current.x,
        0.03
      );

    earthRef.current.rotation.z =
      THREE.MathUtils.lerp(
        earthRef.current.rotation.z,
        targetRotation.current.y,
        0.03
      );

    if (cloudsRef.current) {
      cloudsRef.current.rotation.y +=
        delta * 0.15;

      cloudsRef.current.rotation.x =
        earthRef.current.rotation.x;

      cloudsRef.current.rotation.z =
        earthRef.current.rotation.z;
    }
  });

  return (
    <group ref={earthGroupRef}>
      <mesh
        ref={earthRef}
        geometry={EARTH_GEOMETRY}
        material={earthMaterial}
      />

      <mesh
        ref={cloudsRef}
        geometry={CLOUD_GEOMETRY}
        material={cloudMaterial}
      />
    </group>
  );
}

const MemoEarth = memo(Earth);

/* -------------------------------------------------------------------------- */
/* Scene                                                                       */
/* -------------------------------------------------------------------------- */

function Scene({
  isMobile,
}: {
  isMobile: boolean;
}) {
  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 12]}
        fov={50}
      />

      <ambientLight
        intensity={0.8}
      />

      <directionalLight
        position={[8, 4, 8]}
        intensity={2}
      />

      <MemoEarth isMobile={isMobile} />
    </>
  );
}

const MemoScene = memo(Scene);

/* -------------------------------------------------------------------------- */
/* Hero3D                                                                      */
/* -------------------------------------------------------------------------- */

function Hero3DComponent() {
  const isMobile =
    typeof window !==
      'undefined' &&
    window.matchMedia(
      '(max-width:768px)'
    ).matches;

  return (
    <div
      className="absolute inset-0"
      aria-hidden="true"
    >
      <Canvas
        dpr={
          isMobile
            ? [1, 1.25]
            : [1, 1.5]
        }
        shadows={false}
        gl={{
          antialias: true,
          alpha: true,
          stencil: false,
          depth: true,
          preserveDrawingBuffer:
            false,
          powerPreference:
            'high-performance',
        }}
      >
        <Suspense fallback={null}>
          <MemoScene isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}

useTexture.preload(EARTH_DAY_TEXTURE_URL);
useTexture.preload(EARTH_CLOUDS_TEXTURE_URL);

export default memo(
  Hero3DComponent
);