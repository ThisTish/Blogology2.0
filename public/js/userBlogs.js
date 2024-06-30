document.addEventListener('DOMContentLoaded', () =>{

	const editBlogModal = document.getElementById('edit-blog-modal')
	const editTitleEl = document.getElementById('edit-title')
	const editTextEl = document.getElementById('edit-text')
	const updateBlogBtn = document.getElementById('update-blog-btn')
	const newBlogModal = document.getElementById('new-blog-modal')
	const newBlogModalBtn = document.getElementById('new-blog-btn')
	const eCloseBtn = document.getElementById('e-close-btn')
	const eCancelBtn = document.getElementById('e-cancel-btn')
	const nCloseBtn = document.getElementById('n-close-btn')
	const nCancelBtn = document.getElementById('n-cancel-btn')



	// edit blog modal filler
	document.querySelectorAll('#edit-blog-btn').forEach(editButton =>{
		editButton.addEventListener('click', async (event) =>{
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
			}catch (error) {
				alert(`error getting edit form ${error}`)
			}
		})
	})

	// submitting new blog
	if(updateBlogBtn){
	updateBlogBtn.onclick = (event) => {
		event.preventDefault()
		console.log('click update ln 5 editblogjs')
		const blogId = updateBlogBtn.value
		updateBlogFunction(blogId)
		}
	}

	const updateBlogFunction = async (blogId) =>{

		const title = document.querySelector('#edit-title').value
		const text = document.querySelector('#edit-text').value

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

	// delete blog
	document.querySelectorAll('#delete-blog-btn').forEach(deleteButton =>{
		deleteButton.addEventListener('click', async (event) =>{
			event.preventDefault()
			const blogId = event.target.getAttribute('data-blog-id')
			deleteBlogFunction(blogId)
		})
	})

	const deleteBlogFunction = async (blogId) =>{

		const response = await fetch(`api/blogs/${blogId}/delete`, {
			method: 'DELETE',
		})

		if(response.ok){
			document.location.replace('/dashboard')
		} else {
			alert(response.statusText)
		}
	}

	// edit blog modal event listeners
	if(eCloseBtn){
	eCloseBtn.onclick = () =>{
		editBlogModal.classList.add('hidden')
		}
	}

	if(eCloseBtn){
		eCancelBtn.onclick = () =>{
			editBlogModal.classList.add('hidden')
		}
	}

	// not working. margins too big(m-auto)
	window.onclick = (event) =>{
		if(event.target == editBlogModal){
		editBlogModal.classList.add('hidden')
		editBlogModal.classList.remove('flex')
		}
	}
	// new blog functions
	newBlogModalBtn.onclick = () =>{
		newBlogModal.classList.remove('hidden')
	}
	
	nCloseBtn.onclick = () =>{
		newBlogModal.classList.add('hidden')
	}
	
	nCancelBtn.onclick = () =>{
		newBlogModal.classList.add('hidden')
	}
	
	// not working. margins too big(m-auto)
	window.onclick = (event) =>{
		if(event.target == newBlogModal){
		newBlogModal.classList.add('hidden')
		newBlogModal.classList.remove('flex')
		}
	}
})
