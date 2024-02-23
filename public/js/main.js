function deleteProduct(id){
    const result = confirm("Are u sure u want to delete??");
    if(result){
        fetch("/delete-product/"+id,{
            method:"post"
        }).then((res)=>{
            if(res.ok){
                location.reload();
            }
        })
    }
}