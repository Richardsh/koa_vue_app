class A {
  constructor() {
      this.nameA = 'a'
  }
  validateA() {
      console.log("A")
  }
}

class B extends A {
  constructor() {
      super()
      this.nameB = 'b'
  }

  validateB() {
      console.log("B")
  }
}

class C extends B {
  constructor() {
      super()
      this.nameC = 'c'
  }

  validateC() {
      console.log("C")
  }
}

function findMembers(instance, varprefix, funcprefix){
  function _find(instance){
    console.log(Object.getPrototypeOf(instance))
    if(Object.getPrototypeOf(instance) === null){
      return []
    }
    let names = Reflect.ownKeys(instance);
    names = names.filter((name) => {
      if (name.startsWith(varprefix) || name.startsWith(funcprefix))
          return true
    })
    console.log('names',names)
    return [...names, ..._find(Object.getPrototypeOf(instance))]
  }
  return _find(instance)
}

let c = new C();
const members = findMembers(c, 'name', 'validate')
console.log(members)