document.addEventListener('DOMContentLoaded', (event) =>{
	console.log(`Fully loaded ln2 logoutjs`)
	const logoutEl = document.querySelector('#logout')

	if(!logoutEl){
		console.log(`error no logout element found`)
	}else{
	logoutEl.addEventListener('click', logoutFunction)
	console.log(`event listener attached ln9logoutjs`)
	}
})

const logoutFunction = async (event) =>{
	event.preventDefault()
	console.log(`Logout public: ln 8  Click`)
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