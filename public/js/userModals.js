// todo query select all, add event listner for close buttons and unAuthed login buttons
document.addEventListener('DOMContentLoaded', () =>{

	// login modal
	const loginModal = document.getElementById('login-modal')
	const loginModalBtn = document.getElementById('login-btn')
	const lCloseBtn = document.getElementById('l-close-btn')
	const lCancelBtn = document.getElementById('l-cancel-btn')
	const dLoginModalBtn = document.getElementById('d-login-btn')

	const signupModal = document.getElementById('signup-modal')
	const signupModalBtn = document.getElementById('sign-up-btn')
	const sCloseBtn = document.getElementById('s-close-btn')
	const sCancelBtn = document.getElementById('s-cancel-btn')


	loginModalBtn.onclick = () =>{
		loginModal.classList.remove('hidden')
		loginModal.classList.add('flex')
	}


	if (dLoginModalBtn) {
		dLoginModalBtn.onclick = () =>{
			loginModal.classList.remove('hidden')
			loginModal.classList.add('flex')
		}
	}

	lCloseBtn.onclick = () =>{
		loginModal.classList.add('hidden')
		loginModal.classList.remove('flex')
	}

	lCancelBtn.onclick = () =>{
		loginModal.classList.add('hidden')
		loginModal.classList.remove('flex')
	}

	// not working-margin/positioning
	window.onclick = (event) =>{
		if(event.target == loginModal){
		loginModal.classList.add('hidden')
		loginModal.classList.remove('flex')
		}
	}


	// signup functions
	if (signupModalBtn) {
		signupModalBtn.onclick = () =>{
			signupModal.classList.remove('hidden')
			signupModal.classList.add('flex')
		}
	}

	sCloseBtn.onclick = () =>{
		signupModal.classList.add('hidden')
		signupModal.classList.remove('flex')
	}

	sCancelBtn.onclick = () =>{
		signupModal.classList.add('hidden')
		signupModal.classList.remove('flex')
	}

	window.onclick = (event) =>{
		if(event.target == signupModal){
		signupModal.classList.add('hidden')
		signupModal.classList.remove('flex')
		}
	}

})