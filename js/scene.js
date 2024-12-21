class WebGLObject {

    static usedNames = new Set();

    constructor(name, geometry, material, transformation, renderMode = Scene.RENDER_MODES.MATERIAL, param = {}, resize = 1.0) {
        if (WebGLObject.usedNames.has(name)) {
            throw new Error(`The name "${name}" is already in use. Please choose a unique name.`);
        }
        this.name = name;
        this.geometry = geometry; // Example: exampleCube
        this.material = material; // Example: White_plastic
        this.renderMode = renderMode;
        this.param = param;
        this.resize = resize;

        WebGLObject.usedNames.add(name);

        this.transformation = transformation || mat4.create();
        const scaleFactor = Math.abs(resize); // Use absolute value for scaling
        mat4.scale(this.transformation, this.transformation, [scaleFactor, scaleFactor, scaleFactor]);

        // Flip the model if resize is negative
        if (resize < 0) {
            mat4.scale(this.transformation, this.transformation, [-1, -1, -1]); // Invert along all axes
        }
    }

    static releaseName(name) {
        WebGLObject.usedNames.delete(name);
    }

    static restartNames() {
        WebGLObject.usedNames = new Set();
    }

    initBuffers(gl) {
        if (!this.geometry.vertices || !this.geometry.indices) {
            throw new Error("Geometry must have vertices and indices defined.");
        }

        this.vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.geometry.vertices), gl.STATIC_DRAW);

        this.indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.geometry.indices), gl.STATIC_DRAW);

        const wireframeIndices = [];
        for (let i = 0; i < this.geometry.indices.length; i += 3) {
            const a = this.geometry.indices[i];
            const b = this.geometry.indices[i + 1];
            const c = this.geometry.indices[i + 2];
            wireframeIndices.push(a, b, b, c, c, a); // Arestes del triangle
        }

        this.wireframeIndexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.wireframeIndexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(wireframeIndices), gl.STATIC_DRAW);

        this.wireframeIndexCount = wireframeIndices.length;

        // Initialize texture if necessary
        this.initTexture(gl);
    }

    initTexture(gl) {
        if (this.renderMode === Scene.RENDER_MODES.IMATGE && this.param.route) {
            this.texture = Scene.loadTexture(gl, "imatges/" + this.param.route);
        }
    }

    setTransformation(transformation) {
        this.transformation = transformation;
    }

    applyTransformation(transformFunction, ...params) {
        transformFunction(this.transformation, this.transformation, ...params);
    }

    render(gl, program, phi, zeta, radius, fovy) {
        // Set material uniforms
        gl.uniform3fv(program.KaIndex, this.material.mat_ambient);
        gl.uniform3fv(program.KdIndex, this.material.mat_diffuse);
        gl.uniform3fv(program.KsIndex, this.material.mat_specular);
        gl.uniform1f(program.alphaIndex, this.material.alpha[0]);
        //gl.uniform1f(program.texture, this.texture);
        gl.uniform1f(program.renderMode, this.renderMode);


        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        // Set transformation matrices
        const modelViewMatrix = mat4.create();
        mat4.multiply(modelViewMatrix, Scene.getCameraMatrix(phi, zeta, radius,), this.transformation);

        Scene.setShaderModelViewMatrix(gl, program, modelViewMatrix);
        Scene.setShaderNormalMatrix(gl, program, Scene.getNormalMatrix(modelViewMatrix));

        gl.uniform1i(gl.getUniformLocation(program, 'renderMode'), this.renderMode);

        if (this.renderMode == Scene.RENDER_MODES.MATERIAL) {

            gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
            gl.vertexAttribPointer(program.vertexPositionAttribute, 3, gl.FLOAT, false, 8 * 4, 0);
            gl.vertexAttribPointer(program.vertexNormalAttribute, 3, gl.FLOAT, false, 8 * 4, 3 * 4);
            gl.vertexAttribPointer(program.vertexTexcoordsAttribute, 2, gl.FLOAT, false, 8 * 4, 6 * 4);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            gl.drawElements(gl.TRIANGLES, this.geometry.indices.length, gl.UNSIGNED_SHORT, 0);

        } else if (this.renderMode == Scene.RENDER_MODES.IMATGE) {

            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            gl.uniform1i(gl.getUniformLocation(program, "myTexture"), 0);

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    
            // Optionally, set wrapping to avoid distortion at the edges
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);

            gl.vertexAttribPointer(program.vertexPositionAttribute, 3, gl.FLOAT, false, 8 * 4, 0);
            gl.vertexAttribPointer(program.vertexNormalAttribute, 3, gl.FLOAT, false, 8 * 4, 3 * 4);
            gl.vertexAttribPointer(program.vertexTexcoordsAttribute, 2, gl.FLOAT, false, 8 * 4, 6 * 4);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            gl.drawElements(gl.TRIANGLES, this.geometry.indices.length, gl.UNSIGNED_SHORT, 0);

        } else if (this.renderMode == Scene.RENDER_MODES.PROCEDURAL_SOL) {
            gl.uniform3f(program.Color1Index, this.param["color1"][0], this.param["color1"][1], this.param["color1"][2]);
            gl.uniform3f(program.Color2Index, this.param["color2"][0], this.param["color2"][1], this.param["color2"][2]);
            gl.uniform1f(program.ScaleIndex, this.param["scale"]);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
            gl.vertexAttribPointer(program.vertexPositionAttribute, 3, gl.FLOAT, false, 8 * 4, 0);
            gl.vertexAttribPointer(program.vertexNormalAttribute, 3, gl.FLOAT, false, 8 * 4, 3 * 4);
            gl.vertexAttribPointer(program.vertexTexcoordsAttribute, 2, gl.FLOAT, false, 8 * 4, 6 * 4);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            gl.drawElements(gl.TRIANGLES, this.geometry.indices.length, gl.UNSIGNED_SHORT, 0);
        } else if (this.renderMode == Scene.RENDER_MODES.PROCEDURAL_NUVOLS) {
            gl.uniform3f(program.Color1Index, this.param["color1"][0], this.param["color1"][1], this.param["color1"][2]);
            gl.uniform3f(program.Color2Index, this.param["color2"][0], this.param["color2"][1], this.param["color2"][2]);
            gl.uniform1f(program.ScaleIndex, this.param["scale"]);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
            gl.vertexAttribPointer(program.vertexPositionAttribute, 3, gl.FLOAT, false, 8 * 4, 0);
            gl.vertexAttribPointer(program.vertexNormalAttribute, 3, gl.FLOAT, false, 8 * 4, 3 * 4);
            gl.vertexAttribPointer(program.vertexTexcoordsAttribute, 2, gl.FLOAT, false, 8 * 4, 6 * 4);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            gl.drawElements(gl.TRIANGLES, this.geometry.indices.length, gl.UNSIGNED_SHORT, 0);
        } else if (this.renderMode == Scene.RENDER_MODES.WIREFRAMES) {
            gl.lineWidth(2.0);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
            gl.vertexAttribPointer(program.vertexPositionAttribute, 3, gl.FLOAT, false, 8 * 4, 0);
            gl.vertexAttribPointer(program.vertexTexcoordsAttribute, 2, gl.FLOAT, false, 8 * 4, 6 * 4);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.wireframeIndexBuffer);

            gl.enableVertexAttribArray(program.vertexPositionAttribute);
            // Dibuixa com a línies
            gl.drawElements(gl.LINES, this.wireframeIndexCount, gl.UNSIGNED_SHORT, 0);
        }

        // Bind buffers and draw the geometry



    }
}

class WebGLLight {
    static usedNames = new Set();

    constructor(name, position = [0.0, 0.0, 0.0], color = [0.0, 0.0, 0.0], intensity = 1.5) {
        if (WebGLLight.usedNames.has(name)) {
            throw new Error(`The name "${name}" is already in use. Please choose a unique name.`);
        }
        this.name = name
        this.position = position
        this.color = color
        this.intensity = intensity
        WebGLLight.usedNames.add(name);
    }


    static releaseName(name) {
        WebGLLight.usedNames.delete(name);
    }

    static restartNames() {
        WebGLLight.usedNames = new Set();
    }
}


class Scene {

    static RENDER_MODES = {
        MATERIAL: 0,
        IMATGE: 1,
        PROCEDURAL_SOL: 2,
        PROCEDURAL_NUVOLS: 3,
        WIREFRAMES: 4
    };

    constructor(objects = [], zeta = -0.5, phi = 1, radius = 3, fovy = 1.5, canvasId = "myCanvas") {
        this.webGlObjects = objects.filter(item => item instanceof WebGLObject);
        this.webGlLights = objects.filter(item => item instanceof WebGLLight);

        this.gl = Scene.getWebGLContext(canvasId);
        this.program = this.gl.createProgram();
        this.bgColor = [0.95, 0.95, 0.95, 1.0];


        this.initShaders();
        this.initBuffers();
        this.initRendering();
        this.initHandlers(canvasId);

        this.zeta = zeta;
        this.phi = phi
        this.radius = radius
        this.fovy = fovy;
        this.started = false;
    }

    addObject(Object) {
        this.webGlObjects.push(Object)
        this.initBuffers()
    }

    addLight(Light) {
        this.webGlLights.push(Light)
        this.initBuffers()
        this.initRendering()
    }

    removeObject(name) {
        this.webGlObjects = this.webGlObjects.filter(item => item.name !== name);
        WebGLObject.releaseName(name)
        this.initBuffers()
    }

    removeLight(name) {
        this.webGlLights = this.webGlLights.filter(item => item.name !== name);
        WebGLLight.releaseName(name)
        this.initBuffers()
        this.initRendering()
    }

    getObject(name) {
        return this.webGlObjects.find(item => item.name === name);
    }

    getLight(name) {
        return this.webGlLights.find(item => item.name === name);
    }

    updateObject(name, updates) {
        const object = this.webGlObjects.find(obj => obj.name === name);

        if (!object) {
            console.error(`Object with name "${name}" not found.`);
            return;
        }

        Object.keys(updates).forEach(key => {
            if (object.hasOwnProperty(key)) {
                object[key] = updates[key];
            } else {
                console.warn(`Property "${key}" does not exist on the object "${name}".`);
            }
        });

    }

    updateLight(name, updates) {
        const object = this.webGlLights.find(obj => obj.name === name);

        if (!object) {
            console.error(`Object with name "${name}" not found.`);
            return;
        }

        Object.keys(updates).forEach(key => {
            if (object.hasOwnProperty(key)) {
                object[key] = updates[key];
            } else {
                console.warn(`Property "${key}" does not exist on the object "${name}".`);
            }
        });

    }

    render() {
        this.webGlObjects.forEach((obj) => {
            obj.render(this.gl, this.program, this.phi, this.zeta, this.radius, this.fovy);
        });
    }

    initBuffers() {
        this.webGlObjects.forEach((obj) => {
            obj.initBuffers(this.gl);
        });
    }

    start() {
        this.started = true
        requestAnimationFrame(this.drawScene.bind(this))
        setTimeout(() => {
            requestAnimationFrame(this.drawScene.bind(this))
        }, 500)
    }

    requestAnimationFrame() {
        requestAnimationFrame(this.drawScene.bind(this))
        setTimeout(() => {
            requestAnimationFrame(this.drawScene.bind(this))
        }, 500)
    }

    drawScene() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.setShaderProjectionMatrix(this.getProjectionMatrix());

        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.setShaderProjectionMatrix(this.getProjectionMatrix());

        this.render()
    }

    setShaderProjectionMatrix(projectionMatrix) {

        this.gl.uniformMatrix4fv(this.program.projectionMatrixIndex, false, projectionMatrix);

    }

    getProjectionMatrix() {

        return mat4.perspective(mat4.create(), this.fovy, 1.0, 0.1, 100.0);

    }

    initShaders() {
        var vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(vertexShader, document.getElementById("myVertexShader").text);
        this.gl.compileShader(vertexShader);
        if (!this.gl.getShaderParameter(vertexShader, this.gl.COMPILE_STATUS)) {
            alert(this.gl.getShaderInfoLog(vertexShader));
            return null;
        }

        var fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(fragmentShader, document.getElementById("myFragmentShader").text);
        this.gl.compileShader(fragmentShader);
        if (!this.gl.getShaderParameter(fragmentShader, this.gl.COMPILE_STATUS)) {
            alert(this.gl.getShaderInfoLog(fragmentShader));
            return null;
        }

        this.gl.attachShader(this.program, vertexShader);
        this.gl.attachShader(this.program, fragmentShader);

        this.gl.linkProgram(this.program);
        this.gl.useProgram(this.program);

        this.program.vertexPositionAttribute = this.gl.getAttribLocation(this.program, "VertexPosition");
        this.gl.enableVertexAttribArray(this.program.vertexPositionAttribute);

        this.program.modelViewMatrixIndex = this.gl.getUniformLocation(this.program, "modelViewMatrix");
        this.program.projectionMatrixIndex = this.gl.getUniformLocation(this.program, "projectionMatrix");

        this.program.vertexNormalAttribute = this.gl.getAttribLocation(this.program, "VertexNormal");
        this.program.normalMatrixIndex = this.gl.getUniformLocation(this.program, "normalMatrix");
        this.gl.enableVertexAttribArray(this.program.vertexNormalAttribute);

        this.program.vertexTexcoordsAttribute = this.gl.getAttribLocation(this.program, "VertexTexcoords");
        this.gl.enableVertexAttribArray(this.program.vertexTexcoordsAttribute);
        this.program.myTextureIndex = this.gl.getUniformLocation(this.program, 'myTexture');
        this.program.repetition = this.gl.getUniformLocation(this.program, "repetition");
        this.gl.uniform1i(this.program.myTextureIndex, 3);
        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);

        this.gl.uniform1f(this.program.repetition, 1.0);

        this.program.KaIndex = this.gl.getUniformLocation(this.program, "Material.Ka");
        this.program.KdIndex = this.gl.getUniformLocation(this.program, "Material.Kd");
        this.program.KsIndex = this.gl.getUniformLocation(this.program, "Material.Ks");
        this.program.alphaIndex = this.gl.getUniformLocation(this.program, "Material.alpha");


        this.program.LaIndex = this.gl.getUniformLocation(this.program, "Light.La");
        this.program.LdIndex = this.gl.getUniformLocation(this.program, "Light.Ld");
        this.program.LsIndex = this.gl.getUniformLocation(this.program, "Light.Ls");
        this.program.PositionIndex = this.gl.getUniformLocation(this.program, "Light.Position");
        this.program.ScaleIndex = this.gl.getUniformLocation(this.program, "Scale");

        this.program.Color1Index = this.gl.getUniformLocation(this.program, "Color1");
        this.program.Color2Index = this.gl.getUniformLocation(this.program, "Color2");

        this.program.numLightsIndex = this.gl.getUniformLocation(this.program, "numLights");
        // Com no podem fer getUniformLocation directament d'un array, ho farem per nom:
        // Lights[i].Position, Lights[i].La, etc.
        // Guardarem les locations en arrays per facilitar l'assignació posterior.
        this.program.LightsPosition = [];
        this.program.LightsLa = [];
        this.program.LightsLd = [];
        this.program.LightsLs = [];

        for (let i = 0; i < 10; i++) {
            this.program.LightsPosition.push(this.gl.getUniformLocation(this.program, `Lights[${i}].Position`));
            this.program.LightsLa.push(this.gl.getUniformLocation(this.program, `Lights[${i}].La`));
            this.program.LightsLd.push(this.gl.getUniformLocation(this.program, `Lights[${i}].Ld`));
            this.program.LightsLs.push(this.gl.getUniformLocation(this.program, `Lights[${i}].Ls`));
        }

        this.gl.uniform3f(this.program.Color1Index, 1.0, 1.0, 1.0);
        this.gl.uniform3f(this.program.Color2Index, 1.0, 1.0, 1.0);
    }

    initRendering() {
        this.gl.clearColor(this.bgColor[0], this.bgColor[1], this.bgColor[2], this.bgColor[3]);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.setShaderLight();
    }

    setShaderLight() {
        const gl = this.gl;

        // Limitem el nombre de llums al màxim definit als shaders
        const maxLights = 10;
        const numLights = Math.min(this.webGlLights.length, maxLights);
        gl.uniform1i(this.program.numLightsIndex, numLights);

        for (let i = 0; i < numLights; i++) {
            const light = this.webGlLights[i];

            // La, Ld, Ls poden ser iguals per simplicitat o variar
            let La = [light.color[0] * 0.2 * light.intensity, light.color[1] * 0.2 * light.intensity, light.color[2] * 0.2 * light.intensity];
            let Ld = [light.color[0] * light.intensity, light.color[1] * light.intensity, light.color[2] * light.intensity];
            let Ls = [light.color[0] * light.intensity, light.color[1] * light.intensity, light.color[2] * light.intensity];

            gl.uniform3fv(this.program.LightsPosition[i], light.position);
            gl.uniform3fv(this.program.LightsLa[i], La);
            gl.uniform3fv(this.program.LightsLd[i], Ld);
            gl.uniform3fv(this.program.LightsLs[i], Ls);
        }
    }

    setClearColor(color) {
        this.bgColor = color
        this.gl.clearColor(color[0], color[1], color[2], color[3]);
    }

    getClearColor() {
        return this.bgColor
    }

    initHandlers(canvasId) {

        var mouseDown = false;
        var lastMouseX;
        var lastMouseY;

        var canvas = document.getElementById(canvasId);

        canvas.addEventListener("mousedown",
            function (event) {
                mouseDown = true;
                lastMouseX = event.clientX;
                lastMouseY = event.clientY;
            },
            false);

        canvas.addEventListener("mouseup",
            function () {
                mouseDown = false;
            },
            false);

        canvas.addEventListener("wheel", (event) => {

            var delta = 0.0;

            if (event.deltaMode == 0)
                delta = event.deltaY * 0.001;
            else if (event.deltaMode == 1)
                delta = event.deltaY * 0.03;
            else
                delta = event.deltaY;
            if (event.shiftKey == 1) {
                this.fovy *= Math.exp(-delta)
                this.fovy = Math.max(0.1, Math.min(3.0, fovy));
            } else {
                this.radius *= Math.exp(-delta);
                this.radius = Math.max(Math.min(this.radius, 30), 0.05);
            }
            event.preventDefault();
            //this.drawScene()
            if (this.started)
                requestAnimationFrame(this.drawScene.bind(this))
        }, false);
        canvas.addEventListener("mousemove", (event) => {

            if (!mouseDown) {
                return;
            }
            var newX = event.clientX;
            var newY = event.clientY;

            this.zeta -= (newX - lastMouseX) * 0.005;
            this.phi -= (newY - lastMouseY) * 0.005;

            var margen = 0.01;
            this.phi = Math.min(Math.max(this.phi, margen), Math.PI - margen);

            lastMouseX = newX
            lastMouseY = newY;

            event.preventDefault();
            if (this.started)
                requestAnimationFrame(this.drawScene.bind(this))
            //this.drawScene()

        },
            false);

    }

    getObjects() {
        return this.webGlObjects
    }

    getLights() {
        return this.webGlLights
    }

    static getCameraMatrix(phi, zeta, radius) {

        // coordenadas esféricas a rectangulares: https://en.wikipedia.org/wiki/Spherical_coordinate_system
        var x = radius * Math.sin(phi) * Math.sin(zeta);
        var y = radius * Math.cos(phi);
        var z = radius * Math.sin(phi) * Math.cos(zeta);

        return mat4.lookAt(mat4.create(), [x, y, z], [0, 0, 0], [0, 1, 0]);

    }

    static setShaderProjectionMatrix(gl, program, projectionMatrix) {
        gl.uniformMatrix4fv(program.projectionMatrixIndex, false, projectionMatrix);
    }

    static setShaderModelViewMatrix(gl, program, modelViewMatrix) {
        gl.uniformMatrix4fv(program.modelViewMatrixIndex, false, modelViewMatrix);
    }

    static setShaderNormalMatrix(gl, program, normalMatrix) {
        gl.uniformMatrix3fv(program.normalMatrixIndex, false, normalMatrix);
    }

    static getNormalMatrix(modelViewMatrix) {
        return mat3.normalFromMat4(mat3.create(), modelViewMatrix);
    }

    static getProjectionMatrix(fovy) {
        return mat4.perspective(mat4.create(), fovy, 1.0, 0.1, 100.0);
    }


    static getWebGLContext(canvasId) {
        var canvas = document.getElementById(canvasId);
        try {
            return canvas.getContext("webgl2", { stencil: true });
        }
        catch (e) {
        }
        return null;
    }

    static loadTexture(gl, url) {
        const texture = gl.createTexture();
        const image = new Image();
        image.onload = () => {
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            gl.generateMipmap(gl.TEXTURE_2D);

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        };
        image.src = url;
        return texture;
    }

    static TransformationMatrix(position, rotation) {
        // position: [px, py, pz]
        // rotation: [rx, ry, rz] in radians

        // Create a new identity matrix
        const transformation = mat4.create();

        // Apply translation
        mat4.translate(transformation, transformation, position);

        // Apply rotation around X-axis
        mat4.rotateX(transformation, transformation, rotation[0]);

        // Apply rotation around Y-axis
        mat4.rotateY(transformation, transformation, rotation[1]);

        // Apply rotation around Z-axis
        mat4.rotateZ(transformation, transformation, rotation[2]);

        return transformation;
    }

    exportJSON() {
        const objectsData = this.webGlObjects.map(obj => ({
            name: obj.name,
            geometry: {
                vertices: obj.geometry.vertices,
                indices: obj.geometry.indices
            },
            material: {
                ambient: obj.material.mat_ambient,
                diffuse: obj.material.mat_diffuse,
                specular: obj.material.mat_specular,
                alpha: obj.material.alpha
            },
            transformation: Array.from(obj.transformation),
            renderMode: obj.renderMode,
            param: obj.param,
            resize: obj.resize
        }));

        const lightsData = this.webGlLights.map(light => ({
            name: light.name,
            position: light.position,
            color: light.color,
            intensity: light.intensity
        }));

        return JSON.stringify({
            bgColor: this.bgColor,
            objects: objectsData,
            lights: lightsData
        }, null, 2); // Pretty print with 2 spaces
    }

    importJSON(jsonString) {
        WebGLLight.restartNames();
        WebGLObject.restartNames();
        try {
            const data = JSON.parse(jsonString);

            // Validate and recreate WebGLObject instances
            this.webGlObjects = data.objects.map(objData => {
                const geometry = {
                    vertices: objData.geometry.vertices,
                    indices: objData.geometry.indices
                };

                const material = {
                    mat_ambient: objData.material.ambient,
                    mat_diffuse: objData.material.diffuse,
                    mat_specular: objData.material.specular,
                    alpha: objData.material.alpha
                };

                const transformation = new Float32Array(objData.transformation);
                var objecte = new WebGLObject(
                    objData.name,
                    geometry,
                    material,
                    transformation,
                    objData.renderMode,
                    objData.param,
                    1
                )
                objecte.resize = objData.resize
                return objecte;
            });

            // Validate and recreate WebGLLight instances
            this.webGlLights = data.lights.map(lightData => {
                return new WebGLLight(
                    lightData.name,
                    lightData.position,
                    lightData.color,
                    lightData.intensity
                );
            });

            this.bgColor = data.bgColor

            // Reinitialize buffers
            this.initShaders();
            this.initBuffers();
            this.initRendering();
        } catch (error) {
            console.error("Failed to import JSON:", error);
        }
    }

}