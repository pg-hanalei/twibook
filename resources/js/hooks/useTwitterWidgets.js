import {useCallback} from "react";

const useTwitterWidgets = () => {

    const createScriptTagTwitterWidgets = useCallback(() => {
        const script = document.createElement("script");
        script.type = "text/javascript";

        const attr = document.createAttribute("src");
        attr.value = "//platform.twitter.com/widgets.js";

        script.setAttributeNode(attr);

        const main = document.getElementsByTagName("main")[0];
        main.appendChild(script);
    },[])

    return {createScriptTagTwitterWidgets}
}

export default useTwitterWidgets
