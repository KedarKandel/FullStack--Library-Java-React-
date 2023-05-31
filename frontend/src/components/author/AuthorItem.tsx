
import { Author } from '../../interfaces/interface';
import "./authorItem.scss"
type Props = {
  author: Author;
};

const AuthorItem = ({ author }: Props) => {
  return (
    <div className="author-item">
      <p>Name:{author.name}</p>
      <p>Email: <small>{author.email}</small></p>
      <span>Id:<small>{author.id}</small></span>
    </div>
  );
};

export default AuthorItem;
