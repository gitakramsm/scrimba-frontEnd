import { menuArray } from './data.js'

let arrOfOrder= []

document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        handleAddBtnClick(e.target.dataset.add)
        callInOrder()
    }
    else if(e.target.dataset.remove){
        handleRemoveBtnClick(e.target.dataset.remove)
        callInOrder()
    }
    else if(e.target.id === 'check-out-btn'){
        handleCheckOutBtnClick()
    }
    else if(e.target.id === 'pay-btn'){
        handlePayBtnClick()
    }
})

function handleAddBtnClick(itemId){ // + is a unary operator that converts str to int 
    const singleItemObj = menuArray.filter(item => (+itemId) === item.id)[0]
    if(singleItemObj){
        arrOfOrder.push(singleItemObj)
    }     
}

function handleRemoveBtnClick(itemId){
    const itemIndex = arrOfOrder.findIndex(item => (+itemId) === item.id)
    if(itemIndex > -1){
        arrOfOrder.splice(itemIndex, 1)
    }      
}

function callInOrder(){
    updateTotalOrder()
    getTotalOrderPrice()
    addCheckOut()
}

function updateTotalOrder(){
    const orderedItem = arrOfOrder.map(order => {
        const { name, price, id } = order
        return`
            <div class="order-item-details">
                <h3 class="order-item-name">${name}</h3>
                <button class="remove-btn" data-remove=${id}>remove</button>
                <p class="order-item-price">$${price}</p>
            </div>
        `
    }).join('')
    document.getElementById('order-items-wrapper').innerHTML = orderedItem
    document.getElementById('order-items-container').style.display = 'inline'
}

function getTotalPrice(){
    return arrOfOrder.reduce((total,currentItem) => total + currentItem.price, 0)
}

function getTotalOrderPrice(){
    const totalPrice = getTotalPrice()
    const totalPriceEl = document.getElementById('total-price')
    if(arrOfOrder.length > 0){
        totalPriceEl.textContent = `$${totalPrice}`
    }
    else{
        totalPriceEl.textContent = `$0`
    }
}

function addCheckOut(){
    
    const totalPrice = getTotalPrice()
    const checkOutBtn = document.getElementById('check-out-btn')
    
    if(totalPrice > 0 && !checkOutBtn){
        let checkOutBtnHtml = `
            <div class="check-out-btn-wrapper">
                <button class="check-out-btn" id="check-out-btn">Complete Order</button>
            </div>
        `
        document.getElementById('order-items-container').innerHTML += checkOutBtnHtml
    }
    else if(totalPrice <= 0 && checkOutBtn){
         checkOutBtn.remove()
    }
}

function handleCheckOutBtnClick(){
    
    const heading = document.createElement('h6')
    const form = document.createElement('form')
    const nameInput = document.createElement('input')
    const cardNumberInput = document.createElement('input')
    const cvvInput = document.createElement('input')
    const btn = document.createElement('button')
    const payModalInner = document.getElementById('pay-modal-inner')
    
    heading.classList.add('pay-modal-title')
    heading.textContent = 'Enter Card Details'
    
    form.classList.add('pay-modal-form')
    form.id = 'pay-modal-form'
    
    nameInput.type = 'text'
    nameInput.placeholder = 'enter your name'
    nameInput.required = true
    cardNumberInput.type = 'text'
    cardNumberInput.placeholder = 'enter card number'
    cardNumberInput.required = true
    cvvInput.type = 'number'
    cvvInput.placeholder = 'enter CVV' 
    cvvInput.required = true
    btn.type = 'submit'
    btn.classList.add('pay-btn')
    btn.id = 'pay-btn'
    btn.textContent = 'Pay'
    
    form.appendChild(nameInput)
    form.appendChild(cardNumberInput)
    form.appendChild(cvvInput)
    form.appendChild(btn)
    payModalInner.appendChild(heading)
    payModalInner.appendChild(form)
    payModalInner.style.display = 'flex'
}

function handlePayBtnClick(){
    
    document.getElementById('pay-modal-form').addEventListener('submit', function(e){
         const orderItemsContainer = document.getElementById('order-items-container')
         e.preventDefault()
         document.getElementById('pay-modal-inner').style.display = 'none'
         orderItemsContainer.innerHTML = `
                <div class="payment-success-msg-wrapper">
                    <p class="payment-success-msg">Thanks! your order is on the way</p>
                </div>
         `
         setTimeout(function(){
             arrOfOrder = []
             orderItemsContainer.innerHTML = getTotalOrderHtml()
             orderItemsContainer.style.display = 'none'
         }, 3000)
    })
}

function getMenuHtml(){
    return menuArray.map(menu => {
        const { name, ingredients, id, price, emoji } = menu
        return`
            <div class="menu-items-wrapper">
                <p class="menu-item-img">${emoji}</p>
                <div class="menu-item-details">
                    <h3 class="item-name">${name}</h3>
                    <p class="item-ingredients">${ingredients.join(', ')}</p>
                    <p class="item-price">$${price}</p>
                </div>
                <div class="add-btn-wrapper">
                    <button class="add-btn" data-add=${id}>+</button>
                </div>
                </div>
            </div>
        `
    }).join('')
}
function getTotalOrderHtml(){
    return`
        <h3 class="your-order-title">Your Order</h3>
        <div class="order-items-wrapper" id="order-items-wrapper">
            
        </div>
        <div class="total-price-detail-wrapper">
            <h3 class="total-price-title">Total Price:</h3>
            <div class="total-price-wrapper">
                <p class="total-price" id="total-price">$0</p>
            </div>
        </div>
    `
}
function render(){
    document.getElementById('menu-items-container').innerHTML = getMenuHtml()
    document.getElementById('order-items-container').innerHTML = getTotalOrderHtml()
}
render()