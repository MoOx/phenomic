import {
  createContainer,
  query
} from '@phenomic/preset-react-app/lib/client';

import Post from '../components/Post'

const TechPostContainer = createContainer(Post, props => ({
  page: query({path: 'posts/tech', id: props.params.splat})
}));

export default TechPostContainer;
