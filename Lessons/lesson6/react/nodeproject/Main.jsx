import { useEffect } from "react"
import { addCategory, getCategories } from "./api"

export const Main = () => {

    useEffect(() => {
        getCategories()
            .then(x => {
                if (x) {
                    console.log(x);
                    console.log(x.data);
                }

            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const send = (value) => {
        if (!value || value.length == 0) {
            return
        }
        const catgeory = { title: value }
        addCategory(catgeory)
            .then(x => {
                if (x)
                    console.log(x);
            })
            .catch(err => {
                console.log(err)
            })
    }
    return <>
        <input placeholder="input category" onBlur={(e) => send(e.target.value)}></input>
    </>
}