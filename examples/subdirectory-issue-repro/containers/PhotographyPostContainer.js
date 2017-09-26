import {
  createContainer,
  query
} from '@phenomic/preset-react-app/lib/client';

import Post from '../components/Post'

const PhotographyPostContainer = createContainer(Post, props => ({
  page: query({path: 'posts/photography', id: props.params.splat})
}));

export default PhotographyPostContainer;
