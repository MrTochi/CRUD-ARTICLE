const form=document.getElementById(`form`)
const title=document.getElementById(`input`)
const article=document.getElementById(`content`)
const boxB=document.getElementById(`boxB`)
const mybutton=document.getElementById(`button`)
const span=document.getElementById(`span`)





let articleArray=[]



const displayArticle=()=>{
    
     boxB.innerHTML = '' 
    articleArray.forEach((articles,key)=>{
    const articleBox=document.createElement(`div`)
    articleBox.setAttribute("class","articleBox")
    const sideA=document.createElement('div')
    sideA.classList.add("sideA")
    const art=document.createElement(`h4`)
    art.textContent=articles.articleTitle
    const cont=document.createElement(`p`)
    sideA.append(art,cont)

    const sideB=document.createElement('div')
    sideB.classList.add("sideB")
    const edit=document.createElement('i')
    edit.classList.add("fa-regular", "fa-pen-to-square")
    edit.id=key
    edit.dataset.action=("edit")

    const del=document.createElement('i')
    del.classList.add("fa-solid", "fa-trash")
    del.id=key
    del.dataset.action=("del")
    sideB.append(del,edit)

   
    cont.textContent=articles.articleContent
    articleBox.append(sideA,sideB)
    boxB.append(articleBox)
    })
    }

    // delete
    const boxAction=(e)=>{
       let clickAction=e.target.dataset.action
       let clickID=e.target.id
       clickID=Number(clickID)

       if(clickAction==="del"){
        deleteArticle(clickID)
       }

       if(clickAction==="edit"){
        editArticle(clickID)
       }
       
        
    }

    // Delete Action
    let deleteArticle=(clickID)=>{
        console.log(clickID);
        
        articleArray=articleArray.filter((article,ind)=>{
            return ind!==clickID
        })
        displayArticle()
        localStorage.setItem("articleArray",JSON.stringify(articleArray))
        span.textContent = articleArray.length;
    }

    // Edit Action
    let editArticle=(clickID)=>{
        let editArticle=articleArray[clickID]
        title.value=editArticle.articleTitle
        article.value=editArticle.articleContent
        mybutton.textContent="SAVE EDIT"

        form.removeEventListener(`submit`,collectArticles)

        form.addEventListener(`submit`,function saveArticle(e){
            e.preventDefault()
            editArticle.articleTitle= title.value
            editArticle.articleContent=article.value
            localStorage.setItem("articleArray",JSON.stringify(articleArray))
            fetchArticles()
            form.reset()

            mybutton.textContent="SUBMIT"

            form.removeEventListener(`submit`,saveArticle)
            form.addEventListener(`submit`,collectArticles)

        })
        console.log(editArticle);
        
    }
    boxB.addEventListener(`click`,boxAction)

const collectArticles=(e)=>{
    e.preventDefault();

    let articleTitle = title.value;
    let articleContent = article.value;

    if (articleTitle.length == 0 || articleContent.length == 0) {
        mybutton.style.backgroundColor = "red";
        mybutton.textContent = "Complete Both Fields";
        return;
    } else {
        mybutton.style.backgroundColor = "blue";
        mybutton.textContent = "SUBMIT";
        const articleObject = {
            articleTitle: articleTitle,
            articleContent: articleContent
        };
        articleArray.unshift(articleObject);
        localStorage.setItem("articleArray", JSON.stringify(articleArray));
    
        fetchArticles();
        form.reset();
    }
}


const fetchArticles=()=>{
    articleArray=JSON.parse(localStorage.getItem("articleArray"))|| []
    displayArticle()
    console.log(articleArray.length);
    span.textContent = articleArray.length;
    
}
fetchArticles()


form.addEventListener(`submit`,collectArticles)