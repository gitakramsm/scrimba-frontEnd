let homeScore = 0
let guestScore = 0
let homeScoreEl  = document.getElementById("homeScore-el")
let guestScoreEl  = document.getElementById("guestScore-el")

function addOneToHomeScore() {
    homeScore += 1
    homeScoreEl.textContent = homeScore
}
function addTwoToHomeScore() {
    homeScore += 2
    homeScoreEl.textContent = homeScore
}
function addThreeToHomeScore() {
    homeScore += 3
    homeScoreEl.textContent = homeScore
}

function addOneToGuestScore() {
    guestScore += 1
    guestScoreEl.textContent = guestScore
   
}
function addTwoToGuestScore() {
    guestScore += 2
    guestScoreEl.textContent = guestScore
}
function addThreeToGuestScore() {
    guestScore += 3
    guestScoreEl.textContent = guestScore
}