document.getElementById('myForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;

            // Prepare the data to be sent
            const data = {
                name: name,
                email: email
            };

            fetch('/submit_data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Specify content type
                },
                body: JSON.stringify(data) // Convert data to JSON string
            })
            .then(response => response.json()) // Parse JSON response
            .then(data => {
                document.getElementById('response').innerText = data.message;
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('response').innerText = 'An error occurred.';
            });
        });