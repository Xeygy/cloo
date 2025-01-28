import { useRouter } from "next/router";
import { useState } from "react";
import style from "./button.module.css";

interface VoteData {
    name: string;
}
  

const VotePage = () => {
    const contentType = "application/json";
    const router = useRouter();
    const [message, setMessage] = useState("");
    
    /* The POST method adds a new entry in the mongodb database. */
    const postData = async (vote: VoteData) => {
        try {
        const res = await fetch("/api/votes", {
            method: "POST",
            headers: {
            Accept: contentType,
            "Content-Type": contentType,
            },
            body: JSON.stringify(vote),
        });

        // Throw error with status code in case Fetch API req failed
        if (!res.ok) {
            throw new Error(res.status.toString());
        }
            router.push("/");
        } catch (error) {
            setMessage("Failed to add vote");
        }
    };

    const onClick = (name: string) => {
        postData({
            name: name
        });
    }

    const names = ["Sisyphus", "Col. Mustard", "Mr. Green", "Gerald, The Monopoly Man"];

    return (
        <>
            <div>
            <h1>Vote Now!</h1>
            <div className={style.votecontainer}>
                {names.map((name) => <button className={style.votebutton} onClick={() => onClick(name)}>{name}</button>)}
            </div>
            </div>
            
            <p>{message}</p>
        </>

    )
}

export default VotePage;