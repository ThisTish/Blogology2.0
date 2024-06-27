document.addEventListener('DOMContentLoaded', (event) =>{
	console.log(`Fully loaded ln2 editblog`)
	const updateBlogBtn = document.querySelector('#update-blog-btn')

	if(!updateBlogBtn){
		console.log(`error no update element found`)
	}else{
	updateBlogBtn.addEventListener('click', updateBlogFunciton)
	console.log(`event listener attached ln9 updatejs`)
	}
})

const updateBlogFunciton = async (event) =>{
	event.preventDefault()
	console.log(`update public: ln 9  Click`)

	const blogId = event.target.getAttribute('data-blog-id')
	console.log(`blog id ln 12 in editblog.js : ${blogId}`)

	const title = document.querySelector('#title').value
	const text = document.querySelector('#text').value

	console.log(`ln 23 in editblogjs:blog id: ${blogId}, title: ${title}, text: ${text}`);


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
			// document.location.replace('/dashboard')
		} else {
			alert(response.statusText)
		}
} catch (error) {
	console.error('blog update failed')
	alert('Error updating blog')
}
	
}