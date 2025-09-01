console.log('Client side js is loading');



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');



weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = search.value;
    message1.textContent = 'Loading...';
    message2.textContent = '';
    fetch(`http://localhost:3000/weather?address=${encodeURIComponent(location)}`).then((response) =>{
        response.json().then((data)=>{
            if(data.error){
                message1.textContent = data.error;
                message2.textContent = '';
            }
            else{
                console.log(data);
                message1.textContent = data.location;
                message2.textContent = 'Předpověď: ' + data.forecast + ' a '+ 'teplota:' + data.temperature;
            }
        })
    });
});