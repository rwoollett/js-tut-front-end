import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { search } from '../actions/actions'; //, debouncedSearch, throttledSearch
import AutoComplete from 'react-autocomplete';
import {IHomePageState} from '../store/reducer';
import style from '../scss/labshome.scss';
 
function SearchComponent(): JSX.Element {
	const [query, setQuery] = useState("");
	const hits = useSelector<IHomePageState, number>(state => state.hits);
	const results = useSelector<IHomePageState, string[]>
     (state => state.searchResults);

	const dispatch = useDispatch();

	const onSearch = (query: string) => {
		setQuery(query);
		dispatch(search(query));
	};

    
	return (
		<div className={style['search-bar']}>
			<h2>Search Popular Laboratories</h2>
			<p>API hits: {hits}</p>
			<AutoComplete
				getItemValue={(item) => item}
				items={results}
				renderItem={(item, isHighlighted) =>
					<div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
						{item}
					</div>
				}
				value={query}
				onChange={(e) => onSearch(e.target.value)}
			/>
		</div>
	);
}

export default SearchComponent;