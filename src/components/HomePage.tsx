import React, { lazy, Suspense } from 'react';
import Banner from './Banner';
import style from '../scss/labshome.scss';
import PopularCards from './PopularCards';
import { CardProps } from './Card';
import homepage from '../../api/homepage.json';
import { http } from '../features/fetchData';
import PostsComponent from './PostsComponent';
const HomeNavigation = lazy(() => import('./HomeNavigation'));

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

class HomePage extends React.Component<HomePageProps, HomePageState> {
  static defaultProps: Partial<HomePageProps> = {
    children: [],
  }

  constructor(props: HomePageProps) {
    super(props);
    this.state = {
      title: '',
      description: '',
      navCards: [{ title: ' ', catchPhrase: '' }],
      popularCards: [{ title: ' ', catchPhrase: '' }],
      isFetching: true
    };

  }

  async fetchHomepagesWithFetch(): Promise<void> {
    this.setState({ ...this.state, isFetching: true });
    let response: HomePageState;
    try {
      response = await http<HomePageState>(
        '/api/v1/homepage',
        { method: "GET" });
      const { title, description, navCards, popularCards } = response;
      this.setState({
        title, description, navCards, popularCards,
        isFetching: false
      });
    } catch (response) {
      const { title, description, navCards, popularCards } = homepage.homepage;
      console.log("Message page :", title);
      this.setState({
        title, description, navCards, popularCards,
        isFetching: false
      });
    }
  }

  componentDidMount(): void {
    this.fetchHomepagesWithFetch();
  }

  render(): JSX.Element {
    const { title,
      description,
      navCards,
      popularCards,
      isFetching } = this.state;
    return (
      isFetching ?
        <div>Fetching home page ...</div> :
        <div><Banner title={title} desc={description} />
          <div className={style.container}>
            <Suspense fallback={<div>Loading.....</div>}>
              {<HomeNavigation cards={navCards} />}
            </Suspense>
            <PostsComponent />
            <PopularCards cards={popularCards} />
          </div>
        </div>);
  }
}

export default HomePage;