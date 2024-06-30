document.addEventListener('DOMContentLoaded', (event) =>{
	const logoutEl = document.querySelector('#logout')

	logoutEl.addEventListener('click', logoutFunction)
})

const logoutFunction = async (event) =>{
	event.preventDefault()
	const response = await fetch('api/users/logout', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json'}
	})

	if(response.ok){
		document.location.replace('/')
	} else {
		alert(response.statusText)
	}
	
}