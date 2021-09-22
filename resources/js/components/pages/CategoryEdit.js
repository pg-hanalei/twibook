import React, {memo, useCallback, useEffect, useState} from "react";
import MenuSelect from "../molecules/MenuSelect";
import PageTitle from "../atoms/PageTitle";
import useBookmarkCategory from "../../hooks/api/useBookmarkCategory";
import useEditCategory from "../../hooks/api/useEditCategory";
import useDeleteCategory from "../../hooks/api/useDeleteCategory";

const CategoryEdit = memo((e) => {
    const { categories, categoryName, setCategoryName, displayNo,
            setDisplayNo, categoryId, getCategory, onChangeCategory }
        = useBookmarkCategory();

    const {editCategory} = useEditCategory();
    const {deleteCategory} = useDeleteCategory();

    useEffect(()=>{
        getCategory();
    },[])

    const onClickEdit = useCallback((e) => {
        e.preventDefault();
        const data = {
            categoryName,
            displayNo,
        };
        editCategory(data, categoryId, getCategory);
    },[categoryName, displayNo, categoryId]);

    const onClickDelete = useCallback((e) => {
        e.preventDefault();
        deleteCategory(categoryId, getCategory);
    },[categoryId]);

    return (
        <div className="container">
            <MenuSelect />
            <PageTitle>カテゴリー編集</PageTitle>

            <form className="mt-4">
                <div className="row">
                    <select className="form-control form-control-lg"
                            aria-label="select category"
                            onChange={(e)=>onChangeCategory(e, categories)}>
                        <option value="" name="">カテゴリー</option>
                        { categories.map( (category) =>(
                            <option key={category.id} value={category.id}>{category.name}</option>
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
