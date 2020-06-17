function entityTemp(seed){
	let content = 
	`entity it is

	hellp   ${seed.name}
	`

	let fileName = 
	`${seed.name}.java`
	return {
		content,
		fileName
	}
}

function controllerTemp(seed){
	let content = 
	`entity it is

	hellp   ${seed.name}
	`

	let fileName = 
	`${seed.name}.java`
	return {
		content,
		fileName
	}
}

function htmlTemp(seed){
	let content = 
	`entity it is

	hellp   ${seed.name}
	`

	let fileName = 
	`${seed.name}.java`
	return {
		content,
		fileName
	}
}

function dmjsTemp(seed){
	let content = 
	`entity it is

	hellp   ${seed.name}
	`

	let fileName = 
	`${seed.name}.java`
	return {
		content,
		fileName
	}
}

Tition.registerTemp(entityTemp,'java entity','desc')
Tition.registerTemp(controllerTemp,'java controller','desc')
Tition.registerTemp(dmjsTemp,'dm.js','desc')
Tition.registerTemp(htmlTemp,'html','desc')
