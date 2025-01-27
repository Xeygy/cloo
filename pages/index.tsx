import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import Vote, { Votes } from "../models/Vote";
import Pet, { Pets } from "../models/Pet";
import { GetServerSideProps } from "next";

type Props = {
  pets: Pets[];
  votes: Votes[];
};

const Index = ({ pets, votes }: Props) => {
  return (
    <>
      {votes.map((vote) => (<p>{vote.name}</p>))}
      {pets.map((pet) => (
        <div key={pet._id}>
          <div className="card">
            <img src={pet.image_url} />
            <h5 className="pet-name">{pet.name}</h5>
            <div className="main-content">
              <p className="pet-name">{pet.name}</p>
              <p className="owner">Owner: {pet.owner_name}</p>

              {/* Extra Pet Info: Likes and Dislikes */}
              <div className="likes info">
                <p className="label">Likes</p>
                <ul>
                  {pet.likes.map((data, index) => (
                    <li key={index}>{data} </li>
                  ))}
                </ul>
              </div>
              <div className="dislikes info">
                <p className="label">Dislikes</p>
                <ul>
                  {pet.dislikes.map((data, index) => (
                    <li key={index}>{data} </li>
                  ))}
                </ul>
              </div>

              <div className="btn-container">
                <Link href={{ pathname: "/[id]/edit", query: { id: pet._id } }}>
                  <button className="btn edit">Edit</button>
                </Link>
                <Link href={{ pathname: "/[id]", query: { id: pet._id } }}>
                  <button className="btn view">View</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

/* Retrieves pet(s) data from mongodb database */
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  await dbConnect();

  /* find all the data in our database */
  const result = await Pet.find({});
  const vres = await Vote.find({});

  /* Ensures all objectIds and nested objectIds are serialized as JSON data */
  const pets = result.map((doc) => {
    const pet = JSON.parse(JSON.stringify(doc));
    return pet;
  });
  const votes = vres.map((doc) => {
    const vote = JSON.parse(JSON.stringify(doc));
    console.log(vote);
    return vote;
  });

  return { props: { 
    pets: pets,
    votes: votes,
   } };
};

export default Index;
