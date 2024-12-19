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

}

function activateTab(tab) {
    var tabModels = document.getElementById("aria-models")
    var tabLight = document.getElementById("aria-light")
    var tabAnimation = document.getElementById("aria-animation")

    var btnModels = document.getElementById("models-btn")
    var btnLight = document.getElementById("light-btn")
    var btnAnimation = document.getElementById("animation-btn")

    var objectSelect = document.getElementById("objects")
    var lightSelect = document.getElementById("lights")

    switch (tab) {
        case "models":
            tabModels.classList.remove("d-none")
            tabLight.classList.add("d-none")
            tabAnimation.classList.add("d-none")

            btnModels.classList.add("active")
            btnLight.classList.remove("active")
            btnAnimation.classList.remove("active")

            objectSelect.classList.remove("d-none")
            lightSelect.classList.add("d-none")

            showSelectedInfoObjects()
            break;
        
        case "light":
            tabLight.classList.remove("d-none")
            tabAnimation.classList.add("d-none")
            tabModels.classList.add("d-none")

            btnModels.classList.remove("active")
            btnLight.classList.add("active")
            btnAnimation.classList.remove("active")

            objectSelect.classList.add("d-none")
            lightSelect.classList.remove("d-none")

            showSelectedInfoLight()
            break;

        case "animation":
            tabAnimation.classList.remove("d-none")
            tabLight.classList.add("d-none")
            tabModels.classList.add("d-none")

            btnModels.classList.remove("active")
            btnLight.classList.remove("active")
            btnAnimation.classList.add("active")

            objectSelect.classList.remove("d-none")
            lightSelect.classList.add("d-none")

            showSelectedInfoAnimation()
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
            return {route: "gat.png"}
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


    var newTrans = mat4.translate(mat4.create(), mat4.create(), [transX, transY, transZ])
    var newScale = parseFloat(document.getElementById("factor-escalat").value)
    
    const scaleFactor = Math.abs(newScale); // Use absolute value for scaling
    mat4.scale(newTrans, newTrans, [scaleFactor, scaleFactor, scaleFactor]);

    // Flip the model if resize is negative
    if (newScale < 0) {
        mat4.scale(newTrans, newTrans, [-1, -1, -1]); // Invert along all axes
    }

    var aplicarTransformacio = document.getElementById("aplicar-transformacio").checked

    Array.from(objectSelect.options).forEach(option => {
        if (option.selected) {
            scene.updateObject(option.value, {material: materials[materialsSelect.value], renderMode: Scene.RENDER_MODES[renderSelect.value], param: getParameterObject(renderSelect.value)})
            if (aplicarTransformacio)
                scene.updateObject(option.value, {transformation: newTrans, resize: newScale})
            if (newGeometry !== ""){
                scene.updateObject(option.value, {geometry: JSON.parse(newGeometry)})
                scene.initBuffers()
            }
            
            scene.requestAnimationFrame()
        }
    });
    
    showSelectedInfoObjects()
    newGeometry = ""
}

function setLight() {
    
}

function setAnimation() {
    
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
    const infoDiv = document.getElementById("inf-div");
    infoDiv.innerHTML = "";
}

function showSelectedInfoAnimation() {
    const infoDiv = document.getElementById("inf-div");
    infoDiv.innerHTML = "";
}


function newObject() {
    var objName = prompt("Name for the new object");
    var objectSelect = document.getElementById("objects")

    scene.addObject(new WebGLObject(objName, exampleCube, White_plastic, mat4.translate(mat4.create(), mat4.create(), [0.0, 0.0, 0.0]), Scene.RENDER_MODES.MATERIAL, {}, 0.5))
    let option = document.createElement("option");
    option.value = objName;
    option.textContent = objName;
    objectSelect.appendChild(option);

    scene.requestAnimationFrame()
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
