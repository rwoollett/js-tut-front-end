import React from 'react';
import Banner from './Banner';

interface HomePageProps {
  children: JSX.Element[];
}

interface HomePageState {
  homepage: {title: string; description: string};
  isFetching: boolean;
}

class HomePage extends React.Component<HomePageProps, HomePageState> {
  static defaultProps: Partial<HomePageProps> = {
    children: [],
  }

  constructor(props: HomePageProps) {
    super(props);
    this.state = {
      homepage: { title: '', description: ''},
      isFetching: false
    };

  }

  fetchHomepagesWithFetch = (): void => {
    this.setState({...this.state, isFetching: true});
    fetch('/api/v1/homepage')
    .then(response => response.json())
    .then( ({title, description}) => {
      this.setState({
        homepage: { title, description },
        isFetching: false
      });
    });

  }

  componentDidMount(): void {
    this.fetchHomepagesWithFetch();
  }

  render (): JSX.Element {
    const {homepage, isFetching} = this.state;
    return (
      <div>
        <Banner title={homepage.title} desc={homepage?.description}/>
        <p>{isFetching ? 'Fetching home page ...' : ''}</p>
      </div>);
  }
}

export default HomePage;