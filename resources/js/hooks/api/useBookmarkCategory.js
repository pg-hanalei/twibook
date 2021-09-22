import React, {useCallback, useState} from 'react';

const useBookmarkCategory = () => {
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState(0)
    const [categoryName, setCategoryName] = useState('');
    const [displayNo, setDisplayNo] = useState(0);

    const getCategory = useCallback(() => {
        setCategories([]);
        setCategoryName("");
        setDisplayNo(0);
        axios.get('category')
            .then((res)=>{
                console.log(res);
                setCategories([...res.data])
            })
            .catch((error)=>{
                console.log(error);
            })
    },[setCategories, setCategoryName, setDisplayNo]);

    const onChangeCategory = useCallback((e, categories) => {
        const index = e.target.selectedIndex;
        if(index == 0){
            setCategoryName('');
            setDisplayNo(0);
            return;
        }
        setCategoryId(e.target.value);
        setCategoryName(e.target[index].text);
        setDisplayNo(categories[index -1].display_no);
    },[]);

    return {categories, setCategories, categoryName, setCategoryName, displayNo, setDisplayNo,
            categoryId, getCategory, onChangeCategory}
}

export default useBookmarkCategory
