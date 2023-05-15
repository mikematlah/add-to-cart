import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase , ref ,push , onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
/*https://console.firebase.google.com/u/0/project/realtime-database-8c3c2/database/realtime-database-8c3c2-default-rtdb/data*/

const appSettings = {
    databaseURL:'https://realtime-database-8c3c2-default-rtdb.europe-west1.firebasedatabase.app/'
    
}
const app = initializeApp(appSettings)
const dataBase = getDatabase(app)
const itemsInDb = ref(dataBase, 'items')


const addBtn  = document.getElementById('add-button')
const inputFieldEl = document.getElementById('input-field')
const shoppingListEl = document.getElementById('shopping-list')

addBtn.addEventListener('click',function(){
    let inputValue = inputFieldEl.value
    if(inputValue){
        push(itemsInDb , inputValue)
        clearInputFieldEl()
    }
  
   
})
function clearInputFieldEl(){
    inputFieldEl.value = ''
}
 function addItem(item){
    let itemID = item[0]
    let itemValue = item[1]
  
    let newEl = document.createElement('li')
    newEl.textContent = itemValue
    newEl.addEventListener('click',function(){
        let exactLocationOfItemInDB = ref(dataBase,`items/${itemID}`)
        remove(exactLocationOfItemInDB)
        
    })
    shoppingListEl.append(newEl)
 }
 function clearShoppingListEl(){
    shoppingListEl.innerHTML = ''
 }
 onValue(itemsInDb,function(snapshot){
   
    if(snapshot.exists()){
        clearShoppingListEl()
        let itemsArr = Object.entries(snapshot.val())
    
        for(let item of itemsArr){
            let currentItem = item
            let currentItemId = item[0]
            let currentItemValue = item[1]
        
    
            addItem(currentItem)
        }
    }else{
       shoppingListEl.innerHTML = '<li>No items here yet</li>'
    
    }
    })
