import React from "react";
import MenuSelect from "../molecules/MenuSelect";
import PageTitle from "../atoms/PageTitle";

const UserSetting = () => {
    return (
        <>
            <div className="container">
                <MenuSelect/>
                <PageTitle>ユーザー情報編集</PageTitle>
                <div className="mt-4">
                    <form>
                        <div className="form-group">
                            <label htmlFor="user_image" id="user_image-area">
                                <img id="user_image" src="https://source.unsplash.com/bIhpiQA009k" alt="プロフィール画像" className="rounded-circle"
                                     width="180px" height="180px"/>
                                <i className="bi bi-camera-fill user_image--icon"></i>
                            </label>
                            <input type="file" className="form-control d-none"
                                   aria-describedby="user_image" placeholder="user_image"/>
                        </div>
                        <div className="form-group">
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
                        </div>
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default UserSetting
