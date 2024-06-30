document.addEventListener('DOMContentLoaded', () =>{

const editBlogModal = document.getElementById('edit-blog-modal')
const editBlogForm = document.getElementById('edit-blog-form')
const eCloseBtn = document.getElementById('e-close-btn')
const eCancelBtn = document.getElementById('e-cancel-btn')
const editTitleEl = document.getElementById('edit-title')
const editTextEl = document.getElementById('edit-text')
const updateBlogBtn = document.getElementById('update-blog-btn')
const editBlogBtn = document.getElementById('edit-blog-btn')



// edit blog modal filler

	editBlogBtn.onclick = async (event) =>{
		event.preventDefault()
		const blogId = event.target.getAttribute('data-blog-id')

		try {			
			const response = await fetch(`api/blogs/${blogId}/editBlog`, {
				method: 'GET'
			})
			if(!response.ok){
				return console.log('error in getting info')
			}
			else{
				const blog = await response.json()

				editTitleEl.value = blog.title
				editTextEl.value = blog.text
				updateBlogBtn.value = blog.blog_id

				editBlogModal.classList.remove('hidden')
			}

		} catch (error) {
			alert(`error getting edit form ${error}`)
		}
	}



// submitting new blog
updateBlogBtn.onclick = (event) => {
	event.preventDefault()
	console.log('click update ln 5 editblogjs')
	const blogId = updateBlogBtn.value
	updateBlogFunction(blogId)
}

const updateBlogFunction = async (blogId) =>{

console.log(`%ceditBlog.js ln 53${blogId}`, "color: blue")
	const title = document.querySelector('#edit-title').value
	const text = document.querySelector('#edit-text').value

	console.log(`Blog ID: ${blogId}, Title: ${title}, Content: ${text}`);


try {
	const response = await fetch(`/api/blogs/${blogId}`, {
		method: 'PUT',
		headers:{
		'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			title,
			text
		})
		
	})
	
	if(response.ok){
		document.location.replace('/dashboard')
	} else {
		alert(response.statusText)
	}
} catch (error) {
	console.error('blog update failed')
	alert('Error updating blog')
	}
}


// edit blog modal event listeners

eCloseBtn.onclick = () =>{
	editBlogModal.classList.add('hidden')
	// editBlogModal.classList.remove('flex')
}

eCancelBtn.onclick = () =>{
	editBlogModal.classList.add('hidden')
	// editBlogModal.classList.remove('flex')
}

// not working. margins too big(m-auto)
window.onclick = (event) =>{
	if(event.target == editBlogModal){
	editBlogModal.classList.add('hidden')
	editBlogModal.classList.remove('flex')
	}
}
})