// const scene = new Scene([
//     //new WebGLObject("GlassSphere", exampleSphere, Chrome, mat4.scale(mat4.create(), mat4.create(), [1.5, 1.5, 1.5])),
//     //new WebGLObject("Cube1", exampleCube, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [1.0, 0.0, -1.0]), Scene.RENDER_MODES.MATERIAL),
//     new WebGLObject("Cube2", exampleCube, White_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -1.0]), Scene.RENDER_MODES.IMATGE, {route: "gat.png"}),
//     new WebGLObject("Cube4", exampleCube, White_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 1.0, -1.0]), Scene.RENDER_MODES.IMATGE, {route: "cottage_diffuse3.png"}),
//     new WebGLObject("Cube5", exampleCube, White_rubber, mat4.translate(mat4.create(), mat4.create(), [1.0, 0.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}),
//     new WebGLObject("Cube3", exampleCube, White_rubber, mat4.translate(mat4.create(), mat4.create(), [1.0, 1.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_NUVOLS, {color1: [1, 1, 1], color2: [2, 1, 1], scale: 5}),
//     new WebGLObject("Cube6", exampleCube, White_rubber, mat4.translate(mat4.create(), mat4.create(), [-1.0, 0.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_NUVOLS, {color1: [1, 1, 1], color2: [2, 1, 1], scale: 10}),
//     new WebGLObject("Cube7", exampleCube, White_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, -1.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_NUVOLS, {color1: [1, 10, 1], color2: [0, 1, 3], scale: 10}),
//     new WebGLObject("Cube8", exampleCube, White_rubber, mat4.translate(mat4.create(), mat4.create(), [-1.0, -1.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_NUVOLS, {color1: [1, 1, 1], color2: [2, 1, 1], scale: 5}),
//     new WebGLObject("Cube9", exampleCube, Gold, mat4.translate(mat4.create(), mat4.create(), [-1.0, 1.0, -1.0]), Scene.RENDER_MODES.Material, {color1: [1, 1, 1], color2: [2, 1, 1], scale: 5}),
//     new WebGLObject("Cube10", exampleCube, Ruby, mat4.translate(mat4.create(), mat4.create(), [1.0, -1.0, -1.0]), Scene.RENDER_MODES.MATERIAL, {color1: [1, 1, 1], color2: [2, 1, 1], scale: 5}),

    
//     //new WebGLObject("Cube4", exampleCube, Yellow_plastic, mat4.translate(mat4.create(), mat4.create(), [-1.0, -1.0, -1.0]), Scene.RENDER_MODES.WIREFRAMES),
//     //new WebGLObject("Sable", exampleOBJ, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -30.0]), Scene.RENDER_MODES.IMATGE, {route: "cottage_diffuse3.png"})
//     // new WebGLObject("Torch", torch, Ruby, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, 0.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [255, 255, 0], color2: [0, 0, 0], scale: 1}),
//     // new WebGLObject("Ball", exampleSphere, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}),
//     // new WebGLObject("Ball2", exampleSphere, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}),
//     // new WebGLObject("Ball3", exampleSphere, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}),
//     // new WebGLObject("Ball4", exampleSphere, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}),
//     // new WebGLObject("Ball5", exampleSphere, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}),
//     // new WebGLObject("Ball6", exampleSphere, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}),
//     // new WebGLObject("Ball7", exampleSphere, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}),
//     // new WebGLObject("Ball8", exampleSphere, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}),
//     // new WebGLObject("Ball9", exampleSphere, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}),
//     // new WebGLObject("Ball10", exampleSphere, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}),
//     // new WebGLObject("Ball11", exampleSphere, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}),
//     // new WebGLObject("Ball12", exampleSphere, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}),
//     // new WebGLObject("Ball13", exampleSphere, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}),
//     // new WebGLObject("Ball14", exampleSphere, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}),
//     // new WebGLObject("Ball15", exampleSphere, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}),
//     // new WebGLObject("Ball16", exampleSphere, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}),
//     // new WebGLObject("Ball17", exampleSphere, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}),
//     // new WebGLObject("Ball18", exampleSphere, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}),
//     // new WebGLObject("Ball19", exampleSphere, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}),
//     //new WebGLObject("Map", map, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, -1.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}),
//     //new WebGLObject("Cube", exampleCube, White_rubber, Scene.TransformationMatrix([0, 0, 0], [0, 0, 0]), Scene.RENDER_MODES.MATERIAL, {}, 0.5),

//     //new WebGLObject("Sable", exampleSphere, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -1.0]), Scene.RENDER_MODES.IMATGE, {route: "gat.png"})
//     new WebGLLight("Light1", [1.0, 2.0, 3.0], [1.0, 0.8, 0.6], 1.5),
//     new WebGLLight("Light2", [1.0, 2.0, 3.0], [1.0, 0.8, 0.6], 1.5),
// ]);



const scene = new Scene([
    new WebGLObject("Plain", examplePlane, Obsidian, Scene.TransformationMatrix([0, -0.8, 0], [0, 0, 0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}, 5),
    new WebGLObject("Steve", steve, Ruby, Scene.TransformationMatrix([0, 0.01, 0], [0, 2.7, 0]), Scene.RENDER_MODES.MATERIAL, {route: "steve.png"}, 0.05),
    new WebGLObject("Abella", abella, Ruby, Scene.TransformationMatrix([0.6, -0.77, 1], [0, 4, 0]), Scene.RENDER_MODES.IMATGE, {route: "abella.png"}, 1),
    new WebGLObject("Gat", mgat, Cyan_rubber, Scene.TransformationMatrix([-1.5, -0.74, 0.4], [0, -1.4, 0]), Scene.RENDER_MODES.IMATGE, {route: "mgat.png"}, 0.05),
    new WebGLObject("Senyal", senyal, Cyan_rubber, Scene.TransformationMatrix([0.6, -0.8, 0], [0, -.7, 0]), Scene.RENDER_MODES.IMATGE, {route: "senyal.png"}, 1.2),
    new WebGLObject("Torch1", torch, Cyan_rubber, Scene.TransformationMatrix([-2, -0.61, -1.5], [0, -.7, 0]), Scene.RENDER_MODES.IMATGE, {route: "torch.png"}, 0.3),
    new WebGLObject("Torch2", torch, Cyan_rubber, Scene.TransformationMatrix([2, -0.61, 1.5], [0, -.7, 0]), Scene.RENDER_MODES.IMATGE, {route: "torch.png"}, 0.3),
    new WebGLObject("Torch3", torch, Cyan_rubber, Scene.TransformationMatrix([-2, -0.61, 1.5], [0, -.7, 0]), Scene.RENDER_MODES.IMATGE, {route: "torch.png"}, 0.3),
    new WebGLObject("Torch4", torch, Cyan_rubber, Scene.TransformationMatrix([2, -0.61, -1.5], [0, -.7, 0]), Scene.RENDER_MODES.IMATGE, {route: "torch.png"}, 0.3),

    //new WebGLObject("End", end, Ruby, Scene.TransformationMatrix([1, 0, 0], [0, 0, 0]), Scene.RENDER_MODES.MATERIAL, {}, 1),
    //new WebGLObject("Cube", exampleCube, Obsidian, Scene.TransformationMatrix([-1.1, 1.5, 2.0], [0, 0, 0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}, 0.2),
    new WebGLLight("Light1", [-1.1, 1.5, 2.0], [1.0, 1.0, 1.0], 0.8),
    new WebGLLight("Light2", [-1.1, 1.5, 2.0], [1.0, 1.0, 1.0], 0.2),
    // new WebGLLight("Light2", [1.0, 2.0, 3.0], [1.0, 0.8, 0.6], 1.5),
]);

// const scene = new Scene([
//     new WebGLObject("Cube", exampleCube, White_rubber, Scene.TransformationMatrix([0, 0, 0], [0, 0, 0]), Scene.RENDER_MODES.MATERIAL, {}, 0.5),
//     //new WebGLObject("Cube2", exampleCube, White_rubber, Scene.TransformationMatrix([-1.1, 1.5, 2.0], [0, 0, 0]), Scene.RENDER_MODES.MATERIAL, {}, 0.2),

//     new WebGLLight("Light1", [-1.1, 1.5, 2.0], [1.0, 1.0, 1.0], 1),
// ]);

scene.start()