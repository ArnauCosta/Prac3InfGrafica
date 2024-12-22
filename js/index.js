window.onload = () => {
    var objectSelect = document.getElementById("objects")
    var lightSelect = document.getElementById("lights")
    var materialsSelect = document.getElementById("materials")
    var renderModeSelect = document.getElementById("render-mode")

    scene.getObjects().forEach(element => {
        let option = document.createElement("option");
        option.value = element.name;
        option.textContent = element.name;
        objectSelect.appendChild(option);
    });

    scene.getLights().forEach(element => {
        let option = document.createElement("option");
        option.value = element.name;
        option.textContent = element.name;
        lightSelect.appendChild(option);
    });

    var i = 0
    materials.forEach(element => {
        let option = document.createElement("option");
        option.value = i;
        i++;
        option.textContent = element.name;
        materialsSelect.appendChild(option);
    });
    

    objectSelect.addEventListener("change", showSelectedInfoObjects)
    showSelectedInfoObjects()

    renderModeSelect.addEventListener("change", (e) => {
        const elements = document.querySelectorAll('[id^="render-mode-"]');

        elements.forEach(element => {
          element.classList.add('d-none');
        });

        var mode = e.target.value.toLowerCase()
        document.getElementById("render-mode-"+mode).classList.remove("d-none")
    })

    const fileInput = document.getElementById("fileInput");
    fileInput.addEventListener("change", function(event) {
        const file = event.target.files[0];
        fileInput.value = "";
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const jsonString = e.target.result;
                scene.importJSON(jsonString)
                scene.requestAnimationFrame()

                var objectSelect = document.getElementById("objects")
                var lightSelect = document.getElementById("lights")
                lightSelect.innerHTML = ""
                objectSelect.innerHTML = ""

                scene.getObjects().forEach(element => {
                    let option = document.createElement("option");
                    option.value = element.name;
                    option.textContent = element.name;
                    objectSelect.appendChild(option);
                });
            
                scene.getLights().forEach(element => {
                    let option = document.createElement("option");
                    option.value = element.name;
                    option.textContent = element.name;
                    lightSelect.appendChild(option);
                });
            };
            reader.readAsText(file);
        }
    });

}

var activeTab = "models"
function activateTab(tab) {
    var tabModels = document.getElementById("aria-models")
    var tabLight = document.getElementById("aria-light")
    var tabShader = document.getElementById("aria-shader")

    var btnModels = document.getElementById("models-btn")
    var btnLight = document.getElementById("light-btn")
    var btnShader = document.getElementById("shader-btn")

    var objectSelect = document.getElementById("objects")
    var lightSelect = document.getElementById("lights")

    var btnAfegir = document.getElementById("btn-afegir-obj")

    switch (tab) {
        case "models":
            tabModels.classList.remove("d-none")
            tabLight.classList.add("d-none")
            tabShader.classList.add("d-none")

            btnModels.classList.add("active")
            btnLight.classList.remove("active")
            btnShader.classList.remove("active")

            objectSelect.classList.remove("d-none")
            lightSelect.classList.add("d-none")
            btnAfegir.classList.remove("d-none")
            activeTab = "models"
            showSelectedInfoObjects()
            break;
        
        case "light":
            tabLight.classList.remove("d-none")
            tabShader.classList.add("d-none")
            tabModels.classList.add("d-none")

            btnModels.classList.remove("active")
            btnLight.classList.add("active")
            btnShader.classList.remove("active")

            objectSelect.classList.add("d-none")
            lightSelect.classList.remove("d-none")
            btnAfegir.classList.remove("d-none")
            activeTab = "light"
            showSelectedInfoLight()
            break;

        case "shader":
            tabShader.classList.remove("d-none")
            tabLight.classList.add("d-none")
            tabModels.classList.add("d-none")

            btnModels.classList.remove("active")
            btnLight.classList.remove("active")
            btnShader.classList.add("active")

            objectSelect.classList.add("d-none")
            lightSelect.classList.add("d-none")
            btnAfegir.classList.add("d-none")
            activeTab = "shader"
            showSelectedInfoShader()
            break;
    
        default:
            break;
    }
}

function hexToRgbArray(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = ((bigint >> 16) & 255) / 255;
    const g = ((bigint >> 8) & 255) / 255;
    const b = (bigint & 255) / 255;
    return [r, g, b];
}

function getParameterObject(renderMode) {
    switch (renderMode) {
        case "MATERIAL":
            return {}
        case "IMATGE":
            var imageValue = document.getElementById("image-texture").value
            return {route: imageValue}
        case "PROCEDURAL_SOL":
            const color1 = document.getElementById('color1-sol').value;
            const color2 = document.getElementById('color2-sol').value;
            const scale = document.getElementById('sol-scale').value;
    
            const result = {
                color1: hexToRgbArray(color1),
                color2: hexToRgbArray(color2),
                scale: parseFloat(scale)
            };
            return result
        case "PROCEDURAL_NUVOLS":
            
            const sky = document.getElementById('color1-nuvol').value;
            const nuvol = document.getElementById('color2-nuvol').value;
            const scaleNuvol = document.getElementById('nuvol-scale').value;

            const resultNuvol = {
                color1: hexToRgbArray(nuvol),
                color2: hexToRgbArray(sky),
                scale: parseFloat(scaleNuvol)
            };
            return resultNuvol
        case "WIREFRAMES":
            return {}
        default:
            return {}
    }
}

var newGeometry = ""
function setNewGeometry() {
    newGeometry = prompt("Set your new geometry")
}

function setModel() {
    var objectSelect = document.getElementById("objects")
    var materialsSelect = document.getElementById("materials")
    var renderSelect = document.getElementById("render-mode")

    const transX = document.getElementById("trans-x").value
    const transY = document.getElementById("trans-y").value
    const transZ = document.getElementById("trans-z").value

    const rotX = document.getElementById("rot-x").value
    const rotY = document.getElementById("rot-y").value
    const rotZ = document.getElementById("rot-z").value

    
    var newTrans = Scene.TransformationMatrix([transX, transY, transZ], [rotX, rotY, rotZ])
    var newScale = parseFloat(document.getElementById("factor-escalat").value)
    
    const scaleFactor = Math.abs(newScale); // Use absolute value for scaling
    mat4.scale(newTrans, newTrans, [scaleFactor, scaleFactor, scaleFactor]);

    // Flip the model if resize is negative
    if (newScale < 0) {
        mat4.scale(newTrans, newTrans, [-1, -1, -1]); // Invert along all axes
    }

    var aplicarTransformacio = document.getElementById("aplicar-transformacio").checked
    console.log(getParameterObject(renderSelect.value), "New parameter")
    Array.from(objectSelect.options).forEach(option => {
        if (option.selected) {
            scene.updateObject(option.value, {material: materials[materialsSelect.value], renderMode: Scene.RENDER_MODES[renderSelect.value], param: getParameterObject(renderSelect.value)})
            if (aplicarTransformacio)
                scene.updateObject(option.value, {transformation: newTrans, resize: newScale})
            if (newGeometry !== ""){
                scene.updateObject(option.value, {geometry: JSON.parse(newGeometry)})
                scene.initBuffers()
            }
            if (Scene.RENDER_MODES[renderSelect.value] == Scene.RENDER_MODES.IMATGE) {
                scene.initBuffers()
            }
            
            scene.requestAnimationFrame()
        }
    });
    
    showSelectedInfoObjects()
    newGeometry = ""
}

function setLight() {
    var lightSelect = document.getElementById("lights")
    const selectedValues = Array.from(lightSelect.selectedOptions).map(option => option.value);
    const color = document.getElementById('llum-color').value;

    var rgbArray = hexToRgbArray(color);
    const llumX = document.getElementById("llum-x").value
    const llumY = document.getElementById("llum-y").value
    const llumZ = document.getElementById("llum-z").value

    const intensity = parseFloat(document.getElementById("intensity-light").value)

    selectedValues.forEach(value => {
        scene.updateLight(value, {position: [llumX, llumY, llumZ], color: rgbArray, intensity: intensity})
    });
    //scene.initBuffers()
    scene.initRendering()
    scene.requestAnimationFrame()
    showSelectedInfoLight()
}

function setShader() {
    var range = document.getElementById("toon-shader").value

    scene.setToonShaderLevel(range)
    scene.requestAnimationFrame()
}



function showSelectedInfoObjects() {
    var objectSelect = document.getElementById("objects")

    const selectedValues = Array.from(objectSelect.selectedOptions).map(option => option.value);
    const infoDiv = document.getElementById("inf-div");

    // Clear existing content in the info-div
    infoDiv.innerHTML = "";

    // Create a table to display the information
    const table = document.createElement("table");
    table.className = "table table-hover table-striped  align-middle"; // Bootstrap classes

    const getRenderModeName = (value) => {
        const renderModes = Object.entries(Scene.RENDER_MODES);
        const mode = renderModes.find(([, v]) => v === value);
        return mode ? mode[0] : "Unknown";
    };

    // Table header
    table.innerHTML = `
        <thead class="">
            <tr>
                <th>Name</th>
                <th>Geometry</th>
                <th>Material</th>
                <th>Render Mode</th>
                <th>Params</th>
                <th>Scale f.</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    const tableBody = table.querySelector("tbody");

    // Iterate through selected values
    selectedValues.forEach(value => {
        const object = scene.getObject(value); // Assuming `scene` is your Scene instance

        if (object) {
            // Table row
            const row = document.createElement("tr");

            // Name column
            const nameCell = document.createElement("th");
            nameCell.textContent = object.name;

            // Geometry column
            const geometryCell = document.createElement("td");
            const verticesPreview = JSON.stringify(object.geometry.vertices.slice(0, 5)); // Preview first 5 vertices
            const indicesPreview = JSON.stringify(object.geometry.indices.slice(0, 5)); // Preview first 5 indices
            geometryCell.innerHTML = `
                <strong>Vertices:</strong> ${verticesPreview}...<br>
                <strong>Indices:</strong> ${indicesPreview}...
            `;

            // Material column
            const materialCell = document.createElement("td");
            materialCell.textContent = object.material.name;

            // Render mode column
            const renderModeCell = document.createElement("td");
            renderModeCell.textContent = getRenderModeName(object.renderMode);


            const paramCell = document.createElement("td");
            paramCell.textContent = JSON.stringify(object.param);

            const resizeCell = document.createElement("td");
            resizeCell.textContent = JSON.stringify(object.resize);

            // Action column
            const actionCell = document.createElement("td");
            const copyButton = document.createElement("button");
            copyButton.className = "btn btn-sm btn-primary";
            copyButton.textContent = "Copy Geometry";
            copyButton.addEventListener("click", () => {
                const geometryData = JSON.stringify(object.geometry, null, 2); // Full geometry data
                navigator.clipboard.writeText(geometryData)
                    .then(() => alert(`Geometry of "${object.name}" copied to clipboard!`))
                    .catch(err => console.error("Failed to copy geometry:", err));
            });
            actionCell.appendChild(copyButton);

            // Append cells to the row
            row.appendChild(nameCell);
            row.appendChild(geometryCell);
            row.appendChild(materialCell);
            row.appendChild(renderModeCell);
            row.appendChild(paramCell);
            row.appendChild(resizeCell);
            row.appendChild(actionCell);

            // Append row to the table body
            tableBody.appendChild(row);
        } else {
            console.warn(`Object with name "${value}" not found.`);
        }
    });

    // Append the table to the info-div
    infoDiv.appendChild(table);
};


function showSelectedInfoLight() {
    var objectSelect = document.getElementById("lights")

    const selectedValues = Array.from(objectSelect.selectedOptions).map(option => option.value);
    const infoDiv = document.getElementById("inf-div");

    // Clear existing content in the info-div
    infoDiv.innerHTML = "";

    // Create a table to display the information
    const table = document.createElement("table");
    table.className = "table table-hover table-striped  align-middle"; // Bootstrap classes

    const getRenderModeName = (value) => {
        const renderModes = Object.entries(Scene.RENDER_MODES);
        const mode = renderModes.find(([, v]) => v === value);
        return mode ? mode[0] : "Unknown";
    };

    // Table header
    table.innerHTML = `
        <thead class="">
            <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Color</th>
                <th>Intensity</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    const tableBody = table.querySelector("tbody");

    // Iterate through selected values
    selectedValues.forEach(value => {
        const object = scene.getLight(value); // Assuming `scene` is your Scene instance
        if (object) {
            // Table row
            const row = document.createElement("tr");

            // Name column
            const nameCell = document.createElement("th");
            nameCell.textContent = object.name;


            // Material column
            const positionCell = document.createElement("td");
            positionCell.textContent = object.position;

            // Render mode column
            const colorCell = document.createElement("td");
            colorCell.textContent = object.color;


            const intensityCell = document.createElement("td");
            intensityCell.textContent = JSON.stringify(object.intensity);


            // Append cells to the row
            row.appendChild(nameCell);
            row.appendChild(positionCell);
            row.appendChild(colorCell);
            row.appendChild(intensityCell);


            // Append row to the table body
            tableBody.appendChild(row);
        } else {
            console.warn(`Object with name "${value}" not found.`);
        }
    });

    // Append the table to the info-div
    infoDiv.appendChild(table);

}

function showSelectedInfoShader() {
    const infoDiv = document.getElementById("inf-div");
    infoDiv.innerHTML = "";
}


function newObject() {
    console.log(activeTab)
    if (activeTab == "light") {
        if (scene.getLights().length == 10) {
            alert("Nomes es poden tindre 10 llums com a molt")
            return
        }
        var objName = prompt("Nom per la nova llum");
        var objectSelect = document.getElementById("lights")
    
        scene.addLight(new WebGLLight(objName, [0, 0, 0], [1.0, 1.0, 1.0], 8))
        let option = document.createElement("option");
        option.value = objName;
        option.textContent = objName;
        objectSelect.appendChild(option);
    
        scene.requestAnimationFrame()
    } else if (activeTab == "models") {
        var objName = prompt("Nom per el nou objecte");
        var objectSelect = document.getElementById("objects")
    
        scene.addObject(new WebGLObject(objName, exampleCube, White_plastic, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, 0.0]), Scene.RENDER_MODES.MATERIAL, {}, 0.5))
        let option = document.createElement("option");
        option.value = objName;
        option.textContent = objName;
        objectSelect.appendChild(option);
    
        scene.requestAnimationFrame()
    } else if (activeTab == "shader") {

    }
}

function deleteObjects() {
    var objectSelect = document.getElementById("objects")

    const selectedValues = Array.from(objectSelect.selectedOptions).map(option => option.value);
    selectedValues.forEach(element => {
        scene.removeObject(element)

        for (let i = objectSelect.options.length - 1; i >= 0; i--) {
            const option = objectSelect.options[i];
            if (option.value == element)
                objectSelect.remove(i);
        }
    });

    scene.requestAnimationFrame()

}

function deleteLights() {
    var objectSelect = document.getElementById("lights")

    const selectedValues = Array.from(objectSelect.selectedOptions).map(option => option.value);
    selectedValues.forEach(element => {
        scene.removeLight(element)

        for (let i = objectSelect.options.length - 1; i >= 0; i--) {
            const option = objectSelect.options[i];
            if (option.value == element)
                objectSelect.remove(i);
        }
    });

    scene.initRendering()
    scene.requestAnimationFrame()
    showSelectedInfoLight()

}


function importJson() {
    const fileInput = document.getElementById("fileInput");
    fileInput.click();
}

function exportJson() {
    const blob = new Blob([scene.exportJSON()], { type: "application/json" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "scene.json";

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function changeImage() {
    var imageValue = document.getElementById("image-texture").value
    document.getElementById("img-texture").src = "imatges/"+imageValue
}


var modalElement = document.getElementById('myOptionsModal');
var modalInstance = new bootstrap.Modal(modalElement);
function modalOptions() {
    

    document.getElementById('zeta').value = scene.zeta;
    document.getElementById('phi').value = scene.phi;
    document.getElementById('radius').value = scene.radius;
    document.getElementById('fovy').value = scene.fovy;
    document.getElementById('bg-color').value = scene.getClearColor();


    modalInstance.show();
}


function sendModal() {
    const zetaVal = document.getElementById('zeta').value;
    const phiVal = document.getElementById('phi').value;
    const radiusVal = document.getElementById('radius').value;
    const fovyVal = document.getElementById('fovy').value;
    const clearColor = document.getElementById('bg-color').value

    scene.zeta = zetaVal;
    scene.phi = phiVal;
    scene.radius = radiusVal;
    scene.fovy = fovyVal;
    scene.setClearColor(clearColor.split(',').map(parseFloat))

    scene.requestAnimationFrame()
    modalInstance.hide()
}