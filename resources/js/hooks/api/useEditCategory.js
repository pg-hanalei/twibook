import React from 'react';

const useEditCategory = () => {
    const editCategory = (data, categoryId, getCategory) => {
        axios.put('category/'+ categoryId ,data)
            .then( (res) => {
                getCategory();
            })
            .catch(()=>{
                console.log('error')
            })
    }
    return {editCategory}
}

export default useEditCategory
