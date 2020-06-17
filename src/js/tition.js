var tempMap = {}

class Tition {
	static registerTemp(fun,name,desc){
		tempMap[name] = fun
    }

    static getTempList(){
    	let list = []
    	for (name in tempMap) {
    		list.push(name)
    	}
    	return list
    }

    static getTemp(name){
    	alert('获取模板函数: '+ name)
    	console.log(tempMap[name])
    	return tempMap[name]
    }
}