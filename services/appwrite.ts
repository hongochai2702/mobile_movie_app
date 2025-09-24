import { Client, ID, Query, TablesDB } from "react-native-appwrite";
// track the searches made by a user.
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const TABLE_ID = process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID!;
const ENDPOINT_URL = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;

const client = new Client().setEndpoint(ENDPOINT_URL).setProject(PROJECT_ID);

const tablesDB = new TablesDB(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
	try {
		const result = await tablesDB.listRows<Metrics>({
			databaseId: DATABASE_ID,
			tableId: TABLE_ID,
			queries: [Query.equal("searchTerm", query)],
		});

		// console.log(result);
		if (result.total > 0) {
			const existingVideo = result.rows[0];
			// update the search count
			await tablesDB.updateRow<Metrics>({
				databaseId: DATABASE_ID,
				tableId: TABLE_ID,
				rowId: existingVideo.$id,
				data: {
					count: existingVideo.count ? existingVideo.count + 1 : 1,
				},
			});
		} else {
			// create a new record
			await tablesDB.createRow<Metrics>({
				databaseId: DATABASE_ID,
				tableId: TABLE_ID,
				rowId: ID.unique(),
				data: {
					count: 1,
					movie_id: movie.id,
					searchTerm: query,
					poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
					title: movie.title,
				},
			});
		}
	} catch (error) {
		console.log(error);
		throw error;
	}

	// check if a record of that search has already been stored
	// if a document is found increment the searchCount field
	// if no document is found
	// create a new document in Appwrite database -> 1
};

export const getTrendingMovies = async (): Promise<TrendingMovie[] | null> => {
	try {
		const result = await tablesDB.listRows<TrendingMovie>({
			databaseId: DATABASE_ID,
			tableId: TABLE_ID,
			queries: [Query.limit(5), Query.orderDesc("count")],
		});

		return result.rows;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
