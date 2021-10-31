
var speed = 10;
var newRun = false;
var parentdiv = document.getElementById("display");

function changeSpeed(){
    //gets the value from the range input and changes the speed accordingly
    speed = document.getElementById("slider").value;
}

function getRandomInts(len, max){
    //generates a random array of ints 
    //param len: the number of elements that will be generated
    //param max: the maximum value of the elements
    var arr = [];
    for(i = 0; i < len; i++){
        var newValue = Math.floor(Math.random() * max);
        arr.push(newValue);
    }
    return arr;
}

function clearScreen(arr){
    //clears the display div
    for(i=0; i < arr.length; i++){
        try{
        document.getElementsByClassName("div"+i)[0].remove();
        }catch{}
    }
}

function drawItems(arr){
    //"renders" every div with a height from arr
    //param arr: array of integers
    for(i = 0; i < arr.length; i++){
        var newDIv = document.createElement("div");
        newDIv.classList.add("div"+i);
        newDIv.classList.add("item");
        newDIv.style.left = i*8+10 + "px";
        newDIv.style.height = arr[i]+"px";
        document.getElementById("display").appendChild(newDIv);
    }
}

function resetActive(index){
    //clears the "active" class from the div[index]
    document.getElementsByClassName("div"+index)[0].classList.remove("active");
}

function setActive(index){
    //adds the "active" class to the div[index]
    document.getElementsByClassName("div"+index)[0].classList.add("active");
}

function swapInArr(first, second, arr){
    //swaps arr[first] and arr[second] between each other
    let tmp = arr[first];
    arr[first] = arr[second];
    arr[second] = tmp;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function showMessage(){
    document.getElementById("message").classList.remove("hidden");
}

function hideMessage(){
    try{
        document.getElementById("message").classList.add("hidden");
    }catch{};
}

function swapOnScreen(first, second, arr){
    // swaps the height value of 2 divs 
    var firstDiv = document.getElementsByClassName("div"+first)[0];
    var secondDiv = document.getElementsByClassName("div"+second)[0];
    var tmp = firstDiv.style.height;

    firstDiv.style.height = secondDiv.style.height;
    secondDiv.style.height = tmp;

}

function updateOnScreen(first, second){
    // updates the height value of a div with the value of second param
    var firstDiv = document.getElementsByClassName("div"+first)[0];    
    firstDiv.style.height = second+"px";
}

async function bubbleSort(arr){
    //sorts the list with the bubble sort algorithm and
    //"renders" the divs accordingly
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        if(newRun == true) break;
        for (let j = 0; j < len-1; j++) {
            setActive(j);
            setActive(j+1);

            if (arr[j] > arr[j + 1]) {
                swapOnScreen(j, j+1, arr);
                swapInArr(j, j+1, arr);
                await sleep(100-speed);    
            }
            resetActive(j);
            resetActive(j+1);  
        }
    }
    showMessage();
    return arr;
}

async function explicitSelectionSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        let min = i;
        setActive(min);
        for (let j = i + 1; j < len; j++) {
            setActive(j);
            if (arr[min] > arr[j])
             { min = j; }
            await sleep((100-speed)/10);
            resetActive(j);
        }
        if (min !== i) {
            swapOnScreen(min, i, arr);
            swapInArr(min, i, arr);
        }
        resetActive(min);
        resetActive(i);
    }
    showMessage();
    return arr;
}

async function selectionSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        let min = i;
        setActive(min);
        if(newRun === true) break;
        for (let j = i + 1; j < len; j++) {
            
            if (arr[min] > arr[j])
             { 
                if(min != i){
                    resetActive(min);
                }
                min = j; 
                setActive(j);
            }   
        }
        if (min !== i) {
            swapOnScreen(min, i, arr);
            swapInArr(min, i, arr);
        }
        await sleep(101-speed);
        resetActive(min);
        resetActive(i);
    }
    showMessage();
    return arr;
}

async function insertionSort(arr) {
    let n = arr.length;
        for (let i = 1; i < n; i++) {
            let current = arr[i];
            try{setActive(i+1);}catch{console.log("all done :)")}
            let j = i-1; 
            if(newRun == true) break;
            while ((j > -1) && (current < arr[j])) {
                try{
                    setActive(j); 
                    await sleep(0);
                    resetActive(j);
                }catch{}
                updateOnScreen(j+1, arr[j], arr);
                    await sleep(0);        
                arr[j+1] = arr[j];
                j--;          
            }
            updateOnScreen(j+1, current, arr);
            arr[j+1] = current;
            try{resetActive(i+1);}catch{}
            await sleep(101-speed);
        }
    showMessage();
    return arr;
}

async function runAlgorithm(algorithm){
    //runs the programs
    hideMessage();
    var arr = getRandomInts(144, 480);
    newrun = true;
    clearScreen(arr);
    await sleep(100);
    drawItems(arr);
    switch(algorithm){
        case 'bubble':
            bubbleSort(arr);
            break;
        case 'quick':
            selectionSort(arr);
            break;
        case 'quickExplicit':
            explicitSelectionSort(arr);
            break;
        case 'insertion':
            insertionSort(arr);     
            break;
        case 'default':
            clearScreen(arr);
            break;
        }

        return;

};