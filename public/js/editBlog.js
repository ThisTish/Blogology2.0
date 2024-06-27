document.addEventListener('DOMContentLoaded', (event) =>{
	const updateBlogBtn = document.querySelector('#update-blog-btn')

	updateBlogBtn.addEventListener('click', updateBlogFunciton)
})

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