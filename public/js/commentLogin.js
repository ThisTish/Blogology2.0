// move to other script during eventListener cleanup
const cLoginModalBtn = document.getElementById('c-login-btn')

if (cLoginModalBtn) {
	cLoginModalBtn.onclick = () =>{
		loginModal.classList.remove('hidden')
		loginModal.classList.add('flex')
	}
}