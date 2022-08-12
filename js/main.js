let price = document.querySelector("#price");
let taxes = document.querySelector("#taxes");
let ads = document.querySelector("#ads");
let discount = document.querySelector("#discount");
let total = document.querySelector("#total");
let title = document.querySelector("#title");
let count = document.querySelector("#count");
let category = document.querySelector("#category");
let add = document.querySelector("#add");
let search = document.querySelector("#search");
let searchByTitel = document.querySelector("#searchByTitel");
let searchByCategory = document.querySelector("#searchByCategory");
let deleteAll = document.querySelector("#deleteAll");
let Update = document.querySelector("#Update");
let main = document.querySelector("#main");

function calculate() {
    if (price.value != "" && taxes.value != "" && ads.value != "") {
        let totalPrice =
        parseInt(price.value) + parseInt(taxes.value) + parseInt(ads.value);
        if (discount.value != "") {
        totalPrice =
            parseInt(price.value) + parseInt(taxes.value) + parseInt(ads.value) - parseInt(discount.value);
        total.innerHTML = `total : ${totalPrice + (totalPrice * 10) / 100}`;
        }
        total.innerHTML = `total : ${totalPrice + (totalPrice * 10) / 100}`;
        total.style.background = "#198754";
    } else {
        total.innerHTML = `total : `;
        total.style.background = "#dc3545";
    }}

// معنى الكود لو اللوكل ستوريدج مش فاضى ضيف عليه
if (localStorage.getItem("array") != null) {
    array = JSON.parse(localStorage.getItem("array"));
}else{
    array = [];
}

add.onclick = function () {
    if(title.value != "" && category.value != "" && price.value != "" && taxes.value != "" && ads.value != "" ){

        let obj = {
            title: title.value,
            count: count.value,
            category: category.value,
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: total.innerHTML
        };
        
    // بشوف الرقم اللى جوا الكاونتر و على اساسه بضيف عدد معين فى المصفوفة
        if (obj.count > 1){
            for(let i = 0; i < obj.count; i++){
                array.push(obj);
            }
            }else{
                array.push(obj);
            }
    
        localStorage.setItem("array", JSON.stringify(array));
        clearData();
        showData();
        total.style.background = "#dc3545";
        }

    }


// فانكشن بتحذف البيانات اللى موجودة فى الجدول
let clearData = function () {
    title.value = "";
    count.value = "";
    category.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "total : ";
}


let showData = function () {
    let table = "";
    for (let i = 0; i < array.length; i++) {
        table += `
        <tr>
        <td >${i+1}</td>
        <td >${array[i].title}</td>
        <td >${array[i].price}</td>
        <td >${array[i].taxes}</td>
        <td >${array[i].ads}</td>
        <td >${array[i].discount}</td>
        <td >${array[i].total}</td>
        <td >${array[i].category}</td>
        <td ><button onclick="upd(${i})" id="Update" class="btn btn-success">Update</button></td>
        <td ><button onclick="del(${i})" id="Delete" class="btn btn-danger">Delete</button></td>
        </tr>
        `
        deleteAll.innerHTML = `Delete All (${i+1})`;
        
    }
    document.querySelector("tbody").innerHTML = table;
}
    showData();

deleteAll.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

function del(i) {
    array.splice(i, 1);// بحذف العنصر اللى ممررله قيمة اى و هحذف رقم واحد بس
    localStorage.setItem("array", JSON.stringify(array));
    showData();
}


function upd(id) {

    for (let j = 0; j < array.length; j++) {
        
    Save.style.display = "block";
    deleteAll.style.display = "none";
    
    title.value = array[j].title;
    count.value = array[j].count;// السطر ده بيسمح بتغير كل العناصر اللى انشاءت مع بعض من الكونتر
    // count.value = 0; // كدا انا هغير العنصر الواحد بس
    category.value = array[j].category;
    price.value = array[j].price;
    taxes.value = array[j].taxes;
    ads.value = array[j].ads;
    discount.value = array[j].discount;
    total.innerHTML = array[j].total;


    let save = document.querySelector("#Save");
    save.onclick = function () {

        Save.style.display = "none";
        deleteAll.style.display = "block";

        array[j].title = title.value;
        array[j].count = count.value;
        array[j].category = category.value;
        array[j].price = price.value;
        array[j].taxes = taxes.value;
        array[j].ads = ads.value;
        array[j].discount = discount.value;
        array[j].total = total.innerHTML;
        localStorage.setItem("array", JSON.stringify(array));
        showData();
        clearData();
    }
}}



// serach by titel
let holder = "searchByTitel";
function searchB(id){
    if(id == "searchByTitel"){
        holder = "searchByTitel";
        search.placeholder = "search by titel";
    }else{
        search.placeholder = "search by category";
        holder = "searchByCategory";
    }
    search.focus();
}


function searchS(value){
    let table = "";
    for (let i = 0; i < array.length; i++){
        if (holder == "searchByTitel"){
            if (array[i].title.includes(value)) {

        table += `
        <tr>
        <td >${i+1}</td>
        <td >${array[i].title}</td>
        <td >${array[i].price}</td>
        <td >${array[i].taxes}</td>
        <td >${array[i].ads}</td>
        <td >${array[i].discount}</td>
        <td >${array[i].total}</td>
        <td >${array[i].category}</td>
        <td ><button onclick="upd(${i})" id="Update" class="btn btn-success">Update</button></td>
        <td ><button onclick="del(${i})" id="Delete" class="btn btn-danger">Delete</button></td>
        </tr>
        `;
        }
        
        }
        else if (holder == "searchByCategory"){
        if (array[i].category.includes(value)) {
        table += `
        <tr>
        <td >${i+1}</td>
        <td >${array[i].title}</td>
        <td >${array[i].price}</td>
        <td >${array[i].taxes}</td>
        <td >${array[i].ads}</td>
        <td >${array[i].discount}</td>
        <td >${array[i].total}</td>
        <td >${array[i].category}</td>
        <td ><button onclick="upd(${i})" id="Update" class="btn btn-success">Update</button></td>
        <td ><button onclick="del(${i})" id="Delete" class="btn btn-danger">Delete</button></td>
        </tr>
        `;
        }
        else{

        }
}
document.querySelector("tbody").innerHTML = table;}
}
