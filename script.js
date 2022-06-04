document.body.onload = addElement();

function addElement() {

    const newDiv = document.createElement("div");

    const newContent = document.createTextNode("DTG");

    const create = newDiv.appendChild(newContent);

	const currentDiv = document.getElementsByClassName("r1")[0];
	
	const array = [];
	for (let i = 0; i < 7; i++)
		{
			array[i] = create;
			console.log(array[i]);
			console.log(array.length);
		}
	
	
	for (let i = 0; i < 7; i++)
	{
		currentDiv.insertAdjacentElement('afterbegin', newDiv);
	}
	
	console.log(currentDiv[3]);

}
