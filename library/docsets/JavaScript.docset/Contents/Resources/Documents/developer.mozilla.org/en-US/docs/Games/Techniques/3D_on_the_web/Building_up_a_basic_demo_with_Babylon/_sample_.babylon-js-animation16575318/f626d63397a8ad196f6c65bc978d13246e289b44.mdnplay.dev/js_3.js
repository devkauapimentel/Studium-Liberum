
          const canvas = document.getElementById("render-canvas");
const engine = new BABYLON.Engine(canvas, true, {
  preserveDrawingBuffer: false,
  alpha: true,
});

const scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color3(0.8, 0.8, 0.8);
const camera = new BABYLON.FreeCamera(
  "camera",
  new BABYLON.Vector3(0, 0, -10),
  scene,
);
const light = new BABYLON.PointLight(
  "light",
  new BABYLON.Vector3(10, 10, 0),
  scene,
);

const box = BABYLON.Mesh.CreateBox("box", 2, scene);
box.rotation.x = -0.2;
box.rotation.y = -0.4;

const boxMaterial = new BABYLON.StandardMaterial("material", scene);
boxMaterial.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);
box.material = boxMaterial;

const torus = BABYLON.Mesh.CreateTorus("torus", 2, 0.5, 15, scene);
torus.position.x = -5;
torus.rotation.x = 1.5;

const torusMaterial = new BABYLON.StandardMaterial("material", scene);
torusMaterial.emissiveColor = new BABYLON.Color3(0.4, 0.4, 0.4);
torus.material = torusMaterial;

const cylinder = BABYLON.Mesh.CreateCylinder("cylinder", 2, 2, 2, 12, 1, scene);
cylinder.position.x = 5;
cylinder.rotation.x = -0.2;

const cylinderMaterial = new BABYLON.StandardMaterial("material", scene);
cylinderMaterial.emissiveColor = new BABYLON.Color3(1, 0.58, 0);
cylinder.material = cylinderMaterial;

let t = 0;
function renderLoop() {
  scene.render();
  t -= 0.01;
  box.rotation.y = t * 2;
  torus.scaling.z = Math.abs(Math.sin(t * 2)) + 0.5;
  cylinder.position.y = Math.sin(t * 3);
}
engine.runRenderLoop(renderLoop);
;
        