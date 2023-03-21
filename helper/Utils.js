import { Client, Databases } from "appwrite";
import { v4 as uuidv4 } from "uuid";

//Initializing Appwrite
export const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);

const dataB = new Databases(client);

//Saving Comments to Appwrite Database
export const saveComments = async (details) => {
  try {
    await dataB.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_COLLECTION_ID,
      uuidv4(),
      {
        name: `${details.name}`,
        comment: `${details.comment}`,
        videoTime: `${details.videoTime}`,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

//Fetching comments from Appwrite Database
export const listComments = ({ setComments }) => {
  const promise = dataB.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID,
    process.env.NEXT_PUBLIC_COLLECTION_ID
  );
  promise.then(
    (response) => setComments(response.documents),
    (error) => console.log(error)
  );
};

export const Button = ({ text, action }) => {
  return (
    <button
      className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 mt-20 rounded"
      type="button"
      onClick={action}
    >
      {text}
    </button>
  );
};
