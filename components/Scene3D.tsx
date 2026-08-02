"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Scene3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias:true, alpha:true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    renderer.setClearColor(0x000000, 0);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth/canvas.clientHeight, 0.1, 100);
    camera.position.set(0,0,7);
    const tk = new THREE.Mesh(new THREE.TorusKnotGeometry(1.8,0.5,128,16,2,3), new THREE.MeshBasicMaterial({color:0xe4ded7,wireframe:true,transparent:true,opacity:0.12}));
    scene.add(tk);
    const sp = new THREE.Mesh(new THREE.SphereGeometry(1.2,24,24), new THREE.MeshBasicMaterial({color:0x95979d,wireframe:true,transparent:true,opacity:0.08}));
    scene.add(sp);
    const COUNT=250; const pos=new Float32Array(COUNT*3);
    for(let i=0;i<COUNT;i++){pos[i*3]=(Math.random()-0.5)*16;pos[i*3+1]=(Math.random()-0.5)*16;pos[i*3+2]=(Math.random()-0.5)*16;}
    const pg=new THREE.BufferGeometry(); pg.setAttribute("position",new THREE.BufferAttribute(pos,3));
    const pts=new THREE.Points(pg,new THREE.PointsMaterial({color:0xe4ded7,size:0.04,transparent:true,opacity:0.35,sizeAttenuation:true}));
    scene.add(pts);
    const ro=new ResizeObserver(()=>{const w=canvas.clientWidth,h=canvas.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();});
    ro.observe(canvas);
    let raf:number; const clk=new THREE.Clock();
    const animate=()=>{raf=requestAnimationFrame(animate);const t=clk.getElapsedTime();tk.rotation.x=t*0.15;tk.rotation.y=t*0.2;sp.rotation.x=-t*0.1;sp.rotation.y=t*0.15;pts.rotation.y=t*0.03;renderer.render(scene,camera);};
    animate();
    return ()=>{cancelAnimationFrame(raf);ro.disconnect();renderer.dispose();};
  },[]);
  return <canvas ref={canvasRef} style={{position:"absolute",inset:0,width:"100%",height:"100%",zIndex:0,pointerEvents:"none",opacity:0.85}}/>;
}
