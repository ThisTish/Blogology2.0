// const signUpForm = async (event) => {
// 	event.preventDefault()

// 	const username = document.querySelector('#username').value.trim()
// 	const password1 = document.querySelector('#password1').value.trim()
// 	const password2 = document.querySelector('#password2').value.trim()

// 	if (username && password1 && password2) {
// 		let password = password1
// 		const response = await fetch('/api/users', {
// 			method: 'POST',
// 			body: JSON.stringify({ username, password }),
// 			headers: { 'Content-Type': 'application/json' },
// 		});

// 		if (response.ok) {
// 			document.location.replace('/')
// 		} else {
// 			alert(response.statusText)
// 		}
// 	}
// }


// document
// .querySelector('.signup-form')
// .addEventListener('submit', signupFormHandler)