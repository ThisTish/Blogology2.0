const editBlogModal = document.getElementById('edit-blog-modal')
const eCloseBtn = document.getElementById('e-close-btn')
const eCancelBtn = document.getElementById('e-cancel-btn')
const editTitleEl = document.getElementById('edit-title')
const editTextEl = document.getElementById('edit-text')
const updateBlogBtn = document.getElementById('update-blog-btn')



// edit blog modal filler
document.addEventListener('DOMContentLoaded', () =>{
	const editBlogBtn = document.getElementById('edit-blog-btn')

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
				console.log(`%ceditblog.js ln 27 ${JSON.stringify(blog)}`, 'color: red')

				editTitleEl.value = blog.title
				editTextEl.value = blog.text
				updateBlogBtn.value = blog.blog_id

				editBlogModal.classList.remove('hidden')
			}

		} catch (error) {
			alert(`error getting edit form ${error}`)
		}
	}
})


// submitting new blog
updateBlogBtn.onclick = () => {
	console.log('click update ln 5 editblogjs')
	updateBlogFunciton
}

const updateBlogFunciton = async (event) =>{
	event.preventDefault()

	const blogId = event.target.getAttribute('data-blog-id')

	const title = document.querySelector('#title').value
	const text = document.querySelector('#text').value

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
		}
	)
	
		if(response.ok){
			console.log(`blog updated successfully`)
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