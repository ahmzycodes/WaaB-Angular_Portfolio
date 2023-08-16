import { AfterContentChecked, AfterContentInit, Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Post } from '../../../post.model';
import { ActivatedRoute } from '@angular/router';
import { KeyedWrite } from '@angular/compiler';


@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit, AfterContentChecked {
  postsWithImages: Post[] = [];
  postsWithoutImages: Post[] = [];
  filteredPosts: Post[] = [];

  searchQuery = '';

  constructor(private postsService: PostsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.postsService.getPosts().subscribe(posts => {
      this.postsWithImages = posts.filter(post => post.image);
      this.postsWithoutImages = posts.filter(post => !post.image);
      this.filteredPosts = [...this.postsWithImages, ...this.postsWithoutImages];
    });

    let mybutton = document.getElementById("myBtn");
    // When the user scrolls down 20px from the top of the document, show the button
    window.onload =   ()=>mybutton!.style.display = "none";
    window.onscroll = ()=>this.scrollFunction(mybutton!);
  }
  ngAfterContentChecked(): void {
    this.route.queryParams.subscribe(params => {
      const postId = parseInt(params['postId'], 10);
      // Scroll to the post with the matching postId
      const postElement = document.getElementById(`${postId}`);
      if (postElement) {
        const filter = document.querySelector(".explore-search");
        const  targetPost = (document.getElementById(String(postId)));
        if(targetPost){
        //console.log(targetPost.innerHTML);
        const searchInput = document.querySelector(".explore-search") as HTMLInputElement;
        searchInput.value = targetPost.innerHTML; 
        const searchEvent = new Event('input', { bubbles: true });
        searchInput.dispatchEvent(searchEvent);  
        }
      }
    });
  }

  searchPosts(event: Event): void
  {
    const searchQ = (event.target as HTMLInputElement).value;
    this.searchQuery = searchQ;
    if (this.searchQuery.trim()) {
      this.filteredPosts = this.filteredPosts.filter(post =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || post.body.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
        if(this.filteredPosts.length < 1)
        (document.querySelector(".explore-search") as HTMLInputElement).value = ''; 
        } else {
        // Reset to all posts if search query is empty
        this.filteredPosts = [...this.postsWithImages, ...this.postsWithoutImages];
        }
  }

  scrollFunction(mybutton : HTMLElement): void {
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }
  
  topFunction(): void {
    document.body.scrollTop = 100;
    document.documentElement.scrollTop = 100;
  }
}
