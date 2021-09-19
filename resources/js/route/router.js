import React from "react";
import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Main from "../components/pages/Main"
import UserSetting from "../components/pages/UserSetting";
import CategoryRegistry from "../components/pages/CategoryRegistry";
import CategoryEdit from "../components/pages/CategoryEdit";
import BookmarkRegistry from "../components/pages/BookmarkRegistry";

const Router = () => {
    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/main">
                        <Main/>
                    </Route>
                    <Route path="/user_setting">
                        <UserSetting />
                    </Route>
                    <Route path="/category_registry">
                        <CategoryRegistry />
                    </Route>
                    <Route path="/category_edit">
                        <CategoryEdit />
                    </Route>
                    <Route path="/bookmark_registry">
                        <BookmarkRegistry />
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default Router
