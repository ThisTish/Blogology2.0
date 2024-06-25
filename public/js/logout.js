document.addEventListener('DOMContentLoaded', (event) =>{
	document.querySelector('#logout').addEventListener('click', logoutFunction)

})

const logoutFunction = async (event) =>{
	event.preventDefault()
	console.log(`Logout public: ln 8  Click`)
	const response = await fetch('/logout', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json'}
	})

	if(response.ok){
		document.location.replace('/')
	} else {
		alert(response.statusText)
	}
	
}