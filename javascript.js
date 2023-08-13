function generateGrid(height, width){
    const gridContainer = document.querySelector(".grid-container");

    const boxWidth = 100/width + '%'

    for (let i = 0; i< height; i++){
        for (let j = 0; j< width; j++){
            const box = document.createElement("div");
            box.classList.add("box");
            box.style.width = boxWidth;
            box.style.height = boxWidth;
            gridContainer.appendChild(box)
        }
        
    }
}

function initializeColorPicker() {
    ;

    return function() {
        return chosenColour;
    };
}

function randomModeColour(){

    let randomR = Math.floor(Math.random() * 256);
    let randomG = Math.floor(Math.random() * 256);
    let randomB = Math.floor(Math.random() * 256);
    let randomColour = `rgb(${randomR},${randomG},${randomB})`;
    return randomColour
}


function initializeBoxColoring(getColorFunc) {
    let boxes = document.querySelectorAll('.box');
    let resetButton = document.getElementById('reset');
    let isMouseDown = false;
    let randomMode = document.getElementById('random-mode')
    let random = false
    let colorPicker = document.getElementById("colorpicker");
    let erase = document.getElementById("erasor");
    let chosenColour = "#0000ff"; // default color
    let indicator = document.getElementById("indicator");

    erase.addEventListener('click', function(){
        chosenColour = 'transparent'
    })

    colorPicker.addEventListener("change", function(event){
        chosenColour = event.target.value;
    })

    randomMode.addEventListener('click', function(){
        random =! random //acts as a switch
        if (random){
            indicator.textContent = "Random mode is ON";
            indicator.style.backgroundColor = randomModeColour()
        } else if (!random) {
            indicator.textContent = "Random mode is OFF";
            indicator.style.backgroundColor = "rgb(238, 233, 226)"
        }
    })

    

    document.addEventListener('mousedown', function(event){
        if (event.button === 0) {
            isMouseDown = true;
        }
    });

    document.addEventListener('mouseup', function(event){
        if (event.button === 0) {
            isMouseDown = false;
        }
    });

    for (let i = 0; i < boxes.length; i++) {
        let box = boxes[i];
        box.addEventListener('mousedown', function(event){
            if (event.button === 0) {
                if (random) {
                    box.style.backgroundColor = randomModeColour();
                } else{
                    box.style.backgroundColor = chosenColour;
                }
            }
        });

        box.addEventListener('mouseover', function(){
            if (isMouseDown) {
                if (random) {
                    box.style.backgroundColor = randomModeColour();
                } else{
                    box.style.backgroundColor = chosenColour;
                }
            }            
        });
    }

    resetButton.addEventListener('click', function(){
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].style.backgroundColor = 'transparent';
        }
    });
}

function updateGridFromSlider() {
    const sliderValue = document.getElementById("dimension").value;
    
    // Update the span to display the new value
    document.getElementById("rangeValue").textContent = `Box Dimension = ${sliderValue}x${sliderValue}`;

    // Clear the current grid
    const gridContainer = document.querySelector(".grid-container");
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }

    // Generate the new grid
    generateGrid(sliderValue, sliderValue);

    // Re-initialize the box coloring functionality
    initializeBoxColoring(initializeColorPicker());
}

// Event listener for the slider


document.addEventListener('DOMContentLoaded', function() {
    generateGrid(16, 16);
    initializeBoxColoring(initializeColorPicker()); // Pass the getColor function to initializeBoxColoring
    document.getElementById("dimension").addEventListener("input", updateGridFromSlider);
});
