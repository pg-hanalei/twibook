import React from 'react';

const useDeleteCategory = () => {
    const deleteCategory = (categoryId, getCategory) => {
        axios.delete('category/'+ categoryId)
            .then( (res) => {
                getCategory();
            })
            .catch(()=>{
                console.log('error')
            })
    }
    return {deleteCategory}
}

export default useDeleteCategory
