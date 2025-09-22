import { useEffect, useState } from "react";

export const useFetch = <T>(
	fetchFunction: () => Promise<T>,
	autoFetch: boolean = true
) => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);

	const fetchData = async () => {
		try {
			setLoading(true);
			setData(null);
			setError(null);
			const result = await fetchFunction();
			setData(result);
		} catch (err) {
			setError(
				err instanceof Error ? err : new Error("An unknown error occurred")
			);
		} finally {
			setLoading(false);
		}
	};

	const reset = () => {
		setData(null);
		setError(null);
		setLoading(false);
	};

	useEffect(() => {
		if (!autoFetch) return;
		fetchData();

		return () => {
			reset();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [autoFetch]);

	return { data, loading, error, reset, refetch: fetchData };
};
