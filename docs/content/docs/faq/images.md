---
title: Phenomic FAQ about Images 
---
Besides being able to add the image on the markdown itself it's possible to add it on the post metadata and use it later.

For example given this post:
```markdown
---
title: Hello World!
date: 2016-02-14
layout: Post
---


Some content
```

It is possible to add any information on the header metadata and use markdwon to add more information.
```markdown
---
title: Hello World!
date: 2016-02-14
layout: Post
featuredImage: someImageUrl.png
---


Some content    ![Image Alt](http://someImageUrl.jpeg)
```

The markdown content will be rendered normally the metadata will have to be used somewhere. Supposing you want to use it on the PagesList you would change your PagePreview to make use of that since PagesList just render a series of PagePreview components. Changing the PagePreview component will change how the "latest posts" are rendered on your homepage.

```es6
  const PagePreview = ({ __url, title, date , featuredImage }) => {
    return (
      <div> <img src= {featuredImage} /></div>
    )
  }
  PagePreview.propTypes = {
    __url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string,
    featuredImage: PropTypes.string
}

```

Notice how the featuredImage was added to the propTypes (For validation) , and a parameter featuredImage was added on the arguments list.
This way you can access any metadata that you pass and control it's behaviour or display on the render function.
