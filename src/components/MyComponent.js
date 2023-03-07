import React , {useEffect, useState} from "react";

/*Sıralı LifeCycle Method Listesi
1. constructor
2. render
useeffect: Aşağıdakiler için kullanacağız.
3. compoentDidMount
4. componentDidUpdate
5. component WillUnmount
*/
const MyComponent =()=>{
    /*Constructor: Yapıcı fonksiyon. Süslü parantez içindeki return'e kadar olan tüm kodlar  */
     
    const[text,setText]=useState(1)
    const[todo,setTodo]=useState(null)
    console.log("constructor calisiyor)")
    

    /*useEffect ile 3,4 ve 5. madde */
     /*useEffect yazılması: 2 parametre alır.
     1. si yapılacak iştir. 2. dependency yani bağımlılıktır.
     2. Compoent içerisinde birden fazla use Effect yazılabilir.
     */
     /* Aşağıdaki hali component DidMount'tur. Component ekrana basılırken bir kere çalışır bir daha çalışmaz.*/
    /* useEffect{()=>{},[bu kısımda dependency yer alır, dizi içinde.]}*/
     
   /* useEffect(()=>{console.log("componentDidMount calisiyor")},[])*/
    
     /*Eğer 2. parametre olan dizi (dependency'yi vermezsek
     component Her RENDER olduğunda tekrar tekrar çalışır.
     */
     /*useEffect{()=>{},[]}*/ 


    //  /* componentDidUpdate    */
    //  /*
    //     1. component DidMount gibi ekrana ilk kez basılırken çalışır.
    //     2. Dependency(bağımlılığı) olan text state'i her değiştirinde bu useEffect tekrar çalışır.
    //  */

    useEffect(()=>{console.log("compponent didmount ve didUpdate calısıyor.")
    fetch(`https://jsonplaceholder.typicode.com/todos/${text}`)
    .then(response => response.json())
    .then(json => {
        console.log(json)
        setTodo(json)});

      /*componentWillUnmount  : Ekrandan toggle silinirken çalışır.  */

      return()=>{
        console.log("componentWillUnmount")
      }

        
    },[text])  
    
  

    /* [text]:text bir state'dir. Bağımlılıktır.*/

    // /*RENDER: Asagidaki return satırı render eder*/
    
    if(todo === null){
        return(
            <div>
                {console.log("render fonksiyonu calisiyor")}
                <h1>Loading...</h1>

            </div>

        )
    }

    return(
        <div>
            {console.log("render fonksiyonu calisiyor")}
            <h1>My MyComponent</h1>
            <p>{todo.id}:{todo.title}</p>
            <button onClick={()=>setText(text+1)}>Next</button>
          </div>
        
    )
}
export default MyComponent
