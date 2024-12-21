// --------------
// Materials i Textura procedural
// --------------
// const scene = new Scene([
//     new WebGLObject("Cube2", exampleCube, White_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -1.0]), Scene.RENDER_MODES.IMATGE, {route: "gat.png"}),
//     new WebGLObject("Cube4", exampleCube, White_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 1.0, -1.0]), Scene.RENDER_MODES.WIREFRAMES),
//     new WebGLObject("Cube5", exampleCube, White_rubber, mat4.translate(mat4.create(), mat4.create(), [1.0, 0.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}),
//     new WebGLObject("Cube3", exampleCube, White_rubber, mat4.translate(mat4.create(), mat4.create(), [1.0, 1.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_NUVOLS, {color1: [1, 1, 1], color2: [2, 1, 1], scale: 5}),
//     new WebGLObject("Cube6", exampleCube, White_rubber, mat4.translate(mat4.create(), mat4.create(), [-1.0, 0.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_NUVOLS, {color1: [1, 1, 1], color2: [2, 1, 1], scale: 10}),
//     new WebGLObject("Cube7", exampleCube, White_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, -1.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_NUVOLS, {color1: [1, 10, 1], color2: [0, 1, 3], scale: 10}),
//     new WebGLObject("Cube8", exampleCube, Matte_visible, mat4.translate(mat4.create(), mat4.create(), [-1.0, -1.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_NUVOLS, {color1: [1, 1, 1], color2: [2, 1, 1], scale: 5}),
//     new WebGLObject("Cube9", exampleCube, Gold, mat4.translate(mat4.create(), mat4.create(), [-1.0, 1.0, -1.0]), Scene.RENDER_MODES.Material, {color1: [1, 1, 1], color2: [2, 1, 1], scale: 5}),
//     new WebGLObject("Cube10", exampleCube, Ruby, mat4.translate(mat4.create(), mat4.create(), [1.0, -1.0, -1.0]), Scene.RENDER_MODES.MATERIAL, {color1: [1, 1, 1], color2: [2, 1, 1], scale: 5}),
//     new WebGLLight("Light1", [1.0, 2.0, 3.0], [1, 1, 1], 1),
// ]);


// --------------
// Earth
// --------------
// const scene = new Scene([
//     new WebGLObject("Earth", earth, White_rubber, Scene.TransformationMatrix([0, 0, 0], [0, 0, 0]), Scene.RENDER_MODES.IMATGE, {route: "earth.jpg"}, 0.01),
//     new WebGLLight("Light1", [-1, -1.2, 0], [1.0, 1.0, 1.0], 1),
// ]);


// --------------
// Minecraft
// --------------
// const scene = new Scene([
//     new WebGLObject("Steve", steve, Matte_visible, Scene.TransformationMatrix([0, 0.01, 0], [0, -0.45, 0]), Scene.RENDER_MODES.IMATGE, {route: "steve.png"}, 0.05),
//     new WebGLObject("Abella", abella, Matte_visible, Scene.TransformationMatrix([-1, -0.77, -0.4], [0, 4, 0]), Scene.RENDER_MODES.IMATGE, {route: "abella.png"}, 1),
//     new WebGLObject("Gat", mgat, Matte_visible, Scene.TransformationMatrix([-0.7, -0.74, 0.8], [0, -2, 0]), Scene.RENDER_MODES.IMATGE, {route: "mgat.png"}, 0.05),
//     new WebGLObject("Senyal", senyal, Matte_visible, Scene.TransformationMatrix([0.6, -0.8, 0], [0, -.7, 0]), Scene.RENDER_MODES.IMATGE, {route: "senyal.png"}, 1.2),
//     new WebGLObject("Torch1", torch, Matte_visible, Scene.TransformationMatrix([-1, -0.61, -1], [0, -.7, 0]), Scene.RENDER_MODES.IMATGE, {route: "torch.png"}, 0.3),
//     new WebGLObject("Torch2", torch, Matte_visible, Scene.TransformationMatrix([1, -0.61, 1], [0, -.7, 0]), Scene.RENDER_MODES.IMATGE, {route: "torch.png"}, 0.3),
//     new WebGLObject("Torch3", torch, Matte_visible, Scene.TransformationMatrix([-1, -0.61, 1], [0, -.7, 0]), Scene.RENDER_MODES.IMATGE, {route: "torch.png"}, 0.3),
//     new WebGLObject("Torch4", torch, Matte_visible, Scene.TransformationMatrix([1, -0.61, -1], [0, -.7, 0]), Scene.RENDER_MODES.IMATGE, {route: "torch.png"}, 0.3),
//     new WebGLLight("Light1", [-1.1, -6, 2.0], [1.0, 1.0, 1.0], 0.7),
//     new WebGLLight("Light2", [-1.1, 1.5, 2.0], [1.0, 1.0, 1.0], 0.3),
// ]);
// it = 0
// width = 0.54
// for (let i = 0; i < 5; i++) {
//     for (let j = 0; j < 5; j++) {
//         scene.addObject(new WebGLObject("Grass" + it++, grass, Matte_visible, Scene.TransformationMatrix([(j-2)*width, -1.34, (i-2)*width], [0, 0, 0]), Scene.RENDER_MODES.IMATGE, {route: "grass.png"}, 0.27))
//     }
// }


// --------------
// Main
// --------------
const scene = new Scene([
    new WebGLObject("Cube", exampleCube, White_rubber, Scene.TransformationMatrix([0, 0, 0], [0, 0, 0]), Scene.RENDER_MODES.MATERIAL, {}, 0.5),
    new WebGLLight("Light1", [-1.1, 1.5, 2.0], [1.0, 1.0, 1.0], 1),
]);

scene.start()