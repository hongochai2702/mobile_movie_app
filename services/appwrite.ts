import { Client, Query, TablesDB } from "react-native-appwrite";
// track the searches made by a user.
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const TABLE_ID = process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID!;
const ENDPOINT_URL = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;

const client = new Client().setEndpoint(ENDPOINT_URL).setProject(PROJECT_ID);

const tablesDB = new TablesDB(client);

// Web SDK supports generics for type safety
interface Metrics {
	$createdAt: string;
	$updatedAt: string;
	$id: string;
	$sequence: number;
	$tableId: string;
	$databaseId: string;
	$permissions: string[];
	count?: number;
	movie_id: number;
	search_term: string;
	poster_url: string;
	title: string;
}
export const updateSearchCount = async (query: string, movie: Movie) => {
	const result = await tablesDB.listRows<Metrics>({
		databaseId: DATABASE_ID,
		tableId: TABLE_ID,
		queries: [Query.equal("searchTerm", query)],
	});

	console.log(result);

	// check if a record of that search has already been stored
	// if a document is found increment the searchCount field
	// if no document is found
	// create a new document in Appwrite database -> 1
};
