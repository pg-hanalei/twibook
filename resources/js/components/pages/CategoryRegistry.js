import React, {memo, useCallback, useState} from "react";
import MenuSelect from "../molecules/MenuSelect";
import PageTitle from "../atoms/PageTitle";

const CategoryRegistry = memo(() => {
    const [categoryName, setCategoryName] = useState('');
    const [displayNo, setDisplayNo] = useState(0);
    const onClickAdd = useCallback((e) => {
        e.preventDefault();
        const data = {
            categoryName,
            displayNo,
        };
        axios.post('category', data)
            .then( (res) => {
                console.log(res);
                setCategoryName('');
                setDisplayNo(0);
            })
            .catch(()=>{
                console.log('error')
            })
    },[categoryName, displayNo]);

    return (
        <div className="container">
            <MenuSelect />
            <PageTitle>カテゴリー追加</PageTitle>

            <form className="mt-4">
                <div className="row">
                    <input className="form-control form-control-lg"
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
                    <a className="btn btn-primary btn-lg btn-block mt-4" href="" onClick={onClickAdd}>追加</a>
                </div>
            </form>

        </div>
    );
});

export default CategoryRegistry
