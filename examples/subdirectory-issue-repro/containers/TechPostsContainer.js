import {
  createContainer,
  query
} from '@phenomic/preset-react-app/lib/client';

import Tech from '../components/Tech'

const TechPostsContainer = createContainer(Tech, () => ({
  posts: query({ path: "posts/tech" })
}));

export default TechPostsContainer;
