
const newBlogModal = document.getElementById('new-blog-modal')
const newBlogModalBtn = document.getElementById('new-blog-btn')
const nCloseBtn = document.getElementById('n-close-btn')
const nCancelBtn = document.getElementById('n-cancel-btn')

// const signupModal = document.getElementById('signup-modal')
// const signupModalBtn = document.getElementById('sign-up-btn')
// const sCloseBtn = document.getElementById('s-close-btn')
// const sCancelBtn = document.getElementById('s-cancel-btn')


// new blog functions
newBlogModalBtn.onclick = () =>{
	newBlogModal.classList.remove('hidden')
	// newBlogModal.classList.add('flex')
}

nCloseBtn.onclick = () =>{
	newBlogModal.classList.add('hidden')
	// newBlogModal.classList.remove('flex')
}

nCancelBtn.onclick = () =>{
	newBlogModal.classList.add('hidden')
	// newBlogModal.classList.remove('flex')
}

// not working. margins too big(m-auto)
window.onclick = (event) =>{
	if(event.target == newBlogModal){
	newBlogModal.classList.add('hidden')
	newBlogModal.classList.remove('flex')
	}
}