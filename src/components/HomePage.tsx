import React from 'react';
import Banner from './Banner';
import style from '../scss/labshome.scss';
import HomeNavigation from './HomeNavigation';
import PopularCards from './PopularCards';
import { CardProps} from './Card';
import SearchComponent from './SearchComponent';
import store from '../store/store';
import { Provider } from 'react-redux';


interface HomePageProps {
  children: JSX.Element[];
}

interface HomePageState {
  title: string; 
  description: string;
  navCards: CardProps[];
  popularCards: CardProps[];
  isFetching: boolean;
}

// fetch typed
interface HttpResponse<T> extends Response {
  parsedBody?: T
}

async function http<T>(request:RequestInfo): Promise<HttpResponse<T>>
{
  const response: HttpResponse<T> = await fetch(
    request
  );
  try {
    response.parsedBody = await response.json();
  } catch (ex) {}

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response;  
}


class HomePage extends React.Component<HomePageProps, HomePageState> {
  static defaultProps: Partial<HomePageProps> = {
    children: [],
  }

  constructor(props: HomePageProps) {
    super(props);
    this.state = {
      title: '', 
      description: '',
      navCards: [{title: ' ', catchPhrase: ''}],
      popularCards: [{title: ' ', catchPhrase: ''}],
      isFetching: false
    };

  } 
  
  async fetchHomepagesWithFetch(): Promise<void> { 
    this.setState({...this.state, isFetching: true});
    let response: HttpResponse<HomePageState>;
    try {
      response = await http<HomePageState>('/api/v1/homepage');
      if (response.parsedBody) {
          console.log("api", response.parsedBody);
        const {title, description, navCards, popularCards} 
           = response.parsedBody;
        this.setState({
          title, description, navCards, popularCards,
          isFetching: false
        });
      }
  } catch (response) {
      console.log("Error", response);
    }
  }

  componentDidMount(): void {
    this.fetchHomepagesWithFetch();
  }

  render (): JSX.Element {
    const {title, description, navCards, popularCards, isFetching} = this.state;
    return (
      <div>
        <Provider store={store}>
          <Banner title={title} desc={description}/>
          <SearchComponent/>
          <div className={style.container}>
            <HomeNavigation cards={navCards}/>
            <PopularCards cards={popularCards}/>
          </div>
          <p>{isFetching ? 'Fetching home page ...' : ''}</p>
        </Provider>
      </div>);
  }
}

export default HomePage;