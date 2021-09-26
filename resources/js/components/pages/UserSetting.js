import React, {useCallback, useEffect, useState} from "react";
import MenuSelect from "../molecules/MenuSelect";
import PageTitle from "../atoms/PageTitle";
import ImageCropDialog from "../organisms/ImageCropDialog"

const UserSetting = () => {

    const [userId, setUserId] = useState(0);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [isSocial, setIsSocial] = useState(false);

    const [userImage, setUserImage] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(()=>{
        setUserImage({
            id:1,
            imageUrl: imageUrl? `images/${imageUrl}`: 'images/noimg.png',
            croppedImageUrl: null,
        })
    },[imageUrl])

    useEffect(()=>{
        const initUserImage = {
            id:1,
            imageUrl: imageUrl? `images/${imageUrl}`: 'images/noimg.png',
            croppedImageUrl: null,
        }
    },[userId])

    useEffect(()=>{
        getUserInfo();
    },[])

    const getUserInfo = () => {
        axios.post('main/user_info')
            .then((res)=>{
                if(res.data[0].social === 1){
                    setIsSocial(true);
                    setUserId(res.data[0].id);
                    setImageUrl(res.data[0].pic);
                }
            })
            .catch((err)=>{
                console.log("取得失敗");
                console.log(err);
            })
    }

    const onClickSave = useCallback((e) => {
        e.preventDefault();

        if(isSocial){
            const now = Date.now();
            const fileName = `${userId}${now}.jpg`;

            const file = new FormData();

            console.log(localStorage.getItem("blob"));

            const base64Image = localStorage.getItem("blob");

            var strImage = base64Image.replace(/^data:image\/[a-z]+;base64,/, "");

            function toBlob(base64) {
                var bin = atob(base64.replace(/^.*,/, ''));
                var buffer = new Uint8Array(bin.length);
                for (var i = 0; i < bin.length; i++) {
                    buffer[i] = bin.charCodeAt(i);
                }
                // Blobを作成
                try{
                    var blob = new Blob([buffer.buffer], {
                        type: 'image/png'
                    });
                }catch (e){
                    return false;
                }
                return blob;
            }

            file.append('photo', toBlob(strImage) , fileName)
            const headers = { "Content-Type": "multipart/form-data" };
            axios.post('/main/photo', file, { headers })
            .then(res => {
                console.log(res)
            }).catch(error => {
            new Error(error)
            })


            const data = {
                pic: fileName
            }
            axios.patch(`main/user_info_social_update/${userId}`, data)
                .then((res)=>{
                    console.log(res)
                    getUserInfo();
                    alert("登録しました");
                })
                .catch((err)=>{
                    console.log(err)
                })

        }else{
            // axios.post('main/user_info_update')
        }




    },[userId, isSocial, userImage]);

    const onChangeImage = useCallback((e) => {

        const file = e.target.files[0]
        if(file === null){
            return;
        }

        var blobUrl = window.URL.createObjectURL(file);
        setSelectedImage(
            {
                id:1,
                imageUrl: blobUrl,
                croppedImageUrl: null,
            }
        );
    },[]);

    const onCancel = useCallback(() => {
        setSelectedImage(null);
    },[]);

    const setCroppedImageFor = useCallback((id, crop, zoom, aspect, croppedImageUrl) => {
        const newImage = { ...userImage, croppedImageUrl, crop, zoom, aspect };
        setUserImage(newImage);
        setSelectedImage(null);
    },[userImage]);

    const resetImage = useCallback((id) => {
        setCroppedImageFor(id);
    },[userImage]);

    return (
        <>
            <div className="container">
                <MenuSelect/>
                <PageTitle>ユーザー情報編集</PageTitle>
                <div className="mt-4">
                    <form>
                        <div className="form-group">
                            <label htmlFor="user_image_input" id="user_image-area">
                                <img
                                    id="user_image"
                                    src={userImage.croppedImageUrl ? userImage.croppedImageUrl : `storage/${userImage.imageUrl}`}
                                    alt="プロフィール画像"
                                    className="rounded-circle"
                                />
                                <i className="bi bi-camera-fill user_image_icon"></i>
                            </label>
                            <input type="file" accept="image/*,.png,.jpg,.jpeg,.gif"
                                   id="user_image_input" className="form-control d-none"
                                   aria-describedby="user_image" placeholder="user_image"
                                   onChange={onChangeImage}
                            />
                        </div>
                        {isSocial ? (
                            <p>Twitterログインユーザーです</p>
                        ): <><div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1"
                                   aria-describedby="emailHelp" placeholder="Enter email"/>
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with
                                anyone else.</small>
                        </div>
                            <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1"
                            placeholder="Password"/>
                            </div></>}
                        <button type="submit" className="btn btn-primary" onClick={onClickSave}>Submit</button>
                    </form>
                </div>

                {selectedImage ? (
                    <ImageCropDialog
                        id={selectedImage.id}
                        imageUrl={selectedImage.imageUrl}
                        cropInit={selectedImage.crop}
                        zoomInit={selectedImage.zoom}
                        aspectInit={selectedImage.aspect}
                        onCancel={onCancel}
                        setCroppedImageFor={setCroppedImageFor}
                        resetImage={resetImage}
                    />
                ): null}
            </div>
        </>
    );
}

export default UserSetting
