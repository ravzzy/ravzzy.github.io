/* Contact Us Form

This code handles the form submission process using JavaScript. 
It prevents the default form submission, sends the form data as a JSON object to an API, 
and provides feedback to the user about the submission status

*/

const form = document.getElementById('form');
const result = document.getElementById('result'); //This grabs the HTML element with the id="result", 
// which will be used to display messages such as success or error responses after the form submission.

//An event listener is attached to the form element, listening for the submit event. 
// When the form is submitted, the function inside the event listener is triggered.

form.addEventListener('submit', function (e) {
    e.preventDefault(); 

    const formData = new FormData(form);
    const json = JSON.stringify(Object.fromEntries(formData));
    result.innerHTML = "Sending...";

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: json
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            result.innerHTML = "✅ Form submitted successfully!";
            form.reset();
        } else {
            result.innerHTML = "❌ Error: " + data.message;
        }
    })
    .catch(() => {
        result.innerHTML = "❌ Failed to send. Check your internet connection.";
    });

    setTimeout(() => { result.style.display = "none"; }, 5000);
});