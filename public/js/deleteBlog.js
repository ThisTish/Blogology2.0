document.addEventListener('DOMContentLoaded', (event) =>{
	const deleteBlogBtn = document.querySelector('#delete-blog-btn')

	deleteBlogBtn.addEventListener('click', deleteBlogFunction)
	console.log(`event listener attached ln9logoutjs`)
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
		document.location.replace('/')
	} else {
		alert(response.statusText)
	}
	
}