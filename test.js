function func1(){
  func2()
}

async function func2(){
  try{
    await func3()
  }catch(error){
    console.log(error)
  }
}

function func3(){
  return new Promise((resolve,reject) => {
    setTimeout(function(){
      const r = Math.random();
      if(r<0.5){
        reject('func3 error')
      }
    },500)
  })
}

func1()