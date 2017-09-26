import {
  createContainer,
  query
} from '@phenomic/preset-react-app/lib/client';

import Home from '../components/Home'

const HomeContainer = createContainer(Home, () => ({
  posts: query({ path: "posts" })
}));

export default HomeContainer;
