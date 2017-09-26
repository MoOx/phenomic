import {
  createContainer,
  query
} from '@phenomic/preset-react-app/lib/client';

import Page from '../components/Page'

const AboutContainer = createContainer(Page, () => ({
  page: query({path: 'pages', id: 'about'})
}));

export default AboutContainer;
