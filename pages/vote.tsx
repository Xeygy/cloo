import { useRouter } from "next/router";
import { useState } from "react";


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

    const onClick = (name) => {
        postData({
            name: name
        });
    }

    return (
        <>
            <div>
            <h1>Vote Page</h1>
            <div className="vote-container">
                <button className="vote-button" onClick={() => onClick("Alice")}>Alice</button>
                <button onClick={() => onClick("Ben")}>Ben</button>
                <button onClick={() => onClick("Charlie")}>Charlie</button>
                <button onClick={() => onClick("Monopoly Man")}>The Monopoly Man</button>
            </div>
            </div>
            
            <p>{message}</p>
        </>

    )
}

export default VotePage;