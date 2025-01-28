import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import Vote, { Votes } from "../models/Vote";
import { GetServerSideProps } from "next";
import homeStyle from "./home.module.css";
import buttonStyle from "./button.module.css"
import { useRouter } from 'next/router';

type Props = {
  votes: Votes[];
  name_cts: any[];
};

const Index = ({ votes, name_cts }: Props) => {
  const router = useRouter();

  const onClick = async () => {
    try {
      const response = await fetch('/api/votes', {
        method: 'DELETE',
      });
      if (response.ok) {
        // Optionally, you can refresh the page or update the state to reflect the changes
        router.reload();
      } else {
        alert('Failed to delete votes');
      }
    } catch (error) {
      console.error('Error deleting votes:', error);
      alert('An error occurred');
    }
  };

  return (
    <div className={homeStyle.homepage}>
    <h1>Vote Tally</h1>
    <ul>
      {name_cts.map((name_ct) => (<li>{name_ct[0]}: {name_ct[1]}</li>))}
    </ul>
    <button className={buttonStyle.votebutton}
          onClick={onClick}>Clear Votes</button>
    </div>
  );
};

/* Retrieves pet(s) data from mongodb database */
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  await dbConnect();

  /* find all the data in our database */
  const res = await Vote.find({});
  const votes = res.map((doc) => {
    const vote = JSON.parse(JSON.stringify(doc));
    return vote;
  });

  const names = await Vote.find().distinct('name');
  const name_cts = await Promise.all(names.map(async (name) => {
    const count = await Vote.countDocuments({ name: name });
    return [name, count];
  }))
  const json_name_cts = JSON.parse(JSON.stringify(name_cts));

  return { props: { 
    votes: votes,
    name_cts: json_name_cts,
   } };
};

export default Index;
