document.addEventListener('DOMContentLoaded', (event) =>{
	const deleteBlogBtn = document.querySelector('#delete-blog-btn')

	deleteBlogBtn.addEventListener('click', deleteBlogFunction)
})

const deleteBlogFunction = async (event) =>{
	event.preventDefault()
	console.log(`delete public: ln 10  Click`)

	const blogId = event.target.getAttribute('data-blog-id')
	console.log(blogId)

	const response = await fetch(`api/blogs/${blogId}/delete`, {
		method: 'DELETE',
	})

	if(response.ok){
		document.location.replace('/dashboard')//changed, not checked
	} else {
		alert(response.statusText)
	}
	
}