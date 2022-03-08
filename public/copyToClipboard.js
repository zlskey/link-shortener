const link = document.querySelector('p')

link.onclick = () => navigator.clipboard.writeText(link.textContent)
