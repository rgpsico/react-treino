
import { Component } from 'react';
import './style.css';


import { PostCard } from '../../components/PostCard';
import {loadPosts} from '../../utils/load-posts';
import {Button} from '../../components/Button'
import { Posts } from '../../components/Posts';
import { TextInput } from '../../components/TextInput';

class Home extends Component{
  state = {
    posts:[],
    allPosts:[],
    page:0,
    postporPage:2,
    searchValue: ''
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

handlechange = (e) =>{
  const {value} = e.target;
  this.setState({searchValue:value});



}

render(){
  const {posts , page , postsperPage, allPosts ,searchValue} = this.state;
  const {noMorePosts} =  page + postsperPage >= allPosts.length;

  const filteredPost = !!searchValue ?
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(
        searchValue.toLocaleLowerCase()
      );
    })
    :
    posts;

  return (
          <section className="container">
            <div className="search-container">
          {!!searchValue && (
              <>
              <h1> Seach Value: {searchValue}<br/><br/></h1>
              </>
            )}
        </div>

<TextInput searchValue={searchValue} handlechange={this.handlechange} />
  <br/>
  <br/>
  {filteredPost.length > 0 &&(
    <Posts posts={filteredPost}/>
    
  )}

{filteredPost.length === 0 && (
  <p>Não existem Posts =(</p>
    
  )}

    <div className="button-container">
          {!searchValue &&(
            <Button
                text="Carregar Mais posts"
                onClick={this.loadMorePosts}
                disabled={noMorePosts} 
               />

            )}
  
    </div>
  
   
</section>
  );
}
}
export default Home;
