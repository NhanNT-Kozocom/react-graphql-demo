import { useQuery } from "@apollo/client";
import { getLocation } from "../../services/graphql/queries";

function Home() {
  const { loading, data } = useQuery(getLocation);

  if (loading) return <div>Loading...</div>;

  return data?.locations?.map((item: any) => (
    <div key={item.id} className="card">
      <h3 className="sub-title">{item.name}</h3>
      <img className="image" alt="location-reference" src={`${item.photo}`} />
      <br />
      <b>About this location:</b>
      <p>{item.description}</p>
      <hr />
    </div>
  ));
}

export default Home;
