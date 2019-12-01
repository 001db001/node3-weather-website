
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwoo = document.querySelector('#message-2')


// messageOne.textContent = 'From JavaScript' 
// messageTwoo.textContent = 'From JavaScript 2' 

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...';
    messageTwoo.textContent = '';


    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {

            if (data.error) {
                messageOne.textContent = data.error

            } else {
                messageOne.textContent = data.cityName;
                messageTwoo.textContent = data.forecastData;
            }
        })
    })
})