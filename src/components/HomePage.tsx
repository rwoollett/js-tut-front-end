import React, { lazy, Suspense } from 'react';
import Banner from './Banner';
import style from '../scss/labshome.scss';
import PopularCards from './PopularCards';
import { CardProps} from './Card';
import homepage from '../../api/homepage.json';

//import HomeNavigation from './HomeNavigation';
import PostsComponent from './PostsComponent';

// function lazyWithPreload(factory) {
//   const Component = lazy(factory);

//   // Comment below line to check difference ->
//   Component.preload = factory;
//   return Component;
// }
const HomeNavigation = lazy(() => import('./HomeNavigation'));
//const PostsComponent = lazy(() => import('./PostsComponent'));


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
  } catch (ex) {console.log(ex);}

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
      isFetching: true
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
      const {title, description, navCards, popularCards} 
           = homepage.homepage;
      this.setState({
        title, description, navCards, popularCards,
        isFetching: false
      });
    }
  }

  componentDidMount(): void {
    this.fetchHomepagesWithFetch();
  }

  render (): JSX.Element {
    const {title, description, navCards, popularCards, isFetching} = this.state;
    return (
        isFetching ? 
         <div>Fetching home page ...</div> : 
         <div><Banner title={title} desc={description}/>
          <div className={style.container}>
            <Suspense fallback={<div>Loading.....</div>}>
              {<HomeNavigation cards={navCards}/>}
            </Suspense>
            <PostsComponent/>
            <PopularCards cards={popularCards}/>
          </div>
        </div>);
  }
}

export default HomePage;