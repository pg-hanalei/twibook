import React, {memo, useCallback, useEffect, useState} from "react";
import MenuSelect from "../molecules/MenuSelect";
import PageTitle from "../atoms/PageTitle";

const CategoryEdit = memo((e) => {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [displayNo, setDisplayNo] = useState(0);
    const [categoryId, setCategoryId] = useState(0)

    useEffect(()=>{
        getCategories();
    },[])

    const getCategories = () => {
        setCategories([]);
        setCategoryName("");
        setDisplayNo(0);
        axios.get('category')
            .then((res)=>{
                console.log(res);
                setCategories([...res.data])
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const onChangeCategory = (e) => {
        const index = e.target.selectedIndex;
        if(index == 0){
            setCategoryName('');
            setDisplayNo(0);
            return;
        }
        setCategoryId(e.target.value);
        setCategoryName(e.target[index].text);
        setDisplayNo(categories[index -1].display_no);
    }

    const onClickEdit = useCallback((e) => {
        e.preventDefault();
        const data = {
            categoryName,
            displayNo,
        };
        axios.put('category/'+ categoryId ,data)
            .then( (res) => {
                getCategories();
            })
            .catch(()=>{
                console.log('error')
            })
    },[categoryName, displayNo, categoryId]);

    const onClickDelete = useCallback((e) => {
        e.preventDefault();
        axios.delete('category/'+ categoryId)
            .then( (res) => {
                getCategories();
            })
            .catch(()=>{
                console.log('error')
            })
    },[categoryId]);

    return (
        <div className="container">
            <MenuSelect />
            <PageTitle>カテゴリー編集</PageTitle>

            <form className="mt-4">
                <div className="row">
                    <select className="form-control form-control-lg" aria-label="select category" onChange={onChangeCategory}>
                        <option value="" name="">カテゴリー</option>
                        { categories.map( (category) =>(
                            <option key={category.id} value={category.id} data-display={category.display_no}>{category.name}</option>
                        ))}
                    </select>
                    <input className="form-control form-control-lg mt-2"
                           type="text"
                           placeholder="カテゴリー名を入力"
                           value={categoryName}
                           onChange={ (e) => setCategoryName(e.target.value)}
                    />
                    <input className="form-control form-control-lg mt-2 col-2 text-center dispno"
                           type="number"
                           placeholder="表示順"
                           value={displayNo}
                           onChange={ (e) => setDisplayNo(e.target.value)}
                    />
                </div>
                <div className="d-grid">
                    <a className="btn btn-primary btn-lg btn-block mt-4" onClick={onClickEdit}>変更</a>
                </div>
                <div className="d-grid">
                    <a className="btn btn-danger btn-lg col-2 mt-4" onClick={onClickDelete}>削除</a>
                </div>
            </form>
        </div>
    );
});

export default CategoryEdit
