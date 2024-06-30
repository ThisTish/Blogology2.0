
const newBlogModal = document.getElementById('new-blog-modal')
const newBlogModalBtn = document.getElementById('new-blog-btn')
const nCloseBtn = document.getElementById('n-close-btn')
const nCancelBtn = document.getElementById('n-cancel-btn')

// const editBlogModal = document.getElementById('edit-blog-modal')
// const editBlogModalBtn = document.getElementById('edit-blog-btn')
// const eCloseBtn = document.getElementById('e-close-btn')
// const eCancelBtn = document.getElementById('e-cancel-btn')


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

// // edit blog
// editBlogModalBtn.onclick = () =>{
// 	editBlogModal.classList.remove('hidden')
// 	// editBlogModal.classList.add('flex')
// }

// eCloseBtn.onclick = () =>{
// 	editBlogModal.classList.add('hidden')
// 	// editBlogModal.classList.remove('flex')
// }

// eCancelBtn.onclick = () =>{
// 	editBlogModal.classList.add('hidden')
// 	// editBlogModal.classList.remove('flex')
// }

// // not working. margins too big(m-auto)
// window.onclick = (event) =>{
// 	if(event.target == editBlogModal){
// 	editBlogModal.classList.add('hidden')
// 	editBlogModal.classList.remove('flex')
// 	}
// }