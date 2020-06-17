//本文件用于定义数据模型/
//var storage=window.localStorage

//用户数据
pue.define('Seed',
{
	fields:{
		id:{
			type:'number',
			name:'ID'
		},
		name:{
			type:'string',
			name:'名称'
		},
		code:{
			type:'string',
			name:'核心代码'
		}

	},
	methods:{
		load(){
			var data = {
				id:0,
				name:'',
				code:''
			}
			return data  			
		},
		update:{	
			'-t':'gen',		
			name:'修改/复制',
			fun: function* (data){
				let a = dataModel.new('Seed',{name:data.name,code:data.code,id:data.id})
	            a = yield a
	            data.id = a.id
	            data.name = a.name
	            data.code = a.code
	            //window.localStorage.seedList[data.name] = data
	            let seedList = localforage.getItem('seedList').then(function (value) {
				    // 当值被存储后，可执行其他操作
				    console.log(value);
				    value[data.id] = data
				    localforage.setItem('seedList', value).then()
				}).catch(function(err) {
				    // 当出错时，此处代码运行
				    console.log(err);
				});
	            //seedList[data.id] = data
	            //localforage.setItem('seedList', seedList).then()
	            //保存
	            return '修改成功'
			}
		},
		delete:{
			'-t':'fun',		
			name:'删除',
			fun(data){
				// console.log('param:')
				// console.log(param)
				data.name = data.name + '已删除'
				//delete window.localStorage.seedList[data.name]

				let seedList = localforage.getItem('seedList').then(function (value) {
				    // 当值被存储后，可执行其他操作
				    //console.log(value);
				    //value[data.id] = data
				    value[data.id] = undefined
				    localforage.setItem('seedList', value).then()
				}).catch(function(err) {
				    // 当出错时，此处代码运行
				    console.log(err);
				});
				//data.code = data.code 
				//保存
				//删除操作
				return '删除成功!'
			}
		},
		create:{	
			'-t':'fun',		
			name:'生成模板代码',
			paramType:'Template',
			fun(data,param){
				//alert('成功: '+data.pass+"   "+data.name)
				//data.pass = data.pass + 1
				//导出代码生成下载文件
				// console.log('parammmmmmmmmmmmmmmmmmmmmmmmmmmm')
				// console.log(param)
				const obj = JSON.parse(data.code)
				if(Tition.getTemp(param.name)){
					let temp = Tition.getTemp(param.name)(obj)
					downloadFile (temp.fileName,temp.content)
					return '生成模板代码成功!'
				}else{
					return '模板未定义!'
				}
				
			}
		}

	}
})

//定义模板模型
pue.define('Template',
{
	fields:{
		name:{
			type:'string',
			name:'模板名称',
			enum:Tition.getTempList()
		}

	},
	methods:{
		load(){
			var data = {
				name:''
			}
			return data  			
		}

	}
})


//Ti编辑器
pue.define('TiEditor',
{
	fields:{

		list:{
			type:'list<Seed>',
			name:'列表'
		}

	},
	methods:{
		load(){
			var data = {
				list:[]
			}
			localforage.getItem('seedList').then(function(value) {
			    // 当离线仓库中的值被载入时，此处代码运行
			    if(value){
					data.list = value
					//alert('初始化22')
				}else{
					//alert('初始化')
					localforage.setItem('seedList', []).then()
				}
				// console.log('seedList::')
			 //    console.log(value);
			}).catch(function(err) {
			    // 当出错时，此处代码运行
			    console.log(err);
			});
	            	            
			
			
			//alert(storage.seedList)
			// for (k in storage.seedList) {
			// 	alert(storage.seedList[k])
			// }
			//读取local数据
			return data  			
		},
		query:{
			'-t':'fun',	
			//paramType:'user',
			name:'查询',
			fun(data){
				//加载数据
				localforage.getItem('seedList').then(function(value) {				
					data.list = value//Array.from(value)				
				}).catch(function(err) {
				    // 当出错时，此处代码运行
				    console.log(err);
				});

				console.log('=================')
				console.log(data.list)
				///alert('查询成功!')
			}
		},
		add:{
			'-t':'fun',	
			paramType:'Seed',
			name:'新增',
			fun(data,param){
				//data.list.push(param)
				console.log('param')
				console.log(param)

				localforage.getItem('seedList').then(function(value) {
				    // 当离线仓库中的值被载入时，此处代码运行
				    //console.log(value);
				    //value[param.id] = param
				    param.id = value.length
				    value.push(param)
					// console.log('window.localStorage.seedList')
					// console.log(value)					
					data.list = value//Array.from(value)
					localforage.setItem('seedList', value).then()
					console.log('data.list')
					console.log(value)
					
				}).catch(function(err) {
				    // 当出错时，此处代码运行
				    console.log(err);
				});
				//console.log(seedList)
				
				//console.log(data)
				//alert('测试成功!')
				return '新增成功'
			}
		}

	}
})


// 文件下载
function downloadFile (fileName,content) {
    let downLink = document.createElement('a')
    downLink.download = fileName
    //字符内容转换为blod地址
    let blob = new Blob([content])
    downLink.href = URL.createObjectURL(blob)
    // 链接插入到页面
    document.body.appendChild(downLink)
    downLink.click()
    // 移除下载链接
    document.body.removeChild(downLink)
}
//console.log('11111')