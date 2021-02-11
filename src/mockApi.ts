import mockData from './mockdata.json';

let hits = 0;

const sleep = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};

export async function searchAPI(query: string): 
    Promise<{ data:
    {
        results: string[];
        hits: number;
        query: string }
    }>
      {
    await sleep(50);
    return {
        data: {
            results: mockData.filter(
                item => item.toLowerCase().includes(query)
            ).slice(0, 5),
            hits: ++hits,
            query: query
        }
    };
}