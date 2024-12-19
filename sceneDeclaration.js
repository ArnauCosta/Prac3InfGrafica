const scene = new Scene([
    //new WebGLObject("GlassSphere", exampleSphere, Chrome, mat4.scale(mat4.create(), mat4.create(), [1.5, 1.5, 1.5])),
    //new WebGLObject("Cube1", exampleCube, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [1.0, 0.0, -1.0]), Scene.RENDER_MODES.MATERIAL),
    //new WebGLObject("Cube2", exampleCube, Ruby, mat4.translate(mat4.create(), mat4.create(), [-1.0, 0.0, -1.0]), Scene.RENDER_MODES.IMATGE, {route: "gat.png"}),
    //new WebGLObject("Cube4", exampleCube, Gold, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -1.0]), Scene.RENDER_MODES.IMATGE, {route: "cottage_diffuse3.png"})
    new WebGLObject("Cube4", exampleCube, Yellow_plastic, mat4.translate(mat4.create(), mat4.create(), [-1.0, -1.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}),
    //new WebGLObject("Cube3", exampleCube, Yellow_plastic, mat4.translate(mat4.create(), mat4.create(), [-1.0, 1.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_NUVOLS, {color1: [1, 1, 1], color2: [2, 1, 1], scale: 5}),
    //new WebGLObject("Cube4", exampleCube, Yellow_plastic, mat4.translate(mat4.create(), mat4.create(), [-1.0, -1.0, -1.0]), Scene.RENDER_MODES.WIREFRAMES),
    //new WebGLObject("Sable", exampleOBJ, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -30.0]), Scene.RENDER_MODES.IMATGE, {route: "cottage_diffuse3.png"})
    new WebGLObject("Torch", torch, Ruby, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, 0.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [255, 255, 0], color2: [0, 0, 0], scale: 1}),
    new WebGLObject("Ball", exampleSphere, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}),
    // new WebGLObject("Ball2", exampleSphere, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}),
    // new WebGLObject("Ball3", exampleSphere, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}),
    // new WebGLObject("Ball4", exampleSphere, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}),
    // new WebGLObject("Ball5", exampleSphere, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}),
    // new WebGLObject("Ball6", exampleSphere, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}),
    // new WebGLObject("Ball7", exampleSphere, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}),
    // new WebGLObject("Ball8", exampleSphere, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}),
    // new WebGLObject("Ball9", exampleSphere, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}),
    // new WebGLObject("Ball10", exampleSphere, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}),
    // new WebGLObject("Ball11", exampleSphere, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}),
    // new WebGLObject("Ball12", exampleSphere, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}),
    // new WebGLObject("Ball13", exampleSphere, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}),
    // new WebGLObject("Ball14", exampleSphere, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}),
    // new WebGLObject("Ball15", exampleSphere, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}),
    // new WebGLObject("Ball16", exampleSphere, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}),
    // new WebGLObject("Ball17", exampleSphere, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}),
    // new WebGLObject("Ball18", exampleSphere, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}),
    // new WebGLObject("Ball19", exampleSphere, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}),
    //new WebGLObject("Map", map, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, -1.0, -1.0]), Scene.RENDER_MODES.PROCEDURAL_SOL, {color1: [1, 1, 1], color2: [1, 1, 2], scale: 5}),

    //new WebGLObject("Sable", exampleSphere, Yellow_rubber, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, -1.0]), Scene.RENDER_MODES.IMATGE, {route: "gat.png"})
    new WebGLLight("Light1", [1.0, 2.0, 3.0], [1.0, 0.8, 0.6], 1.5),
    new WebGLLight("Light2", [1.0, 2.0, 3.0], [1.0, 0.8, 0.6], 1.5),
]);

scene.start()