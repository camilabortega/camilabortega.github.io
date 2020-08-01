var contacts = [];
var saved    = localStorage.getItem("contacts");

if(saved){
    contacts = JSON.parse(saved);
    loadContacts();
}

function add(){
    var name   = document.querySelector("#name");
    var number = document.querySelector("#number");

    if(name.value === "" || number.value === ""){
        alert("Favor digitar um valor");
        return false;
    }

    var contact = {
        name:   name.value,
        number: number.value
    }

    contacts.push(contact);
    saveContacts();
    openModal(false);
    loadContacts();

    name.value   = "";
    number.value = "";
}

function loadContacts(){
    var list = document.querySelector(".list ul");
    list.innerHTML = "";

    document.querySelector(".list h3").style.display = "none";

    contacts.sort(function(a, b){
        if(a.name < b.name) {
            return -1;
        } else {
            return 0;
        }
    })
    
    for(contact of contacts){
        var li   = document.createElement("li");

        li.innerHTML = `<strong>${contact.name}</strong>${contact.number}`;

        list.append(li);
    }
}

function saveContacts(){
    localStorage.setItem("contacts", JSON.stringify(contacts));
}

document.querySelector(".modal button").onclick = add;

document.querySelector(".open-modal button").onclick = function (){openModal(true)};

function openModal(open){
    var modal = document.querySelector(".modal");
    if(open){
        modal.className = "modal";
    } else{
        modal.className = "modal hidden";
    }
}

document.querySelector(".modal-background").onclick = function() {
    openModal(false);
}