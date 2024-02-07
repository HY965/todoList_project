import { useParams } from "react-router-dom";

function Detail() {
  const { todoId } = useParams();
  return <div>Detail{todoId}</div>;
}

export default Detail;
