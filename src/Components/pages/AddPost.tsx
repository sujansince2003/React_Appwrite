//  serves as a flexible and reusable wrapper that can be used to apply consistent styling and layout to different parts of an application
import { Container, Postform } from "../index";

function AddPost() {
  return (
    <div className="py-8">
      <Container>
        <Postform />
      </Container>
    </div>
  );
}

export default AddPost;
