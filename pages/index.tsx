import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import Vote, { Votes } from "../models/Vote";
import { GetServerSideProps } from "next";
import style from "./home.module.css";

type Props = {
  votes: Votes[];
  name_cts: any[];
};

const Index = ({ votes, name_cts }: Props) => {
  return (
    <div className={style.homepage}>
    <h1>Current Votes!</h1>
    <ul>
      {name_cts.map((name_ct) => (<li>{name_ct[0]}: {name_ct[1]}</li>))}
    </ul>
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
