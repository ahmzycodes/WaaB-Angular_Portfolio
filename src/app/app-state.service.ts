import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface State {
  posts: any[];
}

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private initialState: State = {
    posts: []
  };

  private stateSubject: BehaviorSubject<State> = new BehaviorSubject<State>(this.initialState);
  state$: Observable<State> = this.stateSubject.asObservable();

  constructor() {}

  setPosts(posts: any[]): void {
    this.stateSubject.next({ ...this.stateSubject.getValue(), posts });
    //console.log(posts);
  }
  

  addPost(post: any): void {
    const currentState = this.stateSubject.getValue();
    const updatedPosts = [...currentState.posts, post];
    this.stateSubject.next({ ...currentState, posts: updatedPosts });
  }

  updatePost(post: any): void {
    const currentState = this.stateSubject.getValue();
    const updatedPosts = currentState.posts.map(p => (p.id !== post.id ? p : post)); //rep === with !== 
    this.stateSubject.next({ ...currentState, posts: updatedPosts });
  }
  
  //Had wrong logic
  deletePost(postId: number): void {
    const currentState = this.stateSubject.getValue();
    const updatedPosts = currentState.posts.filter(p => p.id !== postId);
    this.stateSubject.next({ ...currentState, posts: updatedPosts });
  }
}
