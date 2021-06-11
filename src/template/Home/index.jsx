
import { Component } from 'react';
import './style.css';


import { PostCard } from '../../components/PostCard';
import {loadPosts} from '../../utils/load-posts';
import {Button} from '../../components/Button'
import { Posts } from '../../components/Posts';

class Home extends Component{
  state = {
    posts:[],
    allPosts:[],
    page:0,
    postporPage:50
  }

  


async componentDidMount() {
await this.loadPosts();
}

loadPosts = async () => { 
  const {page , postporPage} = this.state;
  const postsAndPhotos = await loadPosts();
  this.setState({ 
    posts: postsAndPhotos.slice(page,postporPage) ,
    allPosts:postsAndPhotos,
  });
}

loadMorePosts = () =>{
  const {
    page , 
    postporPage,
    allPosts,
    posts 
  } = this.state;
  const nextPage = page + postporPage;
  const nextPosts = allPosts.slice(nextPage ,nextPage + postporPage );
  posts.push(...nextPosts);
 this.setState({posts,page:nextPage});
}


render(){
  const {posts , page , postsperPage, allPosts} = this.state;
  const {noMorePosts} =  page + postsperPage >= allPosts.length;

  return (
<section className="container">
    <Posts posts={posts}/>
    <div className="button-container">
    <Button

      text="Carregar Mais posts"
      onClick={this.loadMorePosts}
      disabled={noMorePosts} 
     />
    </div>
  
   
</section>
  );
}
}
export default Home;
