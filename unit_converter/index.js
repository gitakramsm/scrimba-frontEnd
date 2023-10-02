/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/
const inputEl = document.getElementById("input-field")
const convertBtn = document.getElementById("convert-btn")
const lengthEl = document.getElementById("length-container")
const volumeEl = document.getElementById("volume-container")
const massEl = document.getElementById("mass-container")

convertBtn.addEventListener("click", function(){
    let num = inputEl.value
    convertToLength(num)
    convertToVolume(num)
    convertToMass(num)
    inputEl.value = ""
})

function convertToLength(num){
    const metersToFeet = num * 3.281
    const feetToMeters = num / 3.281
    return lengthEl.innerHTML = `
                <h3>Length(Meter/Feet)</h3>
                <p>
                    ${num} meters = ${metersToFeet.toFixed(3)} feet |
                    ${num} feet = ${feetToMeters.toFixed(3)} meters 
                </p>
                `
}
function convertToVolume(num){
    const litersToGallons = num * 0.264
    const gallonsToLiters = num / 0.264
    return volumeEl.innerHTML = `
                <h3>Volume(Liters/Gallons)</h3>
                <p>
                    ${num} liters = ${litersToGallons.toFixed(3)} gallons |
                    ${num} gallons = ${gallonsToLiters.toFixed(3)} liters 
                </p>
                `
}
function convertToMass(num){
    const kilosToPounds = num * 2.204
    const poundsToKilos = num / 2.204
    return massEl.innerHTML = `
                <h3>Mass(Kilograms/Pounds)</h3>
                <p>
                    ${num} kilos = ${kilosToPounds.toFixed(3)} pounds |
                    ${num} pounds = ${poundsToKilos.toFixed(3)} kilos 
                </p>
                `
}