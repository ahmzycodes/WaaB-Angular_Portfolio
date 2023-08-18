import {Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import {PostsService} from "../posts.service";
import {Router} from "@angular/router";
import {AppStateService} from "../app-state.service";

@Component({
  selector: 'app-right-side-list',
  templateUrl: './right-side-list.component.html',
  styleUrls: ['./right-side-list.component.scss']
})
export class RightSideListComponent implements OnInit, DoCheck {
  items: any[] = [];

  constructor(private postsService: PostsService, private router: Router, private appState: AppStateService) {}

  ngDoCheck(): void {
    this.items.forEach(item=>{item.formatedTitle = this.formatPostTitle(item.title)});
  }
  ngOnInit(): void {
    this.postsService.getPosts().subscribe(posts => {
      this.items = posts.reverse(); // Update the items array with fetched posts
      this.appState.setPosts(posts); // Update the app state with fetched posts
    });
  
    // Subscribe to appState updates
    this.appState.state$.subscribe(state => {
      this.items = state.posts; // Update the items array with appState posts
    });

      // Get the button
  let mybutton = document.getElementById("myBtn");

  // When the user scrolls down from the top of the document, show the button
  window.onload =   ()=>mybutton!.style.display = "none";
  window.onscroll = ()=>this.scrollFunction(mybutton!);
  }

  onItemClick(postId: number): void {
    this.router.navigate(['/post/edit', postId]);
  }

  navigateToAddForm(): void {
    this.router.navigate(['/post/new']);
  }

  deletePost(postId: number): void {
    this.postsService.deletePost(postId).subscribe(() => {
      this.appState.deletePost(postId);
    });
  } 
    //To maintain view and design structure.
  formatPostTitle(title: string): string {
    if (window.innerWidth < 290)
    return title.length > 2 ? title.substring(0, 1) + '...' : title;
    else if(window.innerWidth < 840)
    return title.length > 15 ? title.substring(0, 12) + '...' : title;
    return title;
  }


 scrollFunction(mybutton : HTMLElement): void {
  if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
 topFunction(): void {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

 removeImage(item: any): void
 {
  if(window.confirm("Remove Image?"))
  {
    item.image = null;
    this.appState.updatePost(item);
    this.postsService.updatePost(item).subscribe(updatedPost => {
    this.appState.updatePost(updatedPost);});
  }
 }

  exploreBody(item: any): void
  {
      this.router.navigate(['/explore'], { queryParams: { postId:item.id}});
  }
}
